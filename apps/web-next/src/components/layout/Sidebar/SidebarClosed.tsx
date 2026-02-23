'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import DesktopMenuList from './DesktopMenuList';
import SubSidebar from './SubSidebar';
import SocialMedia from './SocialMedia';
import {
  useMenuItems,
  useBusinessMenuItems,
  useSubMenuItems,
  useBusinessSubMenuItems,
} from './useMenuItems';

interface SidebarClosedProps {
  onClick: () => void;
  isOpen: boolean;
  isSubMenuOpen: boolean;
  setSubMenu: (state: boolean) => void;
  isBusinessSubMenuOpen: boolean;
  setBusinessSubMenu: (state: boolean) => void;
  toggleSubMenu: () => void;
  toggleBusinessSubMenu: () => void;
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
  const { getContent } = useContentApi('global_components');
  const menuItems = useMenuItems();
  const businessMenuItems = useBusinessMenuItems();
  const subMenuItems = useSubMenuItems();
  const businessSubMenuItems = useBusinessSubMenuItems();

  const isSubMenusOpen = isSubMenuOpen || isBusinessSubMenuOpen;

  const handleClose = () => {
    onClick();
    setSubMenu(false);
    setBusinessSubMenu(false);
  };

  const handleToggleSubMenu = () => {
    toggleSubMenu();
    setBusinessSubMenu(false);
  };

  const handleToggleBusinessSubMenu = () => {
    setSubMenu(false);
    toggleBusinessSubMenu();
  };

  return (
    <div
      className={`w-[468px] h-screen max-h-[100dvh] absolute top-0 z-[10000] transition-all duration-300 ease-in-out
        ltr:left-[-422px] rtl:right-[-422px]
        ${isOpen ? 'ltr:!left-0 rtl:!right-0' : ''}`}
    >
      <div
        className={`relative w-full h-full bg-base-sidebarBg border border-base-stroke min-h-0
          flex flex-col
          ${isOpen ? 'shadow-[1.25px_0_1px_rgba(255,255,255,0.1)]' : ''}`}
      >
        {/* Social bar: absolutely positioned inside sidebar. LTR = left edge, RTL = right edge */}
        <div className="absolute top-0 h-full w-[30px] ltr:left-0 rtl:right-0 overflow-visible z-10">
          <SocialMedia />
        </div>

        {/* Menu column: full width, with padding to avoid social bar overlap */}
        <div className="relative flex-1 min-w-0 h-full flex flex-col min-h-0">
          {/* Toggle handle (hidden when submenus are open) */}
          {!isSubMenusOpen && (
            <div
              className={`absolute w-10 h-[220px] bg-base-sidebarBg border border-base-stroke ltr:border-l-0 rtl:border-l-0 top-1/2 -translate-y-1/2 rounded-none flex items-center overflow-hidden cursor-pointer transition-all duration-300 ease-in-out sm:max-md:w-[35px] sm:max-md:h-[180px]
                ltr:right-0 ltr:translate-x-full justify-center
                rtl:left-0 rtl:-translate-x-full rtl:scale-x-[-1]
                ${isOpen ? 'translate-x-1/2 shadow-[1px_0_1px_rgba(255,255,255,0.1)] sm:max-md:translate-x-[30%] rtl:-translate-x-1/2' : ''}`}
              onClick={handleClose}
            >
              <button
                type="button"
                className={`w-5 h-5 flex items-center justify-center relative border-0 outline-none p-0 bg-transparent
                  before:content-[''] before:absolute before:left-0 before:top-0 before:w-0.5 before:h-full before:bg-white
                  after:content-[''] after:absolute after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-white
                  ${isOpen ? '[&>span]:rotate-45 before:invisible before:opacity-0 before:rotate-45 after:-rotate-45 after:right-2' : ''}`}
              >
                <span className="w-0.5 h-full bg-white transition-transform">{''}</span>
              </button>
            </div>
          )}

          {/* Menu content */}
          <nav className="flex-1 min-h-0 overflow-auto px-4">
            <section className="pt-[108px] flex flex-col justify-start gap-10 w-full sm:max-md:pt-20 sm:max-md:gap-8 max-[480px]:pt-[60px] max-[480px]:gap-6">
              <DesktopMenuList
                title={getContent('sidebar_company')}
                items={menuItems}
                onFirstItemClick={handleToggleSubMenu}
                onLinkClick={handleClose}
                isExpanded={isSubMenuOpen}
              />
              <DesktopMenuList
                title={getContent('sidebar_business')}
                items={businessMenuItems}
                onFirstItemClick={handleToggleBusinessSubMenu}
                onLinkClick={handleClose}
                isExpanded={isBusinessSubMenuOpen}
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
        </div>
      </div>
    </div>
  );
};

export default SidebarClosed;
