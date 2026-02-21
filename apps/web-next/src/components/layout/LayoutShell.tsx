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
      {/* Desktop sidebar overlay: always in DOM when desktop so it can fade */}
      {isDesktop && (
        <div
          onClick={() => {
            toggleOpen()
            setSubMenu(false)
            setBusinessSubMenu(false)
          }}
          className={`fixed inset-0 w-screen h-screen bg-black/75 backdrop-blur-[2px] z-[9998] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          aria-hidden={!isOpen}
        />
      )}

      {/* Mobile menu overlay + component */}
      {!isDesktop && isOpenMobileMenu && (
        <>
          <div
            className="fixed inset-0 w-screen h-full min-h-screen min-h-[100dvh] bg-black/60 z-[10001]"
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

      {/* Header: mobile = 20px black each side + 350px content; SD/MD = same 20px black, content fills; desktop = fluid */}
      <header className="w-full border-b border-[#333535] min-h-[94px] flex items-center">
        <div className="w-full max-[1240px]:px-[var(--mobile-content-gap)] min-[1241px]:ps-[46px] min-[1241px]:pe-6">
          <div className="layout-content-fluid w-full min-w-0 max-w-[var(--content-width-fluid)] mx-[var(--content-margin-fluid)] max-[767px]:w-[var(--mobile-content-width-fluid)] max-[767px]:max-w-full max-[767px]:mx-auto min-[768px]:max-[1240px]:w-full min-[768px]:max-[1240px]:max-w-full min-[768px]:max-[1240px]:mx-0">
            <Header
              showBurger={!isDesktop}
              onBurgerClick={toggleMobileMenu}
              isMobileMenuOpen={isOpenMobileMenu}
            />
          </div>
        </div>
      </header>

      {/* Mobile = 20px black each side + 350px content; SD/MD = same 20px black, content fills; desktop = fluid */}
      <div className="w-full max-w-full min-w-0 max-[1240px]:px-[var(--mobile-content-gap)] min-[1241px]:ps-[46px] min-[1241px]:pe-6">
        <div className="layout-content-fluid w-full min-w-0 max-w-[var(--content-width-fluid)] mx-[var(--content-margin-fluid)] max-[767px]:px-0 max-[767px]:pt-[var(--mobile-content-top)] max-[767px]:w-[var(--mobile-content-width-fluid)] max-[767px]:max-w-full max-[767px]:mx-auto min-[768px]:max-[1240px]:w-full min-[768px]:max-[1240px]:max-w-full">
          <div className="max-[767px]:w-[var(--mobile-content-width-fluid)] max-[767px]:max-w-full max-[767px]:mx-auto min-[768px]:contents">
            <main className="w-full min-h-screen flex flex-col gap-[2px]">
              {children}
            </main>
          </div>
        </div>
      </div>

      {footer}

      <LoginDialog />
    </>
  )
}

export default LayoutShell
