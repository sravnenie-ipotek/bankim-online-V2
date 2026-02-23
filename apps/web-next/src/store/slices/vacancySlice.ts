import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { Vacancy } from '@/interfaces/Vacancy';
import type { VacancyDetail } from '@/interfaces/VacancyDetail';

type ListKey = string;

function listKey(language: string, category: string): ListKey {
  return `${language}:${category}`;
}

type ListEntry = { data: Vacancy[]; error: string | null };
type DetailEntry = { data: VacancyDetail | null; error: string | null };

export const fetchVacancyList = createAsyncThunk<
  ListEntry,
  { language: string; category?: string },
  { state: RootState }
>(
  'vacancy/fetchList',
  async (payload, { getState, rejectWithValue }) => {
    const category = payload.category ?? 'all';
    const key = listKey(payload.language, category);
    const existing = getState().vacancy.listByKey[key];
    if (existing?.data?.length !== undefined) {
      return existing;
    }
    const categoryParam = category !== 'all' ? `&category=${category}` : '';
    const res = await fetch(
      `/api/vacancies?lang=${payload.language}&active_only=true${categoryParam}`
    );
    if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data?.vacancies)
      ? data.vacancies
      : Array.isArray(data)
        ? data
        : [];
    return { data: list, error: null };
  }
);

export const fetchVacancyById = createAsyncThunk<
  DetailEntry,
  { id: string; language: string },
  { state: RootState }
>(
  'vacancy/fetchById',
  async (payload, { getState, rejectWithValue }) => {
    const existing = getState().vacancy.byId[payload.id];
    if (existing?.data) {
      return existing;
    }
    const res = await fetch(
      `/api/vacancies/${payload.id}?lang=${payload.language}`
    );
    if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
    const data: VacancyDetail = await res.json();
    return { data, error: null };
  }
);

export type ApplyVacancyPayload = {
  id: string;
  formData: FormData;
};

export const applyToVacancy = createAsyncThunk<
  void,
  ApplyVacancyPayload,
  { rejectValue: string }
>(
  'vacancy/apply',
  async (payload, { rejectWithValue }) => {
    const res = await fetch(`/api/vacancies/${payload.id}/apply`, {
      method: 'POST',
      body: payload.formData,
    });
    if (!res.ok) return rejectWithValue('Submit failed');
  }
);

type VacancyState = {
  listByKey: Record<ListKey, ListEntry>;
  loadingListByKey: Record<ListKey, boolean>;
  byId: Record<string, DetailEntry>;
  loadingById: Record<string, boolean>;
};

const initialState: VacancyState = {
  listByKey: {},
  loadingListByKey: {},
  byId: {},
  loadingById: {},
};

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {
    clearVacancyList(
      state,
      action: { payload: { language: string; category?: string } }
    ) {
      const category = action.payload.category ?? 'all';
      const key = listKey(action.payload.language, category);
      delete state.listByKey[key];
      delete state.loadingListByKey[key];
    },
    clearVacancyId(state, action: { payload: string }) {
      const id = action.payload;
      delete state.byId[id];
      delete state.loadingById[id];
    },
    clearAllVacancy() {
      return {
        listByKey: {},
        loadingListByKey: {},
        byId: {},
        loadingById: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancyList.pending, (state, action) => {
        const category = action.meta.arg.category ?? 'all';
        const key = listKey(action.meta.arg.language, category);
        state.loadingListByKey[key] = true;
      })
      .addCase(fetchVacancyList.fulfilled, (state, action) => {
        const category = action.meta.arg.category ?? 'all';
        const key = listKey(action.meta.arg.language, category);
        state.listByKey[key] = action.payload;
        state.loadingListByKey[key] = false;
      })
      .addCase(fetchVacancyList.rejected, (state, action) => {
        const category = action.meta.arg.category ?? 'all';
        const key = listKey(action.meta.arg.language, category);
        state.loadingListByKey[key] = false;
        state.listByKey[key] = {
          data: [],
          error:
            (action.payload as string) ??
            action.error.message ??
            'Unknown error',
        };
      })
      .addCase(fetchVacancyById.pending, (state, action) => {
        state.loadingById[action.meta.arg.id] = true;
      })
      .addCase(fetchVacancyById.fulfilled, (state, action) => {
        const id = action.meta.arg.id;
        state.byId[id] = action.payload;
        state.loadingById[id] = false;
      })
      .addCase(fetchVacancyById.rejected, (state, action) => {
        const id = action.meta.arg.id;
        state.loadingById[id] = false;
        state.byId[id] = {
          data: null,
          error:
            (action.payload as string) ??
            action.error.message ??
            'Unknown error',
        };
      });
  },
});

export const { clearVacancyList, clearVacancyId, clearAllVacancy } =
  vacancySlice.actions;

export const selectVacancyListEntry =
  (language: string, category: string) =>
  (state: RootState): ListEntry | undefined =>
    state.vacancy.listByKey[listKey(language, category)];

export const selectVacancyListLoading =
  (language: string, category: string) =>
  (state: RootState): boolean =>
    state.vacancy.loadingListByKey[listKey(language, category)] ?? false;

export const selectVacancyDetailEntry =
  (id: string) =>
  (state: RootState): DetailEntry | undefined =>
    state.vacancy.byId[id];

export const selectVacancyDetailLoading =
  (id: string) =>
  (state: RootState): boolean =>
    state.vacancy.loadingById[id] ?? false;

export default vacancySlice.reducer;
