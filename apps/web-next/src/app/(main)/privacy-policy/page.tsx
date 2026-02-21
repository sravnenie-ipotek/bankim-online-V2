'use client'

import React from 'react'
import { useContentApi } from '@hooks/useContentApi'
import TextPage from '@/components/ui/TextPage/TextPage'

export default function PrivacyPolicy() {
  const { getContent } = useContentApi('privacy_policy')

  return (
    <TextPage
      title={getContent('app.privacy_policy.title')}
      text={getContent('app.privacy_policy.full_content')}
      htmlContent
    />
  )
}
