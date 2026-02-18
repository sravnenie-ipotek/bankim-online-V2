import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type MortgageState = Record<string, unknown>

const initialState: MortgageState = {}

const calculateMortgageSlice = createSlice({
  name: 'mortgage',
  initialState,
  reducers: {
    updateMortgageData(state, action: PayloadAction<Record<string, unknown>>) {
      Object.assign(state, action.payload)
    },
  },
})

export const { updateMortgageData } = calculateMortgageSlice.actions
export default calculateMortgageSlice.reducer
