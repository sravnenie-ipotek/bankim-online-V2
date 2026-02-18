'use client'

import React, { useEffect } from 'react'
import Container from '@/components/ui/Container/Container'

export default function AdminLogin() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/admin-panel'
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <h1 className="text-2xl font-medium text-textTheme-primary">Admin Panel</h1>
        <p className="text-textTheme-secondary">
          Redirecting to the new admin panel...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
        <a
          href="/admin-panel"
          className="mt-4 text-accent-primary hover:underline"
        >
          Click here if not redirected
        </a>
      </div>
    </Container>
  )
}
