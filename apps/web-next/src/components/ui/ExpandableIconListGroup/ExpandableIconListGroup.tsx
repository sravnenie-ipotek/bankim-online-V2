'use client';

import React from 'react';

import { ExpandableIconList } from '@/components/ui/ExpandableIconList';
import type { ExpandableIconListGroupProps } from './interfaces/ExpandableIconListGroupProps';

const ExpandableIconListGroup: React.FC<ExpandableIconListGroupProps> = ({
  sections,
  direction = 'ltr',
  className = '',
  onSectionPress,
  expandable = true,
  listBackgroundClassName,
  listTitleColorClassName,
  listItemTextColorClassName,
  listBadgeBackgroundClassName,
  listHideBorder,
  listItemIconWrapperSizeClassName,
  listItemIconFilterClassName,
}) => {
  const defaultWidthClass = className?.trim() ? '' : 'w-[clamp(280px,39.653vw,753px)]';
  const mergeClass = (base: string | undefined, extra: string | undefined): string =>
    [base?.trim(), extra?.trim()].filter(Boolean).join(' ');
  return (
    <div
      className={`${defaultWidthClass} flex flex-col gap-[clamp(12px,1.684vw,32px)] ${className ?? ''}`.trim()}
    >
      {sections.slice(0, 3).map((section, index) => (
        <ExpandableIconList
          key={`${section.title}-${index}`}
          title={section.title}
          items={section.items}
          direction={direction}
          defaultExpanded={section.defaultExpanded}
          className={section.className}
          backgroundClassName={listBackgroundClassName}
          badgeBackgroundClassName={listBadgeBackgroundClassName}
          titleClassName={mergeClass(section.titleClassName, listTitleColorClassName)}
          itemTextClassName={mergeClass(section.itemTextClassName, listItemTextColorClassName)}
          onHeaderPress={() => {
            onSectionPress?.(section, index);
          }}
          onBodyPress={() => {
            onSectionPress?.(section, index);
          }}
          expandable={expandable}
          hideBorder={listHideBorder}
          iconWrapperSizeClassName={listItemIconWrapperSizeClassName}
          iconFilterClassName={listItemIconFilterClassName}
        />
      ))}
    </div>
  );
};

export default ExpandableIconListGroup;
