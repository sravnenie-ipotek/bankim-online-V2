'use client';

import React from 'react';
import Image from 'next/image';
import { useWindowResize } from '@/hooks/useWindowResize';
import { useContentApi } from '@hooks/useContentApi';
import { useSocialLink } from '@/hooks/useSocialLink';
import FooterAccordion from './FooterAccordion';
import ContactItem from './components/ContactItem';

const CONTACT_ITEMS = [
  {
    icon: '/static/envelopesimple.svg',
    href: 'mailto:Bankimonline@mail.com',
    label: 'Bankimonline@mail.com',
  },
  {
    icon: '/static/phone.svg',
    href: 'tel:+972537162235',
    label: '+972 53-716-2235',
    forceLtr: true,
  },
  {
    icon: '/static/iconwhatsapp.svg',
    href: 'https://wa.me/972537162235',
    labelKey: 'footer_writeus',
    isWhatsApp: true,
  },
] as const;

const Contacts: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const { width } = useWindowResize();
  const whatsappLink = useSocialLink('whatsapp');

  const items = CONTACT_ITEMS.map((item) => ({
    ...item,
    label: 'labelKey' in item ? getContent(item.labelKey) : item.label,
  }));

  const getItemHref = (item: (typeof items)[number]): string =>
    'isWhatsApp' in item && item.isWhatsApp ? whatsappLink.href : item.href;
  const getItemOnClick = (item: (typeof items)[number]) =>
    'isWhatsApp' in item && item.isWhatsApp ? whatsappLink.onClick : undefined;

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
              href={getItemHref(item)}
              label={item.label}
              forceLtr={'forceLtr' in item ? item.forceLtr : undefined}
              onClick={getItemOnClick(item)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <FooterAccordion title={getContent('footer_contacts')}>
      {items.map((item) => (
        <div key={item.icon} className="flex gap-2 py-2">
          <Image
            alt=""
            src={item.icon}
            width={20}
            height={20}
            className="shrink-0"
            style={{ width: 'auto', height: 'auto' }}
          />
          <a
            href={getItemHref(item)}
            target={getItemHref(item).startsWith('http') ? '_blank' : undefined}
            rel={getItemHref(item).startsWith('http') ? 'noreferrer' : undefined}
            dir={'forceLtr' in item && item.forceLtr ? 'ltr' : undefined}
            className="text-textTheme-secondary no-underline transition-colors duration-200 hover:text-textTheme-primary hover:underline"
            onClick={getItemOnClick(item)}
          >
            {item.label}
          </a>
        </div>
      ))}
    </FooterAccordion>
  );
};

export default Contacts;
