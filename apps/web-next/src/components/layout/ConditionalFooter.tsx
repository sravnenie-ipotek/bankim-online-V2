'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Footer from './Footer/Footer'

/**
 * Renders the standard Footer except on service/calculator routes
 * where the footer is hidden to match the legacy layout behaviour.
 */
const HIDDEN_SEGMENTS = ['services'] as const

function isFooterHidden(pathname: string): boolean {
  const segments = pathname.split('/')
  return HIDDEN_SEGMENTS.some((seg) => segments.includes(seg))
}

const ConditionalFooter: React.FC = () => {
  const pathname = usePathname()

  if (isFooterHidden(pathname)) {
    return null
  }

  return <Footer />
}

export default ConditionalFooter
