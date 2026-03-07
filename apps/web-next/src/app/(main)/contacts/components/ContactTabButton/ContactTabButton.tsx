'use client';

import React from 'react';
import Image from 'next/image';
import type { ContactTabButtonProps } from './interfaces/ContactTabButtonProps';

/** Icon column: fixed width matching icon size, keeps icon from pushing text */
const ICON_COL_CLASS =
  'flex items-center justify-center shrink-0 w-[clamp(20px,2.222vw,42px)]';

/** Icon size: 32×32 at 1440px → 42×42 at 1920px, clamped */
const ICON_SIZE_CLASS = 'w-[clamp(20px,2.222vw,42px)] h-[clamp(20px,2.222vw,42px)]';

/** Button size: full width of wrapper, 88px tall at 1440px → 117px at 1920px */
const BUTTON_SIZE_CLASS = 'w-full h-[clamp(56px,6.11vw,117px)]';

/** Text column: takes remaining space, text clamped and wraps */
const TEXT_COL_CLASS =
  'flex-1 min-w-0 flex items-center justify-center text-[clamp(14px,1.25vw,24px)] font-semibold break-words text-center leading-tight';

const ContactTabButton: React.FC<ContactTabButtonProps> = ({
  icon,
  text,
  direction,
  isActive,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      dir={direction}
      className={`tab-btn w-full h-[clamp(56px,6.11vw,117px)] flex flex-row items-center px-[clamp(8px,1.11vw,16px)] gap-[clamp(6px,0.833vw,12px)] ${BUTTON_SIZE_CLASS} ${
        isActive ? 'bg-base-base800 text-textTheme-primary' : 'tab-btn-inactive'
      }`}
    >
      {/* Text column: grows to fill available space */}
      <span className={TEXT_COL_CLASS}>{text}</span>

      {/* Icon column: fixed width, always on the end (left RTL / right LTR) */}
      {icon && (
        <span className={ICON_COL_CLASS}>
          <Image
            src={icon}
            alt=""
            width={42}
            height={42}
            className={ICON_SIZE_CLASS}
            aria-hidden
          />
        </span>
      )}
    </button>
  );
};

export default ContactTabButton;
