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
  const isRtl = typeof document !== 'undefined' && document.documentElement.getAttribute('dir') === 'rtl'
  const hideTransformClass = isVisible ? 'translate-x-0' : isRtl ? 'translate-x-6' : '-translate-x-6'
  const opacityClass = isVisible ? 'opacity-100' : 'opacity-0'
  const pointerEventsClass = isVisible ? 'pointer-events-auto' : 'pointer-events-none'

  return (
    <nav
      className={`max-w-[430px] w-full h-full min-w-[320px] p-10 border border-base-stroke bg-base-secondary absolute top-0 z-10
        ltr:left-full rtl:right-full
        transition-all duration-300 ease-in-out ${hideTransformClass} ${opacityClass} ${pointerEventsClass}`}
    >
      <ul className="pt-[100px] flex flex-col text-[25px]">
        {items.map((item, index) => (
          <li
            key={item.path || `submenu-${index}`}
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
