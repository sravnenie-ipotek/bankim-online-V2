'use client'

import React from 'react'
import Link from 'next/link'
import { trackClick } from '@/helpers/analytics'
import type { ServiceCardProps } from './interfaces/ServiceCardProps'

const CARD_SIZE_PX = 265
const CARD_RADIUS_PX = 7

const ServiceCard: React.FC<ServiceCardProps> = ({ title, to, icon }) => {
  const handleClick = (): void => {
    trackClick('service_card', to)
  }

  return (
    <Link
      href={to}
      onClick={handleClick}
      className="flex flex-col justify-between items-center bg-base-secondary p-6 transition-all duration-100 ease-in-out hover:bg-base-base800 shrink-0"
      style={{
        width: CARD_SIZE_PX,
        height: CARD_SIZE_PX,
        borderRadius: CARD_RADIUS_PX,
      }}
    >
      <span className="text-[1.5625rem] not-italic font-semibold leading-normal text-textTheme-primary text-center">
        {title}
      </span>
      <span className="rtl:-scale-x-100 flex items-center justify-center flex-1 min-h-0 w-full [&>img]:object-contain [&>img]:max-h-full">
        {icon}
      </span>
    </Link>
  )
}

export default ServiceCard
