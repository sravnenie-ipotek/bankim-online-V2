import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { StructuredDropdownResponse } from '@/hooks/interfaces/StructuredDropdownResponse';

function dropdownCacheKey(screenLocation: string, language: string): string {
  return `${screenLocation}:${language}`;
}

export type DropdownEntry = {
  data: StructuredDropdownResponse | null;
  error: string | null;
};

export const fetchDropdowns = createAsyncThunk<
  DropdownEntry,
  { screenLocation: string; language: string },
  { state: RootState }
>(
  'dropdown/fetch',
  async (payload, { getState, rejectWithValue }) => {
    const key = dropdownCacheKey(payload.screenLocation, payload.language);
    const existing = getState().dropdown.byKey[key];
    if (existing?.data) {
      return existing;
    }
    const response = await fetch(
      `/api/dropdowns/${payload.screenLocation}/${payload.language}`
    );
    if (!response.ok) {
      return rejectWithValue(
        `HTTP ${response.status}: ${response.statusText}`
      );
    }
    const apiData: StructuredDropdownResponse = await response.json();
    if (apiData.status !== 'success') {
      return rejectWithValue(`API Error: ${apiData.status}`);
    }
    return { data: apiData, error: null };
  }
);

type DropdownState = {
  byKey: Record<string, DropdownEntry>;
  loadingByKey: Record<string, boolean>;
};

const initialState: DropdownState = {
  byKey: {},
  loadingByKey: {},
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    clearDropdownKey(
      state,
      action: { payload: { screenLocation: string; language: string } }
    ) {
      const key = dropdownCacheKey(
        action.payload.screenLocation,
        action.payload.language
      );
      delete state.byKey[key];
      delete state.loadingByKey[key];
    },
    clearAllDropdowns() {
      return { byKey: {}, loadingByKey: {} };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDropdowns.pending, (state, action) => {
        const key = dropdownCacheKey(
          action.meta.arg.screenLocation,
          action.meta.arg.language
        );
        state.loadingByKey[key] = true;
      })
      .addCase(fetchDropdowns.fulfilled, (state, action) => {
        const key = dropdownCacheKey(
          action.meta.arg.screenLocation,
          action.meta.arg.language
        );
        state.byKey[key] = action.payload;
        state.loadingByKey[key] = false;
      })
      .addCase(fetchDropdowns.rejected, (state, action) => {
        const key = dropdownCacheKey(
          action.meta.arg.screenLocation,
          action.meta.arg.language
        );
        state.loadingByKey[key] = false;
        state.byKey[key] = {
          data: null,
          error:
            (action.payload as string) ??
            action.error.message ??
            'Unknown error',
        };
      });
  },
});

export const { clearDropdownKey, clearAllDropdowns } = dropdownSlice.actions;

export const selectDropdownEntry =
  (screenLocation: string, language: string) =>
  (state: RootState): DropdownEntry | undefined =>
    state.dropdown.byKey[dropdownCacheKey(screenLocation, language)];

export const selectDropdownLoading =
  (screenLocation: string, language: string) =>
  (state: RootState): boolean =>
    state.dropdown.loadingByKey[dropdownCacheKey(screenLocation, language)] ??
    false;

export default dropdownSlice.reducer;
