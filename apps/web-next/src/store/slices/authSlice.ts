import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

import { EAuthSteps } from '@/types/enums/authSteps.enum'
import { ERestorePasswordSteps } from '@/types/enums/restorePasswordSteps.enum'
import { ESignUpSteps } from '@/types/enums/signUpSteps.enum'
import type { IAuthState, Tab, LoginStep } from './interfaces/IAuthState'
import type { IAuthUser } from './interfaces/IAuthUser'

export type { Tab } from './interfaces/IAuthState'

const isBrowser = typeof window !== 'undefined'

/* ------------------------------------------------------------------ */
/*  Async thunks                                                      */
/* ------------------------------------------------------------------ */

/** Email + password login -> returns JWT + user */
export const emailLogin = createAsyncThunk(
  'auth/emailLogin',
  async (
    payload: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data.message || 'Login failed')
      return data.data as { token: string; user: IAuthUser }
    } catch {
      return rejectWithValue('Network error')
    }
  },
)

/** Send SMS code to phone number */
export const sendSmsCode = createAsyncThunk(
  'auth/sendSmsCode',
  async (mobileNumber: string, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/auth-mobile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_number: mobileNumber }),
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data.message || 'Failed to send SMS')
      return data.data as { mobile_number: string }
    } catch {
      return rejectWithValue('Network error')
    }
  },
)

/** Verify SMS code -> returns JWT + user */
export const verifySmsCode = createAsyncThunk(
  'auth/verifySmsCode',
  async (
    payload: { code: string; mobile_number: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch('/api/auth-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data.message || 'Verification failed')
      return data.data as { token: string; user: IAuthUser }
    } catch {
      return rejectWithValue('Network error')
    }
  },
)

/* ------------------------------------------------------------------ */
/*  Slice                                                             */
/* ------------------------------------------------------------------ */

const initialState: IAuthState = {
  authStep: EAuthSteps.Auth,
  restorePasswordStep: ERestorePasswordSteps.TypeVerify,
  signUpStep: ESignUpSteps.SignUp,
  activeTab: 'phone',

  isLoginDialogOpen: false,
  loginStep: 'form',
  pendingPhone: null,

  user: null,
  token: isBrowser ? localStorage.getItem('authToken') : null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openLoginDialog(state) {
      state.isLoginDialogOpen = true
      state.loginStep = 'form'
      state.error = null
    },
    closeLoginDialog(state) {
      state.isLoginDialogOpen = false
      state.loginStep = 'form'
      state.pendingPhone = null
      state.error = null
    },
    setActiveTab(state, action: PayloadAction<Tab>) {
      state.activeTab = action.payload
      state.error = null
    },
    setLoginStep(state, action: PayloadAction<LoginStep>) {
      state.loginStep = action.payload
    },
    setAuthSteps(state, action: PayloadAction<EAuthSteps>) {
      state.authStep = action.payload
    },
    setRestorePasswordSteps(
      state,
      action: PayloadAction<ERestorePasswordSteps>,
    ) {
      state.restorePasswordStep = action.payload
    },
    setSignUpSteps(state, action: PayloadAction<ESignUpSteps>) {
      state.signUpStep = action.payload
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      if (isBrowser) localStorage.removeItem('authToken')
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    /* Email login */
    builder
      .addCase(emailLogin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(emailLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.isLoginDialogOpen = false
        if (isBrowser) localStorage.setItem('authToken', action.payload.token)
      })
      .addCase(emailLogin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    /* Send SMS code */
    builder
      .addCase(sendSmsCode.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(sendSmsCode.fulfilled, (state, action) => {
        state.isLoading = false
        state.pendingPhone = action.payload.mobile_number
        state.loginStep = 'sms-verify'
      })
      .addCase(sendSmsCode.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    /* Verify SMS code */
    builder
      .addCase(verifySmsCode.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifySmsCode.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.isLoginDialogOpen = false
        state.loginStep = 'form'
        state.pendingPhone = null
        if (isBrowser) localStorage.setItem('authToken', action.payload.token)
      })
      .addCase(verifySmsCode.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const {
  openLoginDialog,
  closeLoginDialog,
  setActiveTab,
  setLoginStep,
  setAuthSteps,
  setRestorePasswordSteps,
  setSignUpSteps,
  logout,
  clearAuthError,
} = authSlice.actions

/* Selectors */
export const authStepSelector = (state: RootState) => state.auth.authStep
export const restorePasswordStepSelector = (state: RootState) =>
  state.auth.restorePasswordStep
export const signUpStepSelector = (state: RootState) => state.auth.signUpStep
export const activeTabSelector = (state: RootState) => state.auth.activeTab
export const isLoginDialogOpenSelector = (state: RootState) =>
  state.auth.isLoginDialogOpen
export const loginStepSelector = (state: RootState) => state.auth.loginStep
export const pendingPhoneSelector = (state: RootState) =>
  state.auth.pendingPhone
export const authUserSelector = (state: RootState) => state.auth.user
export const authTokenSelector = (state: RootState) => state.auth.token
export const isAuthenticatedSelector = (state: RootState) =>
  state.auth.isAuthenticated
export const authLoadingSelector = (state: RootState) => state.auth.isLoading
export const authErrorSelector = (state: RootState) => state.auth.error

export default authSlice.reducer
