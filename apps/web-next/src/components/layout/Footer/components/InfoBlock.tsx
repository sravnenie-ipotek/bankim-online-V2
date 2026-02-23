'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import LogoBox from '@/components/ui/LogoBox/LogoBox';

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/bankimonline',
    icon: '/static/instagram.svg',
    label: 'Instagram',
    tooltipKey: 'footer_social_tooltip_instagram',
  },
  {
    href: 'https://www.youtube.com/@bankimonline',
    icon: '/static/youtube.svg',
    label: 'YouTube',
    tooltipKey: 'footer_social_tooltip_youtube',
  },
  {
    href: 'https://www.facebook.com/bankimonline',
    icon: '/static/facebook.svg',
    label: 'Facebook',
    tooltipKey: 'footer_social_tooltip_facebook',
  },
  {
    href: 'https://t.me/bankimonline',
    icon: '/static/telegram.svg',
    label: 'Telegram',
    tooltipKey: 'footer_social_tooltip_telegram',
  },
  {
    href: 'https://twitter.com/bankimonline',
    icon: '/static/twitter.svg',
    label: 'Twitter',
    tooltipKey: 'footer_social_tooltip_twitter',
  },
  {
    href: 'https://wa.me/972537162235',
    icon: '/static/iconwhatsapp.svg',
    label: 'WhatsApp',
    tooltipKey: 'footer_social_tooltip_whatsapp',
  },
] as const;

const InfoBlock: React.FC = () => {
  const { getContent } = useContentApi('global_components');

  return (
    <div className="flex flex-col gap-4 pr-[3.49719rem] pb-[2.5625rem] ms-0 max-[767px]:items-center md:flex-col md:justify-center md:items-start md:gap-8 md:p-0 md:pr-0 md:pb-0 rtl:items-end rtl:md:items-end">
      <div className="max-[767px]:w-full max-[767px]:flex max-[767px]:justify-center max-[767px]:items-center rtl:w-full rtl:flex rtl:min-[768px]:justify-start">
        <LogoBox
          src="/static/primary-logo05-1.svg"
          alt="BankIM"
          href="/"
          className="xs:!w-[95.13px] xs:!h-[43px] min-[768px]:!w-[91px] min-[768px]:!h-[42px]"
        />
      </div>
      <div className="flex gap-4 flex-wrap rtl:flex-row-reverse rtl:min-[768px]:justify-end rtl:w-full overflow-visible max-[767px]:w-[205.04px] max-[767px]:mx-auto max-[767px]:justify-center">
        {SOCIAL_LINKS.map((link) => (
          <div key={link.label} className="relative group overflow-visible">
            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-xs font-normal whitespace-nowrap rounded bg-[#333535] text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 pointer-events-none z-[10002]"
              role="tooltip"
            >
              {getContent(link.tooltipKey)}
            </span>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity inline-flex"
            >
              <img alt={link.label} src={link.icon} width={24} height={24} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBlock;
