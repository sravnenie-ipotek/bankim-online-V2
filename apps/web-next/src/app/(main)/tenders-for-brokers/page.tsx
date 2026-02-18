'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container/Container'
import { trackClick } from '@/helpers/analytics'

export default function TendersForBrokers() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Container>
      <div className="flex flex-col gap-16 w-full my-8">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-medium text-textTheme-primary sm:text-[1.9375rem]">
            {t('tenders_for_brokers_title')}
          </h1>
          <p className="text-base text-textTheme-secondary max-w-[48rem]">
            {t('tenders_for_brokers_subtitle')}
          </p>
          <button
            onClick={() => {
              trackClick('brokers_register', '/broker-questionnaire')
              router.push('/broker-questionnaire')
            }}
            className="mt-4 px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors w-fit"
          >
            {t('brokers_register_button')}
          </button>
        </div>

        {/* Clients & Earnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-base-secondary rounded-lg">
            <h2 className="text-2xl font-semibold text-textTheme-primary mb-4">
              {t('brokers_clients_title')}
            </h2>
            <p className="text-textTheme-secondary leading-relaxed">
              {t('brokers_clients_text')}
            </p>
          </div>
          <div className="p-8 bg-base-secondary rounded-lg">
            <h2 className="text-2xl font-semibold text-textTheme-primary mb-4">
              {t('brokers_earnings_title')}
            </h2>
            <p className="text-textTheme-secondary leading-relaxed">
              {t('brokers_earnings_text')}
            </p>
          </div>
        </div>

        {/* License */}
        <div className="flex flex-col gap-4 p-8 bg-base-secondary rounded-lg">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {t('brokers_license_title')}
          </h2>
          <p className="text-textTheme-secondary leading-relaxed">
            {t('brokers_license_text')}
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-textTheme-primary">{t('brokers_steps_title')}</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex-1 p-6 bg-base-secondary rounded-lg">
                <span className="text-4xl font-bold text-accent-primary">{`0${num}`}</span>
                <p className="text-textTheme-primary mt-2">{t(`brokers_step_${num}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {['deals', 'partners', 'cities', 'years'].map((metric) => (
            <div key={metric} className="p-6 bg-base-secondary rounded-lg">
              <span className="text-3xl font-bold text-accent-primary">{t(`brokers_metric_${metric}_value`)}</span>
              <p className="text-sm text-textTheme-secondary mt-1">{t(`brokers_metric_${metric}_label`)}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-6 p-8 bg-base-secondary rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {t('brokers_cta_title')}
          </h2>
          <button
            onClick={() => {
              trackClick('brokers_cta', '/broker-questionnaire')
              router.push('/broker-questionnaire')
            }}
            className="px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors"
          >
            {t('brokers_cta_button')}
          </button>
        </div>
      </div>
    </Container>
  )
}
