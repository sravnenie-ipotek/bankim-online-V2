'use client'

import React from 'react'
import Link from 'next/link'
import { MenuItem } from '../Sidebar/types'
import {
  MOBILE_MENU_ITEM_CLASS,
  MOBILE_MENU_LINK_CLASS,
} from '../Sidebar/style/menuItemClasses'

interface NavigationListProps {
  items: MenuItem[]
  title: string
  toggle: () => void
  onClose?: () => void
}

const NavigationList: React.FC<NavigationListProps> = ({
  items,
  title,
  toggle,
  onClose,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-accent-primary text-[16px] mb-3 text-left rtl:text-right">
        {title}
      </h3>
      <ul className="flex flex-col gap-3 list-none p-0 m-0 text-left rtl:text-right items-start rtl:items-end">
        {items.slice(0, 1).map((item) => (
          <li
            key={item.title}
            onClick={toggle}
            className={MOBILE_MENU_ITEM_CLASS}
          >
            {item.title}
          </li>
        ))}
        {items.slice(1).map((item) => (
          <li key={item.title} className={MOBILE_MENU_ITEM_CLASS}>
            <Link
              href={item.path || '/'}
              onClick={onClose}
              className={MOBILE_MENU_LINK_CLASS}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavigationList
