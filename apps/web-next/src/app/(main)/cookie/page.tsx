'use client'

import { useTranslation } from 'react-i18next'
import TextPage from '@/components/ui/TextPage/TextPage'

export default function Cookie() {
  const { t } = useTranslation()

  return <TextPage title={t('cookie_title')} text={t('cookie_text')} />
}
