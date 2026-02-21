'use client'

import React from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container/Container'
import { useContentApi } from '@hooks/useContentApi'

export default function ApplicationSubmitted() {
  const { getContent } = useContentApi('common')

  return (
    <Container>
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M14 24L22 32L34 16" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent('application_submitted_title')}
        </h1>
        <p className="text-base text-textTheme-secondary max-w-md">
          {getContent('application_submitted_message')}
        </p>

        <Link
          href="/personal-cabinet"
          className="mt-4 px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors"
        >
          {getContent('go_to_personal_cabinet')}
        </Link>
      </div>
    </Container>
  )
}
