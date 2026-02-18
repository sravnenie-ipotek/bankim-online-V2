'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Container from '@/components/ui/Container/Container'

export default function LawyerSuccess() {
  const { t } = useTranslation()

  return (
    <Container>
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M12 20L18 26L28 14" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {t('lawyer_success_title')}
        </h1>
        <p className="text-base text-textTheme-secondary max-w-md">
          {t('lawyer_success_message')}
        </p>
        <Link
          href="/"
          className="mt-4 px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors"
        >
          {t('back_to_home')}
        </Link>
      </div>
    </Container>
  )
}
