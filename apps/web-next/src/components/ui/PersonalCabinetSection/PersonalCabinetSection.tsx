'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

import Container from '@/components/ui/Container/Container'
import type { PersonalCabinetSectionProps } from './interfaces/PersonalCabinetSectionProps'

const PersonalCabinetSection: React.FC<PersonalCabinetSectionProps> = ({
  titleKey,
  descriptionKey,
}) => {
  const { t } = useTranslation()

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8">
        <div className="flex items-center gap-4">
          <Link
            href="/personal-cabinet"
            className="text-accent-primary hover:underline"
          >
            {t('personal_cabinet_title')}
          </Link>
          <span className="text-textTheme-secondary">/</span>
          <span className="text-textTheme-primary">{t(titleKey)}</span>
        </div>

        <h1 className="text-3xl font-medium text-textTheme-primary">
          {t(titleKey)}
        </h1>

        <div className="p-8 bg-base-secondary rounded-lg">
          <p className="text-textTheme-secondary">{t(descriptionKey)}</p>
        </div>
      </div>
    </Container>
  )
}

export default PersonalCabinetSection
