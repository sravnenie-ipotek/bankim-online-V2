'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowResize } from '@/hooks/useWindowResize'
import FooterAccordion from './FooterAccordion'

const CONTACT_ITEMS = [
  { icon: '/static/envelopesimple.svg', href: 'mailto:Bankimonline@mail.com', label: 'Bankimonline@mail.com' },
  { icon: '/static/phone.svg', href: 'https://wa.me/972537162235', label: '+972 53-716-2235' },
  { icon: '/static/iconwhatsapp.svg', href: 'https://wa.me/972537162235', labelKey: 'footer_writeus' },
] as const

const ContactItem: React.FC<{ icon: string; href: string; label: string }> = ({
  icon,
  href,
  label,
}) => (
  <div className="text-[0.875rem] font-normal leading-[140%] text-textTheme-secondary flex gap-2 [&>a]:text-textTheme-secondary [&>a]:no-underline [&>a]:transition-colors [&>a]:duration-200 [&>a:hover]:text-textTheme-primary [&>a:hover]:underline">
    <img alt="" src={icon} />
    <a href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  </div>
)

const Contacts: React.FC = () => {
  const { t } = useTranslation()
  const { width } = useWindowResize()

  const items = CONTACT_ITEMS.map((item) => ({
    ...item,
    label: 'labelKey' in item ? t(item.labelKey) : item.label,
  }))

  if (width > 1024) {
    return (
      <div className="flex flex-col transition-all duration-100 ease-in-out">
        <div className="text-[1rem] font-medium leading-normal text-textTheme-primary mb-6">
          {t('footer_contacts')}
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          {items.map((item) => (
            <ContactItem key={item.icon} icon={item.icon} href={item.href} label={item.label} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <FooterAccordion title={t('footer_contacts')}>
      {items.map((item) => (
        <div key={item.icon} className="flex gap-2 py-2">
          <img alt="" src={item.icon} />
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="text-textTheme-secondary no-underline transition-colors duration-200 hover:text-textTheme-primary hover:underline"
          >
            {item.label}
          </a>
        </div>
      ))}
    </FooterAccordion>
  )
}

export default Contacts
