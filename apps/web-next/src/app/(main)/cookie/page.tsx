'use client'

import TextPage from '@/components/ui/TextPage/TextPage'
import { useContentApi } from '@hooks/useContentApi'

export default function Cookie() {
  const { getContent } = useContentApi('legal')

  return <TextPage title={getContent('cookie_title')} text={getContent('cookie_text')} />
}
