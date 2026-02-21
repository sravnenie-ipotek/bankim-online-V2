'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container/Container'
import { useContentApi } from '@hooks/useContentApi'

export default function RealEstateBrokerage() {
  const { getContent } = useContentApi('common')
  const router = useRouter()

  return (
    <Container>
      <div className="flex flex-col gap-16 w-full my-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-medium text-textTheme-primary sm:text-[1.9375rem]">
            {getContent('real_estate_brokerage_title')}
          </h1>
          <p className="text-base text-textTheme-secondary max-w-[48rem]">
            {getContent('real_estate_brokerage_subtitle')}
          </p>
        </div>

        <div className="flex flex-col gap-4 p-8 bg-base-secondary rounded-lg">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('franchise_about_title')}
          </h2>
          <p className="text-base text-textTheme-secondary leading-relaxed">
            {getContent('franchise_about_text')}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('franchise_benefits_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['benefit_1', 'benefit_2', 'benefit_3', 'benefit_4'].map((key) => (
              <div key={key} className="flex items-start gap-3 p-4 bg-base-secondary rounded-lg">
                <span className="text-accent-primary text-xl">&#10003;</span>
                <span className="text-textTheme-primary">{getContent(`franchise_${key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 p-8 bg-base-secondary rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('franchise_cta_title')}
          </h2>
          <button
            onClick={() => router.push('/broker-questionnaire')}
            className="px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors"
          >
            {getContent('franchise_cta_button')}
          </button>
        </div>
      </div>
    </Container>
  )
}
