'use client'

import React from 'react'
import Image from 'next/image'
import { useWindowResize } from '@/hooks/useWindowResize'
import { useContentApi } from '@hooks/useContentApi'
import FooterAccordion from './FooterAccordion'
import ContactItem from './components/ContactItem'

const CONTACT_ITEMS = [
  { icon: '/static/envelopesimple.svg', href: 'mailto:Bankimonline@mail.com', label: 'Bankimonline@mail.com' },
  { icon: '/static/phone.svg', href: 'https://wa.me/972537162235', label: '+972 53-716-2235', forceLtr: true },
  { icon: '/static/iconwhatsapp.svg', href: 'https://wa.me/972537162235', labelKey: 'footer_writeus' },
] as const

const Contacts: React.FC = () => {
  const { getContent } = useContentApi('global_components')
  const { width } = useWindowResize()

  const items = CONTACT_ITEMS.map((item) => ({
    ...item,
    label: 'labelKey' in item ? getContent(item.labelKey) : item.label,
  }))

  if (width > 1024) {
    return (
      <div className="flex flex-col transition-all duration-100 ease-in-out">
        <div className="font-medium leading-normal text-textTheme-primary mb-6 text-[clamp(0.9rem,0.9rem+0.2vw,1rem)]">
          {getContent('footer_contacts')}
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          {items.map((item) => (
            <ContactItem
              key={item.icon}
              icon={item.icon}
              href={item.href}
              label={item.label}
              forceLtr={'forceLtr' in item ? item.forceLtr : undefined}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <FooterAccordion title={getContent('footer_contacts')}>
      {items.map((item) => (
        <div key={item.icon} className="flex gap-2 py-2">
          <Image alt="" src={item.icon} width={20} height={20} className="shrink-0" />
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            dir={'forceLtr' in item && item.forceLtr ? 'ltr' : undefined}
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
