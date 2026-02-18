'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Container from '@/components/ui/Container/Container'

interface NavItem {
  href: string
  labelKey: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/personal-cabinet/questionnaire-overview', labelKey: 'cabinet_questionnaire', icon: '📋' },
  { href: '/personal-cabinet/main-borrower-personal-data', labelKey: 'cabinet_personal_data', icon: '👤' },
  { href: '/personal-cabinet/income-data', labelKey: 'cabinet_income', icon: '💰' },
  { href: '/personal-cabinet/documents', labelKey: 'cabinet_documents', icon: '📄' },
  { href: '/personal-cabinet/credit-history', labelKey: 'cabinet_credit_history', icon: '📊' },
  { href: '/personal-cabinet/bank-authorization', labelKey: 'cabinet_bank_auth', icon: '🏦' },
  { href: '/personal-cabinet/settings', labelKey: 'cabinet_settings', icon: '⚙️' },
  { href: '/personal-cabinet/notifications', labelKey: 'cabinet_notifications', icon: '🔔' },
  { href: '/payments', labelKey: 'cabinet_payments', icon: '💳' },
]

export default function PersonalCabinet() {
  const { t } = useTranslation()

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8">
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {t('personal_cabinet_title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-6 bg-base-secondary rounded-lg hover:bg-base-base800 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-textTheme-primary font-medium">{t(item.labelKey)}</span>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
}
