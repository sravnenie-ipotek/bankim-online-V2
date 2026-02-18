'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import TextPage from '@/components/ui/TextPage/TextPage'

export default function Refund() {
  const { t } = useTranslation()

  return <TextPage title={t('refund_title')} text={t('refund_text')} />
}
