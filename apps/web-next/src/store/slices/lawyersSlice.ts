import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type SubmitLawyerPayload = Record<string, string | number | boolean>;

export const submitLawyer = createAsyncThunk<
  void,
  SubmitLawyerPayload,
  { rejectValue: string }
>(
  'lawyers/submit',
  async (payload, { rejectWithValue }) => {
    const res = await fetch('/api/lawyers/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return rejectWithValue('Submit failed');
  }
);

type LawyersState = {
  submitLoading: boolean;
  submitError: string | null;
};

const initialState: LawyersState = {
  submitLoading: false,
  submitError: null,
};

const lawyersSlice = createSlice({
  name: 'lawyers',
  initialState,
  reducers: {
    clearLawyerSubmitError(state) {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLawyer.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;
      })
      .addCase(submitLawyer.fulfilled, (state) => {
        state.submitLoading = false;
        state.submitError = null;
      })
      .addCase(submitLawyer.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError = (action.payload as string) ?? action.error.message ?? 'Unknown error';
      });
  },
});

export const { clearLawyerSubmitError } = lawyersSlice.actions;

export const selectLawyerSubmitLoading = (state: RootState): boolean =>
  state.lawyers.submitLoading;
export const selectLawyerSubmitError = (state: RootState): string | null =>
  state.lawyers.submitError;

export default lawyersSlice.reducer;
