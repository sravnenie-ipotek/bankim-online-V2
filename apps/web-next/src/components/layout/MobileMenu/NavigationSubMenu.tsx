'use client'

import React from 'react'
import Link from 'next/link'
import { MenuItem } from '../Sidebar/types'

interface NavigationSubMenuProps {
  items: MenuItem[]
  isOpen: boolean
  onClose: () => void
  onCloseMenu?: () => void
}

const NavigationSubMenu: React.FC<NavigationSubMenuProps> = ({
  items,
  isOpen,
  onClose,
  onCloseMenu,
}) => {
  const handleLinkClick = () => {
    onClose()
    onCloseMenu?.()
  }

  return (
    <nav
      className={`fixed top-0 h-full w-full bg-base-primary z-[10003] transition-all duration-300 ease-in-out
        ${isOpen ? 'ltr:left-0 rtl:right-0' : 'ltr:-left-full rtl:-right-full rtl:left-auto'}
      `}
    >
      <div className="p-6 pt-20 px-5 min-[768px]:ps-[35px] min-[768px]:pe-6 md:ps-[46px] md:pe-6 text-left rtl:text-right">
        <button
          type="button"
          onClick={onClose}
          className="mb-6 text-accent-primary bg-transparent border-none cursor-pointer text-[16px] flex items-center gap-2 rtl:flex-row-reverse"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="rtl:rotate-180">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          Back
        </button>
        <ul className="flex flex-col gap-4 list-none p-0 m-0 items-start rtl:items-end">
          {items.map((item) => (
            <li
              key={item.title}
              className="text-[18px] text-white hover:text-accent-primary transition-colors text-left rtl:text-right w-full"
            >
              <Link
                href={item.path || '/'}
                onClick={handleLinkClick}
                className="text-inherit no-underline block py-2 w-full"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default NavigationSubMenu
