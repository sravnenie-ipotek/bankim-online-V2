'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/ui/Container/Container'

interface UserData {
  name?: string
  email?: string
  phone?: string
  [key: string]: string | undefined
}

export default function ViewPage() {
  const params = useParams()
  const id = params.id as string

  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/get/${id}`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchUser()
  }, [id])

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
        </div>
      </Container>
    )
  }

  if (error || !user) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-16">
          <p className="text-red-400">User not found</p>
          <Link
            href="/"
            className="px-4 py-2 bg-accent-primary text-base-primary rounded-lg hover:bg-accent-primaryActiveButton transition-colors"
          >
            Go Back
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="flex flex-col gap-6 w-full my-8">
        <div className="p-6 bg-base-secondary rounded-lg">
          <h2 className="text-2xl font-semibold text-textTheme-primary mb-4">User Details</h2>
          {Object.entries(user).map(([key, value]) => (
            <div key={key} className="flex gap-4 py-2 border-b border-base-stroke last:border-b-0">
              <span className="text-sm font-medium text-textTheme-secondary capitalize w-32">{key}</span>
              <span className="text-sm text-textTheme-primary">{value || '-'}</span>
            </div>
          ))}
        </div>
        <Link
          href="/"
          className="inline-flex px-4 py-2 bg-accent-primary text-base-primary rounded-lg hover:bg-accent-primaryActiveButton transition-colors w-fit"
        >
          Go Back
        </Link>
      </div>
    </Container>
  )
}
