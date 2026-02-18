'use client'

import { useState } from 'react'

/**
 * Theme hook that provides the extended Tailwind theme configuration.
 * Standalone version that reads from the web-next tailwind config.
 */
const useTheme = () => {
  const [theme] = useState(() => {
    // Return common theme colors used throughout the app
    return {
      colors: {
        accent: {
          primary: '#FBE54D',
          secondary: '#2A2B31',
          primaryActiveButton: '#F9E136',
          tertiary: '#3A3B42',
        },
        base: {
          primary: '#171717',
          secondary: '#222326',
          base800: '#2F3035',
          inputs: '#35373F',
          stroke: '#424545',
          disabled: '#6B6D70',
          icons: '#8E9092',
        },
        textTheme: {
          primary: '#E7E9EA',
          secondary: '#A0A2A5',
          disabled: '#6B6D70',
        },
      },
    }
  })

  return theme
}

export default useTheme
