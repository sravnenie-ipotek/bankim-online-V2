'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import Container from '@/components/ui/Container/Container'
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar'
import { useContentApi } from '@hooks/useContentApi'

const TOTAL_STEPS = 2

const BorrowersPersonalData: React.FC = () => {
  const { getContent } = useContentApi('common')
  const params = useParams()
  const router = useRouter()
  const step = parseInt(params.stepNumber as string, 10)

  if (isNaN(step) || step < 1 || step > TOTAL_STEPS) {
    router.replace('/services/borrowers-personal-data/1')
    return null
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      router.push(`/services/borrowers-personal-data/${step + 1}`)
    } else {
      router.push('/personal-cabinet')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      router.push(`/services/borrowers-personal-data/${step - 1}`)
    } else {
      router.back()
    }
  }

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8 max-w-[700px] mx-auto">
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent('borrowers_personal_data_title')}
        </h1>

        <ProgressBar
          progress={String(step)}
          data={[
            getContent('personal_data'),
            getContent('income_data'),
          ]}
        />

        <div className="p-8 bg-base-secondary rounded-lg">
          <h2 className="text-xl font-semibold text-textTheme-primary mb-6">
            {step === 1 ? getContent('personal_data') : getContent('income_data')}
          </h2>
          <div className="flex flex-col gap-4 mb-8">
            <div className="h-12 bg-base-inputs rounded-lg animate-pulse" />
            <div className="h-12 bg-base-inputs rounded-lg animate-pulse" />
            <div className="h-12 bg-base-inputs rounded-lg animate-pulse" />
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={handleBack} className="px-6 py-3 bg-base-secondary text-textTheme-primary rounded-lg font-medium hover:bg-base-base800 transition-colors">
            {getContent('back')}
          </button>
          <button onClick={handleNext} className="px-6 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors">
            {step === TOTAL_STEPS ? getContent('submit') : getContent('next')}
          </button>
        </div>
      </div>
    </Container>
  )
}

export default BorrowersPersonalData
