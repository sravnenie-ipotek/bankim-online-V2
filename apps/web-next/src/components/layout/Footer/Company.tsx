'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useWindowResize } from '@/hooks/useWindowResize'
import FooterAccordion from './FooterAccordion'

const COMPANY_LINKS = [
  { key: 'footer_contacts', href: '/contacts' },
  { key: 'footer_about', href: '/about' },
  { key: 'footer_vacancy', href: '/vacancies' },
  { key: 'footer_partner', href: '/cooperation' },
] as const

const Company: React.FC = () => {
  const { t } = useTranslation()
  const { width } = useWindowResize()

  if (width > 1024) {
    return (
      <div className="flex flex-col">
        <div className="text-[1rem] font-medium leading-normal text-textTheme-primary mb-6">
          {t('footer_company')}
        </div>
        <div className="flex flex-col gap-[0.8rem] text-[0.875rem] font-normal leading-[140%] text-textTheme-secondary cursor-pointer [&>a]:cursor-pointer [&>a]:text-textTheme-secondary [&>a]:no-underline [&>a]:transition-colors [&>a]:duration-200 [&>a:hover]:underline [&>a:hover]:text-textTheme-primary">
          {COMPANY_LINKS.map((link) => (
            <Link key={link.key} href={link.href} className="hover:underline">
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <FooterAccordion title={t('footer_company')}>
      {COMPANY_LINKS.map((link) => (
        <Link key={link.key} href={link.href}>
          {t(link.key)}
        </Link>
      ))}
    </FooterAccordion>
  )
}

export default Company
