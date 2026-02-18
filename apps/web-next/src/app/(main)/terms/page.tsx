'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import TextPage from '@/components/ui/TextPage/TextPage'

export default function Terms() {
  const { t } = useTranslation()

  return <TextPage title={t('terms_title')} text={t('terms_text')} />
}
