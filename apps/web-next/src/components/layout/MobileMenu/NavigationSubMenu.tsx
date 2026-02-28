'use client';

import React from 'react';
import Link from 'next/link';
import MobileMenuCloseButton from './MobileMenuCloseButton';
import type { NavigationSubMenuProps } from './interfaces/NavigationSubMenuProps';

const NavigationSubMenu: React.FC<NavigationSubMenuProps> = ({
  items,
  isOpen,
  onClose,
  onCloseMenu,
}) => {
  const handleClose = () => {
    onClose();
    onCloseMenu?.();
  };

  const handleLinkClick = () => {
    onClose();
    onCloseMenu?.();
  };

  return (
    <nav
      className={`fixed top-0 h-full w-full bg-base-primary z-[10003] transition-all duration-300 ease-in-out
        ${isOpen ? 'ltr:left-0 rtl:right-0' : 'ltr:-left-full rtl:-right-full rtl:left-auto'}
      `}
    >
      <div className="flex justify-end items-center p-4 px-5 min-[768px]:ps-[35px] min-[768px]:pe-6 md:ps-[46px] md:pe-6">
        <MobileMenuCloseButton onClose={handleClose} ariaLabel="Close submenu" />
      </div>
      <div className="p-6 pt-4 px-5 min-[768px]:ps-[35px] min-[768px]:pe-6 md:ps-[46px] md:pe-6 text-left rtl:text-right">
        <ul className="flex flex-col gap-4 list-none p-0 m-0 items-start rtl:items-end">
          {items.map((item, idx) => (
            <li
              key={item.path || `sub-${idx}`}
              className="text-[clamp(1rem,0.95rem+0.3vw,1.125rem)] text-white hover:text-accent-primary transition-colors text-left rtl:text-right w-full"
            >
              <Link
                href={item.path || '/'}
                onClick={handleLinkClick}
                className="text-inherit no-underline block py-2 w-full"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationSubMenu;
