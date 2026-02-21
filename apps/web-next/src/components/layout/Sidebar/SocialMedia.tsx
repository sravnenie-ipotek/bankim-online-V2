'use client'

import React from 'react'
import { useContentApi } from '@hooks/useContentApi'
import SocialItem from './SocialItem'

const SOCIAL_ITEMS = [
  { href: 'https://www.instagram.com/bankimonline', icon: '/static/instagram.svg', contentKey: 'social_instagram' },
  { href: 'https://www.youtube.com/@bankimonline', icon: '/static/youtube.svg', contentKey: 'social_youtube' },
  { href: 'https://www.facebook.com/bankimonline', icon: '/static/facebook.svg', contentKey: 'social_facebook' },
  { href: 'https://twitter.com/bankimonline', icon: '/static/twitter.svg', contentKey: 'social_twitter' },
] as const

/**
 * Social bar: 23px visual width (each 113×23 item rotated 90°).
 * Stacked vertically. LTR = left of menu, RTL = right of menu (parent controls).
 */
const SocialMedia: React.FC = () => {
  const { getContent } = useContentApi('global_components')

  return (
    <nav
      aria-label={getContent('footer_social_follow')}
      className="flex flex-col items-center w-[30px] h-full pt-[calc(47.1px*(100vw/1440))] xl:pt-[47.1px]"
    >
      {SOCIAL_ITEMS.map((item) => (
        <SocialItem
          key={item.contentKey}
          href={item.href}
          icon={item.icon}
          label={getContent(item.contentKey)}
        />
      ))}
    </nav>
  )
}

export default SocialMedia
