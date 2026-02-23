import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { ViewUserData } from '@/interfaces/ViewUserData';

export type ViewEntry = {
  data: ViewUserData | null;
  error: string | null;
};

export const fetchView = createAsyncThunk<
  ViewEntry,
  string,
  { state: RootState }
>(
  'view/fetch',
  async (id, { getState, rejectWithValue }) => {
    const existing = getState().view.byId[id];
    if (existing?.data) {
      return existing;
    }
    const response = await fetch(`/api/get/${id}`);
    if (!response.ok) {
      return rejectWithValue(`HTTP ${response.status}`);
    }
    const data: ViewUserData = await response.json();
    return { data, error: null };
  }
);

type ViewState = {
  byId: Record<string, ViewEntry>;
  loadingById: Record<string, boolean>;
};

const initialState: ViewState = {
  byId: {},
  loadingById: {},
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    clearViewId(state, action: { payload: string }) {
      const id = action.payload;
      delete state.byId[id];
      delete state.loadingById[id];
    },
    clearAllView() {
      return { byId: {}, loadingById: {} };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchView.pending, (state, action) => {
        state.loadingById[action.meta.arg] = true;
      })
      .addCase(fetchView.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.byId[id] = action.payload;
        state.loadingById[id] = false;
      })
      .addCase(fetchView.rejected, (state, action) => {
        const id = action.meta.arg;
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

export const { clearViewId, clearAllView } = viewSlice.actions;

export const selectViewEntry =
  (id: string) =>
  (state: RootState): ViewEntry | undefined =>
    state.view.byId[id];

export const selectViewLoading =
  (id: string) =>
  (state: RootState): boolean =>
    state.view.loadingById[id] ?? false;

export default viewSlice.reducer;
