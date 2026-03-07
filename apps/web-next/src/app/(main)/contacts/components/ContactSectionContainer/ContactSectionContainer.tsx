'use client';

import React from 'react';
import type { ContactSectionContainerProps } from './interfaces/ContactSectionContainerProps';

/** 1130×297 at 1440px → 1507×396 at 1920px; gap 24px at 1440 → 32px at 1920 */
const CONTAINER_CLASS =
  'w-full max-w-[clamp(280px,78.47vw,1507px)] min-h-[clamp(200px,20.625vw,396px)] flex flex-col gap-[clamp(14px,1.667vw,32px)] box-border';

const ContactSectionContainer: React.FC<ContactSectionContainerProps> = ({
  children,
}) => <div className={CONTAINER_CLASS}>{children}</div>;

export default ContactSectionContainer;
