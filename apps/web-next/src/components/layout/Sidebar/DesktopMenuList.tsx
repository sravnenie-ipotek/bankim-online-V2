'use client'

import React from 'react'
import Link from 'next/link'
import { MenuItem } from './types'
import {
  DESKTOP_MENU_LIST_CLASS,
  DESKTOP_MENU_HEADING_CLASS,
  DESKTOP_MENU_EXPANDABLE_ITEM_CLASS,
  DESKTOP_MENU_ITEM_BASE_CLASS,
  DESKTOP_MENU_LINK_CLASS,
} from './style/menuItemClasses'

interface DesktopMenuListProps {
  title: string
  items: MenuItem[]
  onFirstItemClick: () => void
  onLinkClick: () => void
}

const DesktopMenuList: React.FC<DesktopMenuListProps> = ({
  title,
  items,
  onFirstItemClick,
  onLinkClick,
}) => {
  return (
    <ul className={DESKTOP_MENU_LIST_CLASS}>
      <h3 className={DESKTOP_MENU_HEADING_CLASS}>{title}</h3>
      {items.slice(0, 1).map((item) => (
        <li
          key={item.title}
          onClick={onFirstItemClick}
          className={DESKTOP_MENU_EXPANDABLE_ITEM_CLASS}
        >
          {item.title}
        </li>
      ))}
      {items.slice(1).map((item) => (
        <li key={item.title} className={DESKTOP_MENU_ITEM_BASE_CLASS}>
          <Link
            href={item.path || '/'}
            onClick={onLinkClick}
            className={DESKTOP_MENU_LINK_CLASS}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default DesktopMenuList
