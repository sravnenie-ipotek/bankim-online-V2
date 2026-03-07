'use client';

import React from 'react';
import { useSocialLink } from '@/hooks/useSocialLink';
import { PhoneFormatHelper } from '@/helpers/PhoneFormatHelper';
import type { ContactSocialProps } from './interfaces/ContactSocialProps';

const LOCATION_ICON = '/static/tags/location-icon.svg';
const PHONE_ICON = '/static/phone.svg';
const EMAIL_ICON = '/static/envelopesimple.svg';
const WHATSAPP_ICON = '/static/iconwhatsapp.svg';

/** 24×24 at 1440px (1.667vw); color #FBE54D via Tailwind accent.fileBadge */
const ICON_BASE_CLASS =
  'w-[clamp(18px,1.667vw,24px)] h-[clamp(18px,1.667vw,24px)] shrink-0 bg-accent-fileBadge [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]';

/** 16px at 1440px (1.111vw) */
const TEXT_SIZE_CLASS = 'text-[clamp(14px,1.111vw,16px)]';

const ContactSocialIcon: React.FC<{ iconUrl: string }> = ({ iconUrl }) => (
  <span
    className={ICON_BASE_CLASS}
    style={{
      maskImage: `url(${iconUrl})`,
      WebkitMaskImage: `url(${iconUrl})`,
    }}
    aria-hidden
  />
);

const ContactSocial: React.FC<ContactSocialProps> = ({
  getContent,
  addressKey,
  phoneKey,
  emailKey,
  address,
  phone,
  email,
  whatsapp,
  direction = 'column',
  variant = 'default',
}) => {
  const addressValue =
    (address ?? (getContent != null && addressKey != null ? getContent(addressKey) : '')).trim() || '';
  const phoneNumber =
    (phone ?? (getContent != null && phoneKey != null ? getContent(phoneKey) : '')).trim() || '';
  const emailAddress =
    (email ?? (getContent != null && emailKey != null ? getContent(emailKey) : '')).trim() || '';
  const whatsappValue = (whatsapp ?? '').trim() || '';
  const whatsappLink = useSocialLink('whatsapp');

  const layoutClass =
    direction === 'row'
      ? 'flex flex-row flex-nowrap items-center gap-4'
      : 'flex flex-col gap-4 w-full';
  const rowClass = 'flex items-center gap-3 shrink-0';
  const textClass =
    variant === 'card'
      ? `text-textTheme-primary ${TEXT_SIZE_CLASS}`
      : `text-textTheme-primary ${TEXT_SIZE_CLASS} whitespace-nowrap`;

  return (
    <div className={layoutClass}>
      {addressValue && (
        <div className={rowClass}>
          <ContactSocialIcon iconUrl={LOCATION_ICON} />
          <span className={textClass}>
            {addressValue}
          </span>
        </div>
      )}
      {phoneNumber && (
        <div className={rowClass}>
          <ContactSocialIcon iconUrl={PHONE_ICON} />
          <a
            dir="ltr"
            href={`tel:+${PhoneFormatHelper.toTelDigits(phoneNumber)}`}
            className={`text-textTheme-primary hover:underline ${TEXT_SIZE_CLASS}`}
          >
            {phoneNumber}
          </a>
        </div>
      )}
      {emailAddress && (
        <div className={rowClass}>
          <ContactSocialIcon iconUrl={EMAIL_ICON} />
          <a
            dir="ltr"
            href={`mailto:${emailAddress}`}
            className={`text-textTheme-primary hover:underline ${TEXT_SIZE_CLASS} ${variant === 'card' ? '' : 'break-all'}`}
          >
            {emailAddress}
          </a>
        </div>
      )}
      {whatsappValue && (
        <div className={rowClass}>
          <ContactSocialIcon iconUrl={WHATSAPP_ICON} />
          <a
            href={whatsappLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${textClass} hover:underline`}
            onClick={whatsappLink.onClick}
          >
            {whatsappValue}
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactSocial;
