'use client'

import React from 'react'
import LogoBox from '@/components/ui/LogoBox/LogoBox'

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/bankimonline', icon: '/static/instagram.svg', label: 'Instagram' },
  { href: 'https://www.youtube.com/@bankimonline', icon: '/static/youtube.svg', label: 'YouTube' },
  { href: 'https://www.facebook.com/bankimonline', icon: '/static/facebook.svg', label: 'Facebook' },
  { href: 'https://t.me/bankimonline', icon: '/static/telegram.svg', label: 'Telegram' },
  { href: 'https://twitter.com/bankimonline', icon: '/static/twitter.svg', label: 'Twitter' },
  { href: 'https://wa.me/972537162235', icon: '/static/iconwhatsapp.svg', label: 'WhatsApp' },
] as const

const InfoBlock: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 pr-[3.49719rem] pb-[2.5625rem] ml-[0.8rem] md:flex-col md:justify-center md:items-center md:gap-8 md:p-0">
      <LogoBox src="/static/primary-logo05-1.svg" alt="BankIM" href="/" />
      <div className="flex gap-4 flex-wrap">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <img alt={link.label} src={link.icon} width={24} height={24} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default InfoBlock
