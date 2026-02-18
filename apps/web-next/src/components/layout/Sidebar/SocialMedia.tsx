'use client'

import React from 'react'

const SOCIAL_ITEMS = [
  { href: 'https://www.instagram.com/bankimonline', icon: '/static/instagram.svg', label: 'Instagram' },
  { href: 'https://www.youtube.com/@bankimonline', icon: '/static/youtube.svg', label: 'YouTube' },
  { href: 'https://www.facebook.com/bankimonline', icon: '/static/facebook.svg', label: 'Facebook' },
  { href: 'https://twitter.com/bankimonline', icon: '/static/twitter.svg', label: 'Twitter' },
] as const

const SocialMedia: React.FC = () => {
  return (
    <div className="absolute bottom-0 ltr:left-0 rtl:right-0 flex flex-col gap-6 p-4">
      {SOCIAL_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="opacity-50 hover:opacity-100 transition-opacity"
        >
          <img alt={item.label} src={item.icon} width={20} height={20} />
        </a>
      ))}
    </div>
  )
}

export default SocialMedia
