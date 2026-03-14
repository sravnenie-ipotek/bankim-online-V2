'use client';

import React from 'react';
import Image from 'next/image';

import useDisclosure from '@/hooks/useDisclosure';
import type { ExpandableIconListProps } from './interfaces/ExpandableIconListProps';
import { ExpandableIconListKeyboardHelper } from './helpers/ExpandableIconListKeyboardHelper';

const DEFAULT_TITLE_CLASS = 'text-[clamp(22px,2.708vw,52px)]';
const DEFAULT_ITEM_TEXT_CLASS = 'text-[clamp(16px,1.667vw,32px)]';

const ExpandableIconList: React.FC<ExpandableIconListProps> = ({
  title,
  items,
  direction = 'ltr',
  defaultExpanded = true,
  className = '',
  titleClassName,
  itemTextClassName,
  onHeaderPress,
  onBodyPress,
  expandable = true,
  backgroundClassName,
  badgeBackgroundClassName,
  iconWrapperSizeClassName,
  iconFilterClassName,
  hideBorder = false,
}) => {
  const titleClass = titleClassName?.trim() || DEFAULT_TITLE_CLASS;
  const itemClass = itemTextClassName?.trim() || DEFAULT_ITEM_TEXT_CLASS;
  const titleColorClass = /text-/.test(titleClass) ? '' : 'text-white';
  const itemColorClass = /text-/.test(itemClass) ? '' : 'text-white';
  const badgeBgClass = badgeBackgroundClassName?.trim() || 'bg-white/10';
  const iconFilterClass = iconFilterClassName?.trim() || '';
  const iconWrapperSizeClass =
    iconWrapperSizeClassName?.trim() || 'w-[clamp(40px,3.333vw,64px)] h-[clamp(40px,3.333vw,64px)]';
  const [opened, { toggle }] = useDisclosure(defaultExpanded);
  const isOpen = expandable ? opened : true;
  const cardHeightClass = isOpen
    ? 'min-h-[clamp(220px,18.474vw,351px)]'
    : 'h-[clamp(72px,5.789vw,110px)] overflow-hidden';
  const bodyStateClass = isOpen
    ? 'max-h-[640px] opacity-100 pt-[clamp(14px,1.667vw,24px)] pb-[clamp(4px,0.556vw,8px)] pointer-events-auto'
    : 'max-h-0 opacity-0 py-0 pointer-events-none';
  const handleHeaderPress = (): void => {
    onHeaderPress?.();
    if (expandable) toggle();
  };
  const bgClass = backgroundClassName?.trim() || 'bg-base-sidebarBg';
  const borderClass = hideBorder ? '' : 'border border-[#474B5A]';

  return (
    <section
      dir={direction}
      className={`w-full ${cardHeightClass} rounded-[clamp(10px,1.111vw,16px)] ${borderClass} ${bgClass} px-[clamp(16px,2.222vw,32px)] ${className}`.trim()}
      aria-label={title}
    >
      <div
        role={expandable ? 'button' : undefined}
        tabIndex={expandable ? 0 : undefined}
        onClick={expandable ? handleHeaderPress : undefined}
        onKeyDown={
          expandable
            ? (event) => {
                if (ExpandableIconListKeyboardHelper.shouldToggle(event.key)) {
                  event.preventDefault();
                  handleHeaderPress();
                }
              }
            : undefined
        }
        aria-expanded={expandable ? opened : undefined}
        className={`w-full flex items-start justify-between gap-4 py-[clamp(18px,2.222vw,32px)] ${expandable ? 'cursor-pointer' : ''}`}
      >
        <span className={`text-start ${titleColorClass} font-semibold leading-tight whitespace-pre-line ${titleClass}`}>
          {typeof title === 'string' ? title.replace(/\\n/g, '\n') : title}
        </span>
        {expandable && (
          <span
            className={`mt-[clamp(2px,0.278vw,4px)] text-white transition-transform duration-200 ${opened ? 'rotate-180' : ''}`}
            aria-hidden
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 14L12 8L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${bodyStateClass}`}
        role={onBodyPress != null ? 'button' : undefined}
        tabIndex={onBodyPress != null && opened ? 0 : -1}
        onClick={onBodyPress}
        onKeyDown={
          onBodyPress != null
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onBodyPress();
                }
              }
            : undefined
        }
      >
        <div className="flex flex-col gap-[clamp(12px,1.667vw,24px)]">
          {items.map((item, index) => (
            <div key={`${item.iconSrc}-${index}`} className="flex items-center gap-[clamp(12px,1.667vw,24px)]">
              <div className={`${iconWrapperSizeClass} rounded-full ${badgeBgClass} flex items-center justify-center shrink-0`}>
                <Image
                  src={item.iconSrc}
                  alt={item.iconAlt ?? ''}
                  width={24}
                  height={24}
                  className={`w-[clamp(16px,1.67vw,24px)] h-[clamp(16px,1.67vw,24px)] object-contain ${iconFilterClass}`.trim()}
                />
              </div>
              <p className={`${itemColorClass} text-start leading-[1.3] ${itemClass}`}>
                {item.translation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpandableIconList;
