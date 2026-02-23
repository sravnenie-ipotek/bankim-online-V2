import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import bankWorkerReducer from './slices/bankWorkerSlice';
import banksReducer from './slices/banksSlice';
import contentReducer from './slices/contentSlice';
import currencyReducer from './slices/currencySlice';
import calculateMortgageReducer from './slices/calculateMortgageSlice';
import dialogReducer from './slices/dialogSlice';
import documentsReducer from './slices/documentsSlice';
import dropdownReducer from './slices/dropdownSlice';
import languageReducer from './slices/languageSlice';
import lawyersReducer from './slices/lawyersSlice';
import brokersReducer from './slices/brokersSlice';
import referenceReducer from './slices/referenceSlice';
import windowSizeReducer from './slices/windowSizeSlice';
import videoPosterReducer from './slices/videoPosterSlice';
import viewReducer from './slices/viewSlice';
import vacancyReducer from './slices/vacancySlice';

function placeholderReducer(state: Record<string, unknown> = {}): Record<string, unknown> {
  return state;
}

const languagePersistConfig = { key: 'lang', storage };
const persistedLanguageReducer = persistReducer(languagePersistConfig, languageReducer);

const mortgagePersistConfig = { key: 'calculateMortgage', storage };
const persistedMortgageReducer = persistReducer(mortgagePersistConfig, calculateMortgageReducer);

const store = configureStore({
  reducer: {
    language: persistedLanguageReducer,
    windowSize: windowSizeReducer,
    videoPoster: videoPosterReducer,
    auth: authReducer,
    admin: adminReducer,
    bankWorker: bankWorkerReducer,
    banks: banksReducer,
    content: contentReducer,
    dialog: dialogReducer,
    documents: documentsReducer,
    dropdown: dropdownReducer,
    currency: currencyReducer,
    login: placeholderReducer,
    mortgage: persistedMortgageReducer,
    refinanceMortgage: placeholderReducer,
    reference: referenceReducer,
    refinanceCredit: placeholderReducer,
    credit: placeholderReducer,
    lawyers: lawyersReducer,
    brokers: brokersReducer,
    borrowers: placeholderReducer,
    otherBorrowers: placeholderReducer,
    borrowersPersonalData: placeholderReducer,
    filter: placeholderReducer,
    modalSlice: placeholderReducer,
    activeField: placeholderReducer,
    view: viewReducer,
    vacancy: vacancyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['dialog'],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
