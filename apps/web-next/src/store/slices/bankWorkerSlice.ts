import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { BankWorkerStatusData } from '@/interfaces/BankWorkerStatusData';
import type { BankWorkerRegistrationForm } from '@/interfaces/BankWorkerRegistrationForm';

type StatusEntry = { data: BankWorkerStatusData | null; error: string | null };
type FormEntry = { data: BankWorkerRegistrationForm | null; error: string | null };

export const fetchBankWorkerStatus = createAsyncThunk<
  StatusEntry,
  string,
  { state: RootState }
>(
  'bankWorker/fetchStatus',
  async (id, { getState, rejectWithValue }) => {
    const existing = getState().bankWorker.statusById[id];
    if (existing?.data) return existing;
    const res = await fetch(`/api/bank-worker/status/${id}`);
    if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
    const data: BankWorkerStatusData = await res.json();
    return { data, error: null };
  }
);

export const fetchBankWorkerRegistrationForm = createAsyncThunk<
  FormEntry,
  string,
  { state: RootState }
>(
  'bankWorker/fetchRegistrationForm',
  async (token, { getState, rejectWithValue }) => {
    const existing = getState().bankWorker.formByToken[token];
    if (existing?.data) return existing;
    const res = await fetch(`/api/bank-worker/registration-form/${token}`);
    if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
    const data: BankWorkerRegistrationForm = await res.json();
    return { data, error: null };
  }
);

export type CompleteRegistrationPayload = {
  token: string;
  name: string;
  position: string;
  branch: string;
  employeeNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

export const completeBankWorkerRegistration = createAsyncThunk<
  { id: string },
  CompleteRegistrationPayload,
  { rejectValue: string }
>(
  'bankWorker/completeRegistration',
  async (payload, { rejectWithValue }) => {
    const res = await fetch('/api/bank-worker/complete-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return rejectWithValue('Registration failed');
    const data = await res.json();
    return { id: data.id };
  }
);

type BankWorkerState = {
  statusById: Record<string, StatusEntry>;
  loadingStatusById: Record<string, boolean>;
  formByToken: Record<string, FormEntry>;
  loadingFormByToken: Record<string, boolean>;
};

const initialState: BankWorkerState = {
  statusById: {},
  loadingStatusById: {},
  formByToken: {},
  loadingFormByToken: {},
};

const bankWorkerSlice = createSlice({
  name: 'bankWorker',
  initialState,
  reducers: {
    clearBankWorkerStatus(state, action: { payload: string }) {
      delete state.statusById[action.payload];
      delete state.loadingStatusById[action.payload];
    },
    clearBankWorkerForm(state, action: { payload: string }) {
      delete state.formByToken[action.payload];
      delete state.loadingFormByToken[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankWorkerStatus.pending, (state, action) => {
        state.loadingStatusById[action.meta.arg] = true;
      })
      .addCase(fetchBankWorkerStatus.fulfilled, (state, action) => {
        state.statusById[action.meta.arg] = action.payload;
        state.loadingStatusById[action.meta.arg] = false;
      })
      .addCase(fetchBankWorkerStatus.rejected, (state, action) => {
        state.loadingStatusById[action.meta.arg] = false;
        state.statusById[action.meta.arg] = {
          data: null,
          error: (action.payload as string) ?? action.error.message ?? 'Unknown error',
        };
      })
      .addCase(fetchBankWorkerRegistrationForm.pending, (state, action) => {
        state.loadingFormByToken[action.meta.arg] = true;
      })
      .addCase(fetchBankWorkerRegistrationForm.fulfilled, (state, action) => {
        state.formByToken[action.meta.arg] = action.payload;
        state.loadingFormByToken[action.meta.arg] = false;
      })
      .addCase(fetchBankWorkerRegistrationForm.rejected, (state, action) => {
        state.loadingFormByToken[action.meta.arg] = false;
        state.formByToken[action.meta.arg] = {
          data: null,
          error: (action.payload as string) ?? action.error.message ?? 'Unknown error',
        };
      });
  },
});

export const { clearBankWorkerStatus, clearBankWorkerForm } = bankWorkerSlice.actions;

export const selectBankWorkerStatusEntry =
  (id: string) =>
  (state: RootState): StatusEntry | undefined =>
    state.bankWorker.statusById[id];

export const selectBankWorkerStatusLoading =
  (id: string) =>
  (state: RootState): boolean =>
    state.bankWorker.loadingStatusById[id] ?? false;

export const selectBankWorkerFormEntry =
  (token: string) =>
  (state: RootState): FormEntry | undefined =>
    state.bankWorker.formByToken[token];

export const selectBankWorkerFormLoading =
  (token: string) =>
  (state: RootState): boolean =>
    state.bankWorker.loadingFormByToken[token] ?? false;

export default bankWorkerSlice.reducer;
