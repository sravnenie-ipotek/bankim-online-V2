'use client';

import React from 'react';
import Image from 'next/image';
import type { ContactItemProps } from '../interfaces/ContactItemProps';

const ContactItem: React.FC<ContactItemProps> = ({ icon, href, label, forceLtr }) => (
  <div className="font-normal leading-[140%] text-textTheme-secondary flex gap-2 text-[clamp(0.8125rem,0.85rem+0.2vw,0.875rem)] [&>a]:text-textTheme-secondary [&>a]:no-underline [&>a]:transition-colors [&>a]:duration-200 [&>a:hover]:text-textTheme-primary [&>a:hover]:underline">
    <Image alt="" src={icon} width={20} height={20} className="shrink-0" />
    <a href={href} target="_blank" rel="noreferrer" dir={forceLtr ? 'ltr' : undefined}>
      {label}
    </a>
  </div>
);

export default ContactItem;
