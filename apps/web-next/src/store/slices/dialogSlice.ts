import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import type { IDialogState } from './interfaces/IDialogState'

const initialState: IDialogState = {
  title: null,
  onOk: null,
  okTitle: null,
  onCancel: null,
  onClose: null,
  cancelTitle: null,
  isVisible: false,
  content: null,
  isCloseIcon: false,
  maxWidth: null,
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<Partial<IDialogState>>) => {
      return {
        ...state,
        ...action.payload,
        isVisible: true,
      }
    },
    cancelDialog: (state) => {
      return { ...initialState }
    },
  },
})

export const { setDialog, cancelDialog } = dialogSlice.actions
export const dialogSelector = (state: RootState) => state.dialog
export default dialogSlice.reducer
