'use client'

import React from 'react'
import TextPage from '@/components/ui/TextPage/TextPage'
import { useContentApi } from '@hooks/useContentApi'

export default function Refund() {
  const { getContent } = useContentApi('legal')

  return <TextPage title={getContent('refund_title')} text={getContent('refund_text')} />
}
