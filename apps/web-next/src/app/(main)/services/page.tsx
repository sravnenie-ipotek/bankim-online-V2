'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container/Container'
import { trackClick } from '@/helpers/analytics'

interface ServiceItem {
  titleKey: string
  descriptionKey: string
  route: string
  icon: string
}

const SERVICES: ServiceItem[] = [
  { titleKey: 'calculate_mortgage', descriptionKey: 'calculate_mortgage_desc', route: '/services/calculate-mortgage/1', icon: '🏠' },
  { titleKey: 'refinance_mortgage', descriptionKey: 'refinance_mortgage_desc', route: '/services/refinance-mortgage/1', icon: '🔄' },
  { titleKey: 'calculate_credit', descriptionKey: 'calculate_credit_desc', route: '/services/calculate-credit/1', icon: '💳' },
  { titleKey: 'refinance_credit', descriptionKey: 'refinance_credit_desc', route: '/services/refinance-credit/1', icon: '📊' },
]

export default function ServicesOverview() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8">
        <h1 className="text-5xl font-medium text-textTheme-primary sm:text-[1.9375rem]">
          {t('services_title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <button
              key={service.route}
              onClick={() => {
                trackClick('start_calculation', service.route)
                router.push(service.route)
              }}
              className="flex items-start gap-4 p-6 bg-base-secondary rounded-lg hover:bg-base-base800 transition-colors text-left"
            >
              <span className="text-4xl">{service.icon}</span>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-textTheme-primary">
                  {t(service.titleKey)}
                </h2>
                <p className="text-sm text-textTheme-secondary">{t(service.descriptionKey)}</p>
                <span className="text-accent-primary text-sm font-medium flex items-center gap-1">
                  {t('start_calculation')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Container>
  )
}
