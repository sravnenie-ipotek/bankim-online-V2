import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Currency, CurrencyState } from './interfaces/CurrencyState'

const initialState: CurrencyState = {
  currency: 'ILS', // Default currency
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer; 