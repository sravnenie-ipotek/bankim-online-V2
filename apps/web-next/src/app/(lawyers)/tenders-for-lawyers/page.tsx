'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container/Container'

const ADVANTAGES = [
  'tenders_advantage_1',
  'tenders_advantage_2',
  'tenders_advantage_3',
  'tenders_advantage_4',
]

const STEPS = [
  { num: '01', key: 'tenders_step_1' },
  { num: '02', key: 'tenders_step_2' },
  { num: '03', key: 'tenders_step_3' },
]

export default function TendersForLawyers() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleRegister = () => {
    router.push('/lawyers')
  }

  return (
    <Container>
      <div className="flex flex-col gap-16 w-full my-8">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-medium text-textTheme-primary sm:text-[1.9375rem]">
            {t('tenders_for_lawyers_title')}
          </h1>
          <p className="text-base text-textTheme-secondary max-w-[48rem]">
            {t('tenders_for_lawyers_subtitle')}
          </p>
          <button
            onClick={handleRegister}
            className="mt-4 px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors w-fit"
          >
            {t('tenders_register_button')}
          </button>
        </div>

        {/* About */}
        <div className="flex flex-col gap-4 p-8 bg-base-secondary rounded-lg">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {t('tenders_about_title')}
          </h2>
          <p className="text-base text-textTheme-secondary leading-relaxed">
            {t('tenders_about_text')}
          </p>
        </div>

        {/* Earnings */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {t('tenders_earnings_title')}
          </h2>
          <p className="text-base text-textTheme-secondary leading-relaxed">
            {t('tenders_earnings_text')}
          </p>
        </div>

        {/* Advantages */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {t('tenders_advantages_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADVANTAGES.map((key) => (
              <div key={key} className="flex items-start gap-3 p-4 bg-base-secondary rounded-lg">
                <span className="text-accent-primary text-xl">&#10003;</span>
                <span className="text-textTheme-primary">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {t('tenders_how_it_works')}
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="flex-1 flex flex-col gap-2 p-6 bg-base-secondary rounded-lg">
                <span className="text-4xl font-bold text-accent-primary">{step.num}</span>
                <p className="text-textTheme-primary">{t(step.key)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-6 p-8 bg-base-secondary rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {t('tenders_cta_title')}
          </h2>
          <button
            onClick={handleRegister}
            className="px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors"
          >
            {t('tenders_cta_button')}
          </button>
        </div>
      </div>
    </Container>
  )
}
