'use client'

import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from '@/store'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'

interface StoreProviderProps {
  children: React.ReactNode
}

/**
 * Redux store provider using the full legacy store.
 * Manually waits for redux-persist rehydration before rendering children
 * (PersistGate has React 19 type incompatibilities).
 */
const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [rehydrated, setRehydrated] = useState(false)

  useEffect(() => {
    const unsubscribe = persistor.subscribe(() => {
      const { bootstrapped } = persistor.getState()
      if (bootstrapped) {
        setRehydrated(true)
        unsubscribe()
      }
    })
    // In case it's already bootstrapped, defer setState to avoid sync setState in effect
    if (persistor.getState().bootstrapped) {
      const id = setTimeout(() => setRehydrated(true), 0)
      return () => {
        clearTimeout(id)
        unsubscribe()
      }
    }
    return unsubscribe
  }, [])

  if (!rehydrated) {
    return <LoadingSpinner />
  }

  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
