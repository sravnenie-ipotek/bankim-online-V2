import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: typeof window !== 'undefined' ? window.innerWidth : 1024,
  height: typeof window !== 'undefined' ? window.innerHeight : 768,
};

const windowSizeSlice = createSlice({
  name: 'windowSize',
  initialState,
  reducers: {
    updateWindowSize: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export const { updateWindowSize } = windowSizeSlice.actions;

export default windowSizeSlice.reducer;
