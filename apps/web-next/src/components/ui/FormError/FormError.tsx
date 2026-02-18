'use client'

import React from 'react'
import type { FormErrorProps } from './interfaces/FormErrorProps'

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null

  const message = typeof error === 'string' ? error : 'An error occurred'

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded bg-red-900/30 border border-red-700/50 mt-1">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <path
          d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8s2.91 6.5 6.5 6.5 6.5-2.91 6.5-6.5S11.59 1.5 8 1.5Zm0 10a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm.75-3.25a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 1.5 0v3Z"
          fill="#EF4444"
        />
      </svg>
      <span className="text-xs text-red-400 font-normal leading-[140%]">{message}</span>
    </div>
  )
}

export default FormError
