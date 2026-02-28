'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useToggle } from '@/hooks/useToggle';
import MobileMenuHeader from './MobileMenuHeader';
import NavigationList from './NavigationList';
import NavigationSubMenu from './NavigationSubMenu';
import MobileMenuSocialLinkItem from './MobileMenuSocialLinkItem';
import SocialMedia from '../Sidebar/SocialMedia';
import LanguageTrigger from './LanguageTrigger';
import LanguageSubMenu from './LanguageSubMenu';
import {
  useMenuItems,
  useBusinessMenuItems,
  useSubMenuItems,
  useBusinessSubMenuItems,
} from '../Sidebar/useMenuItems';
import { SocialDeepLinkHelper } from '@/helpers/SocialDeepLinkHelper';
import type { MobileMenuProps } from './interfaces/MobileMenuProps';

const MobileMenu: React.FC<MobileMenuProps> = ({ onClick, isOpen }) => {
  const { getContent } = useContentApi('global_components');
  const menuItems = useMenuItems();
  const businessMenuItems = useBusinessMenuItems();
  const subMenuItems = useSubMenuItems();
  const businessSubMenuItems = useBusinessSubMenuItems();

  const { isOn: isSubMenuOpen, toggle: toggleSubMenu, set: setSubMenu } = useToggle(false);
  const {
    isOn: isBusinessSubMenuOpen,
    toggle: toggleBusinessSubMenu,
    set: setBusinessSubMenu,
  } = useToggle(false);
  const { isOn: isLanguageMenuOpen, set: setLanguageMenu } = useToggle(false);

  const handleClose = () => {
    onClick();
    setSubMenu(false);
    setBusinessSubMenu(false);
    setLanguageMenu(false);
  };

  return (
    <nav
      className={`fixed top-0 h-full w-full bg-base-primary z-[10002] transition-all duration-300 ease-in-out flex flex-col overflow-hidden
        ${isOpen ? 'ltr:left-0 rtl:right-0' : 'ltr:-left-full rtl:-right-full rtl:left-auto'}
      `}
    >
      <MobileMenuHeader onClose={handleClose} />

      <div className="flex-1 overflow-y-auto px-5 py-4 min-[768px]:ps-[35px] min-[768px]:pe-6 md:ps-[46px] md:pe-6 text-left rtl:text-right">
        <NavigationList
          title={getContent('sidebar_company')}
          items={menuItems}
          toggle={toggleSubMenu}
          onClose={handleClose}
        />
        <NavigationList
          title={getContent('sidebar_business')}
          items={businessMenuItems}
          toggle={toggleBusinessSubMenu}
          onClose={handleClose}
        />

        <LanguageTrigger onOpen={() => setLanguageMenu(true)} />

        {/* Social links — mobile only (<768px): compact icon-only row */}
        <div className="min-[768px]:hidden flex flex-wrap items-center gap-4 justify-start rtl:justify-end border-t border-base-stroke mt-4 pt-4">
          {SocialDeepLinkHelper.getSidebarPlatforms().map((config) => (
            <MobileMenuSocialLinkItem key={config.platform} config={config} />
          ))}
        </div>
      </div>

      {/* Social links — iPad only (768px–1024px): pinned at bottom with sidebar background */}
      <div className="hidden min-[768px]:flex min-[1025px]:hidden bg-base-sidebarBg py-4 shrink-0">
        <SocialMedia variant="horizontal" />
      </div>

      {/* Language submenu */}
      <LanguageSubMenu isOpen={isLanguageMenuOpen} onClose={() => setLanguageMenu(false)} />

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
  );
};

export default MobileMenu;
