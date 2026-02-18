/**
 * Minimal Redux store for Phase 0 skeleton.
 * In Phase 1 this will be replaced by importing the full store
 * from the existing web app: @src/store
 */
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    // Placeholder — full slices will be wired in Phase 1
    _placeholder: (state = {}) => state,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }
