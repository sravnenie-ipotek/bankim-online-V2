'use client'

import React from 'react'
import Link from 'next/link'
import { MenuItem } from './types'

interface SubSidebarProps {
  isOpen: boolean
  isOpenMainMenu: boolean
  items: MenuItem[]
  onCloseMainMenu: () => void
}

const SubSidebar: React.FC<SubSidebarProps> = ({
  isOpen,
  isOpenMainMenu,
  items,
  onCloseMainMenu,
}) => {
  const isVisible = isOpen && isOpenMainMenu

  return (
    <nav
      className={`max-w-[430px] w-full h-full p-10 border border-base-stroke bg-base-secondary absolute top-0 z-[-1] transition-all duration-500 ease-in-out
        ${isVisible
          ? 'ltr:left-[450px] rtl:right-[450px] visible opacity-100'
          : 'ltr:-left-full rtl:left-auto rtl:-right-[200%] invisible opacity-0'
        }`}
    >
      <ul className="pt-[100px] flex flex-col text-[25px]">
        {items.map((item) => (
          <li
            key={item.title}
            className="leading-8 my-1.5 py-1.5 text-white transition-colors duration-300 ease-in-out hover:underline hover:text-accent-primary"
          >
            <Link
              href={item.path || '/'}
              onClick={onCloseMainMenu}
              className="text-inherit no-underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SubSidebar
