'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import Container from '@/components/ui/Container/Container'
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar'
import { useContentApi } from '@hooks/useContentApi'

const TOTAL_STEPS = 4

export default function RefinanceMortgage() {
  const { getContent } = useContentApi('common')
  const params = useParams()
  const router = useRouter()
  const step = parseInt(params.stepNumber as string, 10)

  if (isNaN(step) || step < 1 || step > TOTAL_STEPS) {
    router.replace('/services/refinance-mortgage/1')
    return null
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      router.push(`/services/refinance-mortgage/${step + 1}`)
    } else {
      router.push('/services/application-submitted')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      router.push(`/services/refinance-mortgage/${step - 1}`)
    } else {
      router.push('/services')
    }
  }

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8 max-w-[700px] mx-auto">
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent('refinance_mortgage')}
        </h1>

        <ProgressBar
          progress={String(step)}
          data={[
            getContent('mortgage_refinance_step_1'),
            getContent('mortgage_refinance_step_2'),
            getContent('mortgage_refinance_step_3'),
            getContent('mortgage_refinance_step_4'),
          ]}
        />

        <div className="p-8 bg-base-secondary rounded-lg">
          <h2 className="text-xl font-semibold text-textTheme-primary mb-6">
            {getContent(`mortgage_refinance_step_${step}`)}
          </h2>

          <div className="flex flex-col gap-4 mb-8">
            {step === 1 && (
              <>
                <label className="text-sm text-textTheme-secondary">{getContent('mortgage_refinance_price')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
                <label className="text-sm text-textTheme-secondary">{getContent('mortgage_refinance_bank')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
                <label className="text-sm text-textTheme-secondary">{getContent('mortgage_refinance_type')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
                <label className="text-sm text-textTheme-secondary">{getContent('mortgage_refinance_registered')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
                <label className="text-sm text-textTheme-secondary">{getContent('mortgage_refinance_why')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
              </>
            )}
            {step === 2 && (
              <>
                <label className="text-sm text-textTheme-secondary">{getContent('refinance_step2_name_surname')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
                <label className="text-sm text-textTheme-secondary">{getContent('calculate_mortgage_birth_date')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
                <label className="text-sm text-textTheme-secondary">{getContent('refinance_step2_education')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
              </>
            )}
            {step === 3 && (
              <>
                <label className="text-sm text-textTheme-secondary">{getContent('calculate_mortgage_main_source')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
                <label className="text-sm text-textTheme-secondary">{getContent('calculate_mortgage_monthly_income')}</label>
                <div className="h-12 bg-base-inputs rounded-lg" />
              </>
            )}
            {step === 4 && (
              <>
                <p className="text-textTheme-secondary">{getContent('refinance_mortgage_warning')}</p>
                <div className="h-12 bg-base-inputs rounded-lg" />
                <div className="h-12 bg-base-inputs rounded-lg" />
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={handleBack} className="px-6 py-3 bg-base-secondary text-textTheme-primary rounded-lg font-medium hover:bg-base-base800 transition-colors">
            {getContent('back')}
          </button>
          <button onClick={handleNext} className="px-6 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors">
            {step === TOTAL_STEPS ? getContent('common_button_submit') : getContent('button_next')}
          </button>
        </div>
      </div>
    </Container>
  )
}
