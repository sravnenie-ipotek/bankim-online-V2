'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function BankWorkerDemo() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] p-8 bg-base-secondary rounded-lg text-center">
        <h1 className="text-2xl font-medium text-textTheme-primary mb-4">
          {t('bank_worker_demo_title')}
        </h1>
        <p className="text-textTheme-secondary mb-6">
          {t('bank_worker_demo_description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {['feature_1', 'feature_2', 'feature_3', 'feature_4'].map((key) => (
            <div key={key} className="p-4 bg-base-base800 rounded-lg">
              <p className="text-textTheme-primary text-sm">{t(`demo_${key}`)}</p>
            </div>
          ))}
        </div>
        <Link
          href="/bank-worker/register/demo-token"
          className="inline-block px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors"
        >
          {t('start_demo')}
        </Link>
      </div>
    </div>
  )
}
