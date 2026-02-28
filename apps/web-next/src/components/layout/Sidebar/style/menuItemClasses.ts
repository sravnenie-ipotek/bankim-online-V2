/** Sidebar menu typography: 25px, medium (500), line-height 100%, letter-spacing 0%, uppercase, vertical align middle */
const SIDEBAR_MENU_TYPO_CLASS =
  'text-[clamp(1rem,1.2rem+0.7vw,1.5625rem)] font-medium leading-[130%] tracking-normal capitalize align-middle';

/** Menu list: 7.4px gap between heading and items and between items */
export const DESKTOP_MENU_LIST_CLASS = `flex flex-col gap-[7.4px] text-left rtl:text-right items-stretch ltr:ml-10 rtl:mr-16 ltr:pr-6 rtl:pl-10 sm:max-md:ltr:ml-8 sm:max-md:rtl:mr-12 max-[480px]:ltr:ml-4 max-[480px]:rtl:mr-8 ${SIDEBAR_MENU_TYPO_CLASS}`;

export const DESKTOP_MENU_HEADING_CLASS = `text-accent-primary text-left rtl:text-right w-full px-3 ${SIDEBAR_MENU_TYPO_CLASS}`;

/** Single item: min 38px height, auto-grows for wrapping text. LTR/RTL aligned */
export const DESKTOP_MENU_ITEM_BASE_CLASS = `min-h-[38px] flex items-center text-white transition-colors duration-300 ease-in-out hover:underline hover:text-accent-primary text-left rtl:text-right w-full max-w-[312px] px-3 py-2 box-border ${SIDEBAR_MENU_TYPO_CLASS}`;

export const DESKTOP_MENU_EXPANDABLE_ITEM_CLASS = `${DESKTOP_MENU_ITEM_BASE_CLASS} cursor-pointer`;

export const DESKTOP_MENU_LINK_CLASS = 'text-white block w-full';

export const MOBILE_MENU_ITEM_CLASS =
  'text-[clamp(1rem,1rem+0.35vw,1.25rem)] text-white font-normal transition-colors duration-300 ease-in-out relative cursor-pointer hover:underline hover:text-accent-primary text-left rtl:text-right block w-full';

export const MOBILE_MENU_LINK_CLASS = 'text-white text-left rtl:text-right block w-full';
