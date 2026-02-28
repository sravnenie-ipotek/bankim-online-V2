'use client';

import React from 'react';
import Link from 'next/link';
import { DesktopMenuItemProps } from './interfaces/DesktopMenuItemProps';
import { DESKTOP_MENU_ITEM_BASE_CLASS, DESKTOP_MENU_LINK_CLASS } from './style/menuItemClasses';

const DesktopMenuItem: React.FC<DesktopMenuItemProps> = ({
  title,
  path,
  onLinkClick,
  openInNewWindowOnDesktop = false,
}) => {
  const href = path || '/';

  if (openInNewWindowOnDesktop) {
    return (
      <li className={DESKTOP_MENU_ITEM_BASE_CLASS}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
          className={DESKTOP_MENU_LINK_CLASS}
        >
          {title}
        </a>
      </li>
    );
  }

  return (
    <li className={DESKTOP_MENU_ITEM_BASE_CLASS}>
      <Link href={href} onClick={onLinkClick} className={DESKTOP_MENU_LINK_CLASS}>
        {title}
      </Link>
    </li>
  );
};

export default DesktopMenuItem;
