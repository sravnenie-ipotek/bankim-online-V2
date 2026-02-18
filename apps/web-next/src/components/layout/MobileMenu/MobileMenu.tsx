'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useToggle } from '@/hooks/useToggle'
import MobileMenuHeader from './MobileMenuHeader'
import NavigationList from './NavigationList'
import NavigationSubMenu from './NavigationSubMenu'
import MobileLanguageSelector from './MobileLanguageSelector'
import MobileCurrencySelector from './MobileCurrencySelector'
import {
  useMenuItems,
  useBusinessMenuItems,
  useSubMenuItems,
  useBusinessSubMenuItems,
} from '../Sidebar/useMenuItems'

interface MobileMenuProps {
  onClick: () => void
  isOpen: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClick, isOpen }) => {
  const { t } = useTranslation()
  const menuItems = useMenuItems()
  const businessMenuItems = useBusinessMenuItems()
  const subMenuItems = useSubMenuItems()
  const businessSubMenuItems = useBusinessSubMenuItems()

  const { isOn: isSubMenuOpen, toggle: toggleSubMenu, set: setSubMenu } = useToggle(false)
  const {
    isOn: isBusinessSubMenuOpen,
    toggle: toggleBusinessSubMenu,
    set: setBusinessSubMenu,
  } = useToggle(false)

  const handleClose = () => {
    onClick()
    setSubMenu(false)
    setBusinessSubMenu(false)
  }

  return (
    <nav
      className={`fixed top-0 h-full w-[85vw] max-w-[400px] bg-base-primary z-[10002] transition-all duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'ltr:left-0 rtl:right-0' : 'ltr:-left-full rtl:-right-full rtl:left-auto'}
      `}
    >
      <MobileMenuHeader onClose={handleClose} />

      <div className="px-6 py-4">
        {/* Language selector with flags */}
        <MobileLanguageSelector />

        {/* Currency selector */}
        <MobileCurrencySelector />

        <div className="w-full border-t border-[#333535] my-4" />

        <NavigationList
          title={t('sidebar_company', 'Company')}
          items={menuItems}
          toggle={toggleSubMenu}
          onClose={handleClose}
        />
        <NavigationList
          title={t('sidebar_business', 'Business')}
          items={businessMenuItems}
          toggle={toggleBusinessSubMenu}
          onClose={handleClose}
        />
      </div>

      {/* Social links */}
      <div className="px-6 py-4 flex gap-4 border-t border-base-stroke mt-4">
        {['Instagram', 'YouTube', 'Facebook', 'Telegram'].map((name) => (
          <a
            key={name}
            href={`https://www.${name.toLowerCase()}.com/bankimonline`}
            target="_blank"
            rel="noreferrer"
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <img
              alt={name}
              src={`/static/${name.toLowerCase()}.svg`}
              width={24}
              height={24}
            />
          </a>
        ))}
      </div>

      {/* Sub menus */}
      <NavigationSubMenu
        items={subMenuItems}
        isOpen={isSubMenuOpen}
        onClose={() => setSubMenu(false)}
        onCloseMenu={handleClose}
      />
      <NavigationSubMenu
        items={businessSubMenuItems}
        isOpen={isBusinessSubMenuOpen}
        onClose={() => setBusinessSubMenu(false)}
        onCloseMenu={handleClose}
      />
    </nav>
  )
}

export default MobileMenu
