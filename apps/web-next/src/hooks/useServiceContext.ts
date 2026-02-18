'use client'

import { usePathname } from 'next/navigation'

export type ServiceType = 'mortgage' | 'credit' | 'refinance-mortgage' | 'refinance-credit'

export const useServiceContext = (): ServiceType | null => {
  const pathname = usePathname()

  if (pathname.includes('/calculate-mortgage')) {
    return 'mortgage'
  }

  if (pathname.includes('/calculate-credit')) {
    return 'credit'
  }

  if (pathname.includes('/refinance-mortgage')) {
    return 'refinance-mortgage'
  }

  if (pathname.includes('/refinance-credit')) {
    return 'refinance-credit'
  }

  return null
}
