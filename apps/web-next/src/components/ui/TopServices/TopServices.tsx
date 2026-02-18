'use client'

import React from 'react'
import { useContentApi } from '@hooks/useContentApi'
import ServiceCard from './ServiceCard'

const ServiceCardIcon: React.FC<{ src: string }> = ({ src }) => (
  <img src={src} alt="" className="w-full h-full object-contain" />
)

const TopServices: React.FC = () => {
  const { getContent } = useContentApi('home_page')

  return (
    <div className="flex gap-[2px] w-full pt-[32px] justify-between flex-wrap max-[1280px]:flex-col max-[1280px]:px-5">
      <ServiceCard
        to="/services/calculate-mortgage/1"
        title={getContent('calculate_mortgage', 'calculate_mortgage')}
        icon={<ServiceCardIcon src="/static/calculate-mortgage-icon.png" />}
      />
      <ServiceCard
        to="/services/refinance-mortgage/1"
        title={getContent('refinance_mortgage', 'mortgage_refinance')}
        icon={<ServiceCardIcon src="/static/refinance-mortgage-icon.png" />}
      />
      <ServiceCard
        to="/services/calculate-credit/1"
        title={getContent('calculate_credit', 'calculate_credit')}
        icon={<ServiceCardIcon src="/static/calculate-credit-icon.png" />}
      />
      <ServiceCard
        to="/services/refinance-credit/1"
        title={getContent('refinance_credit', 'credit_refinance')}
        icon={<ServiceCardIcon src="/static/refinance-credit-icon.png" />}
      />
    </div>
  )
}

export default TopServices
