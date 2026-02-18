'use client'

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header/Header'
import SidebarClosed from './Sidebar/SidebarClosed'
import MobileMenu from './MobileMenu/MobileMenu'
import LoginDialog from '@/components/ui/LoginDialog/LoginDialog'
import { useToggle } from '@/hooks/useToggle'
import { usePersistentToggle } from '@/hooks/usePersistentToggle'
import { useWindowResize } from '@/hooks/useWindowResize'

interface LayoutShellProps {
  children: React.ReactNode
  footer?: React.ReactNode
}

/**
 * Main application shell that replicates the existing Layout.tsx logic
 * using Next.js navigation hooks.
 */
const LayoutShell: React.FC<LayoutShellProps> = ({ children, footer }) => {

  const { i18n } = useTranslation()
  const { isOn: isOpen, toggle: toggleOpen } = usePersistentToggle('sidebar-open', false)
  const { isDesktop } = useWindowResize()
  const {
    isOn: isSubMenuOpen,
    toggle: toggleSubMenu,
    set: setSubMenu,
  } = useToggle(false)
  const {
    isOn: isBusinessSubMenuOpen,
    toggle: toggleBusinessSubMenu,
    set: setBusinessSubMenu,
  } = useToggle(false)
  const { isOn: isOpenMobileMenu, toggle: toggleMobileMenu } = useToggle(false)

  // Keep html lang/dir in sync with i18n
  useEffect(() => {
    const lang = i18n.language || 'he'
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr')
  }, [i18n.language])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpenMobileMenu ? 'hidden' : 'auto'
  }, [isOpenMobileMenu])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!isOpenMobileMenu) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleMobileMenu()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpenMobileMenu, toggleMobileMenu])

  return (
    <>
      <Header isMobile={!isDesktop} />

      {/* Desktop sidebar overlay */}
      {isOpen && (
        <div
          onClick={() => {
            toggleOpen()
            setSubMenu(false)
            setBusinessSubMenu(false)
          }}
          className="fixed inset-0 w-screen h-screen bg-black/75 transition-all duration-300 ease-in-out backdrop-blur-[2px] z-[9998]"
          aria-hidden="true"
        />
      )}

      {/* Mobile menu overlay + component */}
      {!isDesktop && isOpenMobileMenu && (
        <>
          <div
            className="fixed inset-0 w-full h-full min-h-screen min-h-[100dvh] bg-black/60 z-[10001]"
            style={{ width: '100vw' }}
            onClick={toggleMobileMenu}
            aria-hidden="true"
            role="presentation"
          />
          <MobileMenu onClick={toggleMobileMenu} isOpen={isOpenMobileMenu} />
        </>
      )}

      {/* Desktop sidebar - wrapped in relative so sidebar uses absolute and scrolls with page */}
      {isDesktop && (
        <div className="relative">
          <SidebarClosed
          onClick={toggleOpen}
          isOpen={isOpen}
          isSubMenuOpen={isSubMenuOpen}
          setSubMenu={setSubMenu}
          isBusinessSubMenuOpen={isBusinessSubMenuOpen}
          setBusinessSubMenu={setBusinessSubMenu}
          toggleSubMenu={toggleSubMenu}
          toggleBusinessSubMenu={toggleBusinessSubMenu}
          />
        </div>
      )}

      <main className="min-h-screen w-full ps-[153px] pe-[153px]">
        <div className="w-full max-w-[1132px] min-h-[1154px] flex flex-col gap-[2px] mx-auto">
          {children}
        </div>
      </main>

      {footer}

      <LoginDialog />
    </>
  )
}

export default LayoutShell
