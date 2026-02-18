'use client'

import { useEffect, useState } from 'react'
import type { ServerMode } from './interfaces/ServerMode'

export const useServerMode = () => {
  const [serverMode, setServerMode] = useState<ServerMode | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkServerMode = async () => {
      try {
        const response = await fetch('/api/server-mode')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setServerMode(data)
        setError(null)
      } catch (err) {
        console.error('Failed to detect server mode:', err)
        setError('Could not detect server mode')
        setServerMode({
          mode: 'legacy',
          server: 'unknown',
          file: 'unknown',
          warning: true,
          message: 'SERVER MODE DETECTION FAILED',
          recommendedSwitch: 'npm run server:dev',
        })
      } finally {
        setLoading(false)
      }
    }

    checkServerMode()
  }, [])

  return { serverMode, loading, error }
}

export default useServerMode
