import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import currencyReducer from './slices/currencySlice'
import calculateMortgageReducer from './slices/calculateMortgageSlice'
import dialogReducer from './slices/dialogSlice'
import languageReducer from './slices/languageSlice'
import windowSizeReducer from './slices/windowSizeSlice'
import videoPosterReducer from './slices/videoPosterSlice'

function placeholderReducer(state: Record<string, unknown> = {}): Record<string, unknown> {
  return state
}

const languagePersistConfig = { key: 'lang', storage }
const persistedLanguageReducer = persistReducer(
  languagePersistConfig,
  languageReducer
)

const mortgagePersistConfig = { key: 'calculateMortgage', storage }
const persistedMortgageReducer = persistReducer(
  mortgagePersistConfig,
  calculateMortgageReducer
)

const store = configureStore({
  reducer: {
    language: persistedLanguageReducer,
    windowSize: windowSizeReducer,
    videoPoster: videoPosterReducer,
    auth: authReducer,
    dialog: dialogReducer,
    currency: currencyReducer,
    login: placeholderReducer,
    mortgage: persistedMortgageReducer,
    refinanceMortgage: placeholderReducer,
    refinanceCredit: placeholderReducer,
    credit: placeholderReducer,
    borrowers: placeholderReducer,
    otherBorrowers: placeholderReducer,
    borrowersPersonalData: placeholderReducer,
    filter: placeholderReducer,
    modalSlice: placeholderReducer,
    activeField: placeholderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['dialog'],
      },
    }),
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persistor }
