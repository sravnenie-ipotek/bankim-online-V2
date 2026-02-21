'use client'

import React from 'react'
import LoginLanguage from './LoginLanguage'
import Logo from './Logo'
import BurgerMenu from '@/components/ui/BurgerMenu/BurgerMenu'
import type { HeaderProps } from './interfaces/HeaderProps'

const Header: React.FC<HeaderProps> = ({
  showBurger = false,
  onBurgerClick,
  isMobileMenuOpen = false,
}) => {
  return (
    <div className="w-full h-[94px] flex items-center">
      <div className="flex justify-between items-center w-full gap-4">
        <div className="max-[767px]:order-1">
          <Logo />
        </div>
        <div className="flex items-center gap-4 shrink-0 max-[767px]:order-2">
          <div className="max-[767px]:order-1 rtl:max-[767px]:order-2 min-[768px]:contents">
            <LoginLanguage />
          </div>
          {showBurger && onBurgerClick && (
            <div className="shrink-0 max-[767px]:order-2 rtl:max-[767px]:order-1">
              <BurgerMenu
                onClick={onBurgerClick}
                isOpen={isMobileMenuOpen}
                ariaLabel={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
