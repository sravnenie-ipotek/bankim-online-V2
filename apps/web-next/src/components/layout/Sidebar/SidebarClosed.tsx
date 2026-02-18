'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import DesktopMenuList from './DesktopMenuList'
import SubSidebar from './SubSidebar'
import SocialMedia from './SocialMedia'
import {
  useMenuItems,
  useBusinessMenuItems,
  useSubMenuItems,
  useBusinessSubMenuItems,
} from './useMenuItems'

interface SidebarClosedProps {
  onClick: () => void
  isOpen: boolean
  isSubMenuOpen: boolean
  setSubMenu: (state: boolean) => void
  isBusinessSubMenuOpen: boolean
  setBusinessSubMenu: (state: boolean) => void
  toggleSubMenu: () => void
  toggleBusinessSubMenu: () => void
}

const SidebarClosed: React.FC<SidebarClosedProps> = ({
  onClick,
  isOpen,
  isSubMenuOpen,
  setSubMenu,
  isBusinessSubMenuOpen,
  setBusinessSubMenu,
  toggleSubMenu,
  toggleBusinessSubMenu,
}) => {
  const { t } = useTranslation()
  const menuItems = useMenuItems()
  const businessMenuItems = useBusinessMenuItems()
  const subMenuItems = useSubMenuItems()
  const businessSubMenuItems = useBusinessSubMenuItems()

  const isSubMenusOpen = isSubMenuOpen || isBusinessSubMenuOpen

  const handleClose = () => {
    onClick()
    setSubMenu(false)
    setBusinessSubMenu(false)
  }

  const handleToggleSubMenu = () => {
    toggleSubMenu()
    setBusinessSubMenu(false)
  }

  const handleToggleBusinessSubMenu = () => {
    setSubMenu(false)
    toggleBusinessSubMenu()
  }

  return (
    <div
      className={`w-[550px] h-screen absolute top-0 bg-[#242529] z-[10000] transition-all duration-300 ease-in-out
        ltr:left-[-515px] ltr:max-md:left-[-550px]
        rtl:right-[-515px] rtl:max-md:right-[-550px]
        ${isOpen ? 'ltr:!left-0 rtl:!right-0 shadow-[1.25px_0_1px_rgba(255,255,255,0.1)]' : ''}`}
    >
      {/* Vertical divider: 35px from right (LTR) / left (RTL) */}
      <div className="w-0.5 h-full bg-white absolute ltr:right-[35px] rtl:left-[35px] top-0" aria-hidden />

      {/* Toggle handle (hidden when submenus are open) */}
      {!isSubMenusOpen && (
        <div
          className={`absolute w-[46px] h-[220px] bg-[#242529] top-1/2 -translate-y-1/2 rounded-[5px] flex items-center cursor-pointer transition-all duration-300 ease-in-out sm:max-md:w-[35px] sm:max-md:h-[180px]
            ltr:justify-end rtl:justify-start rtl:scale-x-[-1]
            ${isOpen ? 'translate-x-0 shadow-[1px_0_1px_rgba(255,255,255,0.1)]' : 'ltr:translate-x-[75%] rtl:-translate-x-[75%]'}
            ltr:right-0 rtl:left-0`}
          onClick={handleClose}
        >
          <button
            type="button"
            className="w-[32px] h-[32px] flex items-center justify-center ltr:ml-auto rtl:mr-auto text-white"
          >
            {/* Icon: 24×24 inside 32×32 button — base white */}
            <span
              className={`relative inline-block w-6 h-6 text-white
                before:content-[''] before:absolute before:left-0 before:top-0 before:w-0.5 before:h-full before:bg-white
                after:content-[''] after:absolute after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-white
                ${isOpen ? '[&>span]:rotate-45 before:invisible before:opacity-0 before:rotate-45 after:-rotate-45 after:right-1.5' : ''}`}
            >
              <span className="absolute left-1/2 top-0 w-0.5 h-full bg-white -translate-x-1/2 transition-transform" />
            </span>
          </button>
        </div>
      )}

      {/* Menu content: start top 108px, left 226px */}
      <nav className="ltr:ml-[226px] rtl:mr-[226px]">
        <section className="pt-[108px] flex flex-col justify-center gap-20 w-full sm:max-md:pt-20 sm:max-md:gap-10 max-[480px]:pt-[60px] max-[480px]:gap-[30px]">
          <DesktopMenuList
            title={t('sidebar_company', 'Company')}
            items={menuItems}
            onFirstItemClick={handleToggleSubMenu}
            onLinkClick={handleClose}
          />
          <DesktopMenuList
            title={t('sidebar_business', 'Business')}
            items={businessMenuItems}
            onFirstItemClick={handleToggleBusinessSubMenu}
            onLinkClick={handleClose}
          />
        </section>
      </nav>

      {/* Sub-sidebars */}
      <SubSidebar
        isOpen={isSubMenuOpen}
        isOpenMainMenu={isOpen}
        items={subMenuItems}
        onCloseMainMenu={handleClose}
      />
      <SubSidebar
        isOpen={isBusinessSubMenuOpen}
        isOpenMainMenu={isOpen}
        items={businessSubMenuItems}
        onCloseMainMenu={handleClose}
      />

      {/* Social media icons */}
      <SocialMedia />
    </div>
  )
}

export default SidebarClosed
