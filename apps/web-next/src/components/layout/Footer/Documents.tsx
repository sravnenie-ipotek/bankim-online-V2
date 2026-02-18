'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useWindowResize } from '@/hooks/useWindowResize'
import FooterAccordion from './FooterAccordion'

const DOCUMENT_LINKS = [
  { key: 'footer_tenders_brokers', href: '/tenders-for-brokers' },
  { key: 'footer_tenders_lawyers', href: '/tenders-for-lawyers' },
  { key: 'footer_legal_1', href: '/terms' },
  { key: 'footer_legal_2', href: '/privacy-policy' },
  { key: 'footer_legal_3', href: '/cookie' },
  { key: 'footer_legal_4', href: '/refund' },
] as const

const Documents: React.FC = () => {
  const { t } = useTranslation()
  const { width } = useWindowResize()

  if (width > 1024) {
    return (
      <div className="flex flex-col">
        <div className="text-[1rem] font-medium leading-normal text-textTheme-primary mb-6 text-left">
          {t('footer_legal')}
        </div>
        <div className="text-[0.875rem] font-normal leading-[140%] text-textTheme-secondary gap-[0.8rem] flex flex-col [&>a]:cursor-pointer [&>a]:text-textTheme-secondary [&>a]:no-underline [&>a]:transition-colors [&>a]:duration-200 [&>a:hover]:underline [&>a:hover]:text-textTheme-primary">
          {DOCUMENT_LINKS.map((link) => (
            <Link key={link.key} href={link.href} className="cursor-pointer hover:underline">
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <FooterAccordion title={t('footer_legal')}>
      {DOCUMENT_LINKS.map((link) => (
        <Link key={link.key} href={link.href}>
          {t(link.key)}
        </Link>
      ))}
    </FooterAccordion>
  )
}

export default Documents
