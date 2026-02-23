import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { ContentResponse } from '@/interfaces/ContentResponse';
import { getContentCached } from '@/helpers/contentApiCache';

export type ContentEntry = { data: ContentResponse | null; error: string | null };

function contentKey(screenLocation: string, language: string): string {
  return `${screenLocation}:${language}`;
}

export const fetchContent = createAsyncThunk<
  ContentEntry,
  { screenLocation: string; language: string },
  { state: RootState }
>(
  'content/fetch',
  async (payload, { rejectWithValue }) => {
    const result = await getContentCached(
      payload.screenLocation,
      payload.language
    );
    if (result.error && result.error !== 'Aborted') {
      return rejectWithValue(result.error);
    }
    return result;
  },
  {
    condition: (payload, { getState }) => {
      const state = getState();
      const key = contentKey(payload.screenLocation, payload.language);
      if (state.content.loadingByKey[key]) return false;
      if (state.content.byKey[key]?.data?.content) return false;
      return true;
    },
  }
);

type ContentState = {
  byKey: Record<string, ContentEntry>;
  loadingByKey: Record<string, boolean>;
};

const initialState: ContentState = {
  byKey: {},
  loadingByKey: {},
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearContentKey(
      state,
      action: { payload: { screenLocation: string; language: string } }
    ) {
      const key = contentKey(
        action.payload.screenLocation,
        action.payload.language
      );
      delete state.byKey[key];
      delete state.loadingByKey[key];
    },
    clearAllContent() {
      return { byKey: {}, loadingByKey: {} };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state, action) => {
        const key = contentKey(
          action.meta.arg.screenLocation,
          action.meta.arg.language
        );
        state.loadingByKey[key] = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        const key = contentKey(
          action.meta.arg.screenLocation,
          action.meta.arg.language
        );
        state.byKey[key] = action.payload;
        state.loadingByKey[key] = false;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        const key = contentKey(
          action.meta.arg.screenLocation,
          action.meta.arg.language
        );
        state.loadingByKey[key] = false;
      });
  },
});

export const { clearContentKey, clearAllContent } = contentSlice.actions;

export const selectContentEntry =
  (screenLocation: string, language: string) =>
  (state: RootState): ContentEntry | undefined =>
    state.content.byKey[contentKey(screenLocation, language)];

export const selectContentLoading =
  (screenLocation: string, language: string) =>
  (state: RootState): boolean =>
    state.content.loadingByKey[contentKey(screenLocation, language)] ?? false;

export default contentSlice.reducer;
