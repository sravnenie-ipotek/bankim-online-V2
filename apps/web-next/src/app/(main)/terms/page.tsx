'use client'

import React from 'react'
import TextPage from '@/components/ui/TextPage/TextPage'
import { useContentApi } from '@hooks/useContentApi'

export default function Terms() {
  const { getContent } = useContentApi('legal')

  return <TextPage title={getContent('terms_title')} text={getContent('terms_text')} />
}
