'use client';

import React from 'react';
import type { ContactTitleProps } from './interfaces/ContactTitleProps';

/** 20px at 1440px → 24px at 1920px, clamped; semi-bold; LTR left / RTL right */
const TITLE_CLASS =
  'text-[clamp(16px,1.389vw,24px)] font-semibold text-textTheme-primary text-left rtl:text-right';

const ContactTitle: React.FC<ContactTitleProps> = ({ text }) => (
  <h2 className={TITLE_CLASS}>{text}</h2>
);

export default ContactTitle;
