'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container/Container'
import type { TextPageProps } from './interfaces/TextPageProps'

const TextPage: React.FC<TextPageProps> = ({ title, text, htmlContent = false }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div data-testid="text-page">
      <Container>
        <div className="flex flex-col gap-8 items-start w-full my-8">
          <div className="flex flex-col gap-4">
            <button className="flex items-center gap-2" onClick={handleBack}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: i18n.language === 'he' ? 'rotate(0)' : 'rotate(180deg)',
                }}
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t('back')}
            </button>
            <h1 className="text-5xl not-italic font-medium leading-normal text-textTheme-primary sm:text-[1.9375rem] sm:font-medium">
              {title}
            </h1>
          </div>
          <div className="text-[0.875rem] not-italic font-normal leading-[140%] text-textTheme-primary whitespace-pre-line">
            {htmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: text }} />
            ) : (
              text
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TextPage
