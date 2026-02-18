import { createSlice } from '@reduxjs/toolkit'

export interface VideoPosterPageState {
  currentTime: number
  isMuted: boolean
  isPlaying: boolean
  volume: number
}

const DEFAULT_PAGE_STATE: VideoPosterPageState = {
  currentTime: 0,
  isMuted: true,
  isPlaying: true,
  volume: 1,
}

export interface VideoPosterStatePayload {
  pageKey: string
  currentTime?: number
  isMuted?: boolean
  isPlaying?: boolean
  volume?: number
}

interface VideoPosterState {
  byPage: Record<string, VideoPosterPageState>
}

const initialState: VideoPosterState = {
  byPage: {},
}

const videoPosterSlice = createSlice({
  name: 'videoPoster',
  initialState,
  reducers: {
    setVideoState: (state, action: { payload: VideoPosterStatePayload }) => {
      const { pageKey, currentTime, isMuted, isPlaying, volume } = action.payload
      if (!state.byPage[pageKey]) {
        state.byPage[pageKey] = { ...DEFAULT_PAGE_STATE }
      }
      const page = state.byPage[pageKey]
      if (typeof currentTime === 'number') page.currentTime = currentTime
      if (typeof isMuted === 'boolean') page.isMuted = isMuted
      if (typeof isPlaying === 'boolean') page.isPlaying = isPlaying
      if (typeof volume === 'number') page.volume = volume
    },
    clearVideoStateForPage: (state, action: { payload: string }) => {
      const pageKey = action.payload
      delete state.byPage[pageKey]
    },
  },
})

export const { setVideoState, clearVideoStateForPage } = videoPosterSlice.actions
export const getDefaultVideoPosterState = (): VideoPosterPageState => ({ ...DEFAULT_PAGE_STATE })
export default videoPosterSlice.reducer
