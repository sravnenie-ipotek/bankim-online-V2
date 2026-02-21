'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useContentApi } from '@hooks/useContentApi'
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar'
import FirstStep from '../components/FirstStep/FirstStep'
import SecondStep from '../components/SecondStep/SecondStep'
import ThirdStep from '../components/ThirdStep/ThirdStep'
import FourthStep from '../components/FourthStep/FourthStep'

const TOTAL_STEPS = 4

export default function CalculateMortgage() {
  const { getContent } = useContentApi('mortgage_calculation')
  const params = useParams()
  const router = useRouter()
  const stepNumber = params.stepNumber as string
  const step = parseInt(stepNumber, 10)

  if (isNaN(step) || step < 1 || step > TOTAL_STEPS) {
    router.replace('/services/calculate-mortgage/1')
    return null
  }

  const progressLabels = [
    getContent('mobile_step_1'),
    getContent('mobile_step_2'),
    getContent('mobile_step_3'),
    getContent('mobile_step_4'),
  ]

  const renderStep = (): React.ReactNode => {
    switch (stepNumber) {
      case '1':
        return <FirstStep />
      case '2':
        return <SecondStep />
      case '3':
        return <ThirdStep />
      case '4':
        return <FourthStep />
      default:
        return null
    }
  }

  return (
    <>
      {stepNumber !== '4' && (
        <ProgressBar progress={stepNumber} data={progressLabels} />
      )}
      {renderStep()}
    </>
  )
}
