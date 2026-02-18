'use client'

import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'

/**
 * Emotion cache for SSR compatibility with Next.js App Router.
 * Creates a fresh cache instance and flushes styles into <head> during SSR.
 */
function createEmotionCache() {
  return createCache({ key: 'mui', prepend: true })
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#171717',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto), var(--font-arimo), Roboto, Arimo, sans-serif',
  },
})

interface ThemeRegistryProps {
  children: React.ReactNode
}

const ThemeRegistry: React.FC<ThemeRegistryProps> = ({ children }) => {
  const [cache] = useState(createEmotionCache)

  useServerInsertedHTML(() => {
    const entries = (cache as ReturnType<typeof createCache> & { inserted: Record<string, string | boolean> }).inserted
    if (!entries) return null

    let styles = ''
    const dataEmotionAttribute = cache.key

    const keys = Object.keys(entries)
    for (const key of keys) {
      const value = entries[key]
      if (typeof value === 'string') {
        styles += value
      }
    }

    if (!styles) return null

    return (
      <style
        key={dataEmotionAttribute}
        data-emotion={`${dataEmotionAttribute}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default ThemeRegistry
