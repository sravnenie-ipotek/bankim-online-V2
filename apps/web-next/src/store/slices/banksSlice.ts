import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { ReferenceOption } from '@/interfaces/ReferenceOption';

type BanksListEntry = { data: ReferenceOption[]; error: string | null };

export const fetchBanksList = createAsyncThunk<
  BanksListEntry,
  void,
  { state: RootState }
>(
  'banks/fetchList',
  async (_, { getState, rejectWithValue }) => {
    const existing = getState().banks.list;
    if (existing?.error === null) return existing;
    const res = await fetch('/api/banks/list');
    if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data) ? data : [];
    return { data: list, error: null };
  }
);

export type RegisterBankEmployeePayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bank: string;
  position: string;
  branchNumber: string;
  employeeNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

export const registerBankEmployee = createAsyncThunk<
  void,
  RegisterBankEmployeePayload,
  { rejectValue: string }
>(
  'banks/registerEmployee',
  async (payload, { rejectWithValue }) => {
    const res = await fetch('/api/bank-employee/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return rejectWithValue('Registration failed');
  }
);

export type RegisterBankPartnerPayload = {
  name: string;
  email: string;
  phone: string;
  bank: string;
  position: string;
  serviceType: string;
  password: string;
  confirmPassword: string;
};

export const registerBankPartner = createAsyncThunk<
  { id: string },
  RegisterBankPartnerPayload,
  { rejectValue: string }
>(
  'banks/registerPartner',
  async (payload, { rejectWithValue }) => {
    const res = await fetch('/api/bank-employee/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return rejectWithValue('Registration failed');
    const data = await res.json();
    return { id: data.id };
  }
);

type BanksState = {
  list: BanksListEntry | null;
  loadingList: boolean;
};

const initialState: BanksState = {
  list: null,
  loadingList: false,
};

const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    clearBanksList(state) {
      state.list = null;
      state.loadingList = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanksList.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(fetchBanksList.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loadingList = false;
      })
      .addCase(fetchBanksList.rejected, (state, action) => {
        state.loadingList = false;
        state.list = {
          data: [],
          error: (action.payload as string) ?? action.error.message ?? 'Unknown error',
        };
      });
  },
});

export const { clearBanksList } = banksSlice.actions;

export const selectBanksList = (state: RootState): BanksListEntry | null =>
  state.banks.list;

export const selectBanksListLoading = (state: RootState): boolean =>
  state.banks.loadingList;

export default banksSlice.reducer;
