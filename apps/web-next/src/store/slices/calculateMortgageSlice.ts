import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type MortgageState = Record<string, unknown> & {
  ltvRatios: Record<string, number> | null;
  ltvRatiosLoading: boolean;
};

const initialState: MortgageState = {
  ltvRatios: null,
  ltvRatiosLoading: false,
};

export const fetchMortgageLtvRatios = createAsyncThunk<
  Record<string, number>,
  void,
  { state: RootState }
>(
  'mortgage/fetchLtvRatios',
  async (_, { getState, rejectWithValue }) => {
    const existing = getState().mortgage?.ltvRatios;
    if (existing && Object.keys(existing).length > 0) {
      return existing;
    }
    const res = await fetch('/api/v1/calculation-parameters?business_path=mortgage');
    const data = await res.json();
    if (data.status !== 'success' || !data.data?.property_ownership_ltvs) {
      return rejectWithValue('Failed to load LTV ratios');
    }
    const ratios: Record<string, number> = {};
    Object.keys(data.data.property_ownership_ltvs).forEach((key) => {
      ratios[key] = data.data.property_ownership_ltvs[key].ltv / 100;
    });
    return ratios;
  }
);

const calculateMortgageSlice = createSlice({
  name: 'mortgage',
  initialState,
  reducers: {
    updateMortgageData(state, action: PayloadAction<Record<string, unknown>>) {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMortgageLtvRatios.pending, (state) => {
        state.ltvRatiosLoading = true;
      })
      .addCase(fetchMortgageLtvRatios.fulfilled, (state, action) => {
        state.ltvRatios = action.payload;
        state.ltvRatiosLoading = false;
      })
      .addCase(fetchMortgageLtvRatios.rejected, (state) => {
        state.ltvRatiosLoading = false;
      });
  },
});

export const { updateMortgageData } = calculateMortgageSlice.actions;

export const selectMortgageLtvRatios = (state: RootState): Record<string, number> | null =>
  state.mortgage?.ltvRatios ?? null;
export const selectMortgageLtvRatiosLoading = (state: RootState): boolean =>
  state.mortgage?.ltvRatiosLoading ?? false;

export default calculateMortgageSlice.reducer;
