'use client'

import React from 'react'

/**
 * Plain-HTML loading spinner.
 * Avoids MUI/Emotion so server and client HTML are identical (no hydration mismatch).
 * Reusable for i18n, store, or any full-page loading state.
 */
const LoadingSpinner: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        border: '4px solid #e0e0e0',
        borderTopColor: '#1976d2',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)

export default LoadingSpinner
