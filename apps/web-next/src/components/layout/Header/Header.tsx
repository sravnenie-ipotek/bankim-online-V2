'use client'

import React from 'react'
import LoginLanguage from './LoginLanguage'
import Logo from './Logo'
import type { HeaderProps } from './interfaces/HeaderProps'

const Header: React.FC<HeaderProps> = ({ isMobile }) => {
  return (
    <div className="w-full h-[94px] border-b border-[#333535]">
      <div
        className={`flex h-full items-center ${isMobile ? 'max-w-full px-4' : 'max-w-none px-5'}`}
      >
        <div
          className={`flex justify-between items-center w-full mx-auto ${isMobile ? 'max-w-none' : 'max-w-[70.63rem]'}`}
        >
          <Logo />
          <div className="flex items-center gap-4">
            <LoginLanguage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
