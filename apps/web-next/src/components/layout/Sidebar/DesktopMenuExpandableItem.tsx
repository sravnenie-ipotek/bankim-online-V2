'use client';

import React from 'react';
import { DesktopMenuExpandableItemProps } from './interfaces/DesktopMenuExpandableItemProps';
import { DESKTOP_MENU_EXPANDABLE_ITEM_CLASS } from './style/menuItemClasses';

const DesktopMenuExpandableItem: React.FC<DesktopMenuExpandableItemProps> = ({
  title,
  onFirstItemClick,
  isExpanded = false,
}) => {
  return (
    <li
      onClick={onFirstItemClick}
      onKeyDown={(e) => e.key === 'Enter' && onFirstItemClick()}
      role="button"
      tabIndex={0}
      className={`${DESKTOP_MENU_EXPANDABLE_ITEM_CLASS} group rounded hover:no-underline !flex-row justify-between
        ${isExpanded ? 'bg-white/15 text-white' : ''} hover:bg-white/10`}
    >
      <span className="flex-1 min-w-0 decoration-accent-primary group-hover:underline">
        {title}
      </span>
      <span
        className={`text-accent-primary shrink-0 self-start mt-[10px] ms-2 inline-block transition-transform duration-200
          ${isExpanded ? 'ltr:rotate-[-90deg] rtl:rotate-90' : ''}`}
        aria-hidden="true"
      >
        &gt;
      </span>
    </li>
  );
};

export default DesktopMenuExpandableItem;
