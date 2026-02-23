import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type SubmitBrokerPayload = Record<string, string | number | boolean>;

export const submitBroker = createAsyncThunk<
  void,
  SubmitBrokerPayload,
  { rejectValue: string }
>(
  'brokers/submit',
  async (payload, { rejectWithValue }) => {
    const res = await fetch('/api/brokers/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return rejectWithValue('Submit failed');
  }
);

type BrokersState = {
  submitLoading: boolean;
  submitError: string | null;
};

const initialState: BrokersState = {
  submitLoading: false,
  submitError: null,
};

const brokersSlice = createSlice({
  name: 'brokers',
  initialState,
  reducers: {
    clearBrokerSubmitError(state) {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBroker.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;
      })
      .addCase(submitBroker.fulfilled, (state) => {
        state.submitLoading = false;
        state.submitError = null;
      })
      .addCase(submitBroker.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError = (action.payload as string) ?? action.error.message ?? 'Unknown error';
      });
  },
});

export const { clearBrokerSubmitError } = brokersSlice.actions;

export const selectBrokerSubmitLoading = (state: RootState): boolean =>
  state.brokers.submitLoading;
export const selectBrokerSubmitError = (state: RootState): string | null =>
  state.brokers.submitError;

export default brokersSlice.reducer;
