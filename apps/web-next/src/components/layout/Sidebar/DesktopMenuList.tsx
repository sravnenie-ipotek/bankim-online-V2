'use client'

import React from 'react'
import type { DesktopMenuListProps } from './interfaces/DesktopMenuListProps'
import DesktopMenuItem from './DesktopMenuItem'
import DesktopMenuExpandableItem from './DesktopMenuExpandableItem'
import {
  DESKTOP_MENU_LIST_CLASS,
  DESKTOP_MENU_HEADING_CLASS,
} from './style/menuItemClasses'

const DesktopMenuList: React.FC<DesktopMenuListProps> = ({
  title,
  items,
  onFirstItemClick,
  onLinkClick,
  isExpanded = false,
}) => {
  const [expandableItem, ...linkItems] = items

  return (
    <ul className={DESKTOP_MENU_LIST_CLASS}>
      <h3 className={DESKTOP_MENU_HEADING_CLASS}>{title}</h3>
      {expandableItem && (
        <DesktopMenuExpandableItem
          title={expandableItem.title}
          onFirstItemClick={onFirstItemClick}
          isExpanded={isExpanded}
        />
      )}
      {linkItems.map((item, index) => (
        <DesktopMenuItem
          key={item.path || `menu-${index}`}
          title={item.title}
          path={item.path || '/'}
          onLinkClick={onLinkClick}
        />
      ))}
    </ul>
  )
}

export default DesktopMenuList
