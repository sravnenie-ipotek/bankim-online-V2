'use client';

import React from 'react';
import useDisclosure from '@/hooks/useDisclosure';

interface FooterAccordionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Reusable accordion component for mobile footer sections.
 * Extracts the repeated accordion pattern from Company, Contacts, Documents.
 * @param props.title - Section title; used as visible label and aria-label for the trigger.
 * @param props.children - Content shown when expanded (e.g. links).
 */
const FooterAccordion: React.FC<FooterAccordionProps> = ({ title, children }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (opened) {
        close();
      } else {
        open();
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={opened ? close : open}
        onKeyDown={handleKeyDown}
        aria-expanded={opened}
        aria-label={title}
        className="text-[clamp(0.875rem,0.9rem+0.2vw,1rem)] font-medium leading-normal text-textTheme-primary flex justify-between w-full border-b border-base-secondaryDefaultButton py-[0.9375rem] px-[1.4375rem] m-0 cursor-pointer items-center"
      >
        {title}
        <div className={`transition-all duration-100 ease-in-out ${opened ? 'rotate-180' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </div>
      <div
        className={`flex flex-col gap-[0.8rem] transition-all duration-300 ease-in-out overflow-hidden [&>a]:block [&>a]:py-2 [&>a]:text-textTheme-secondary [&>a]:no-underline [&>a]:text-[clamp(0.75rem,0.85rem+0.15vw,0.875rem)] [&>a]:transition-colors [&>a]:duration-200 [&>a:hover]:text-textTheme-primary [&>a:hover]:underline ${
          opened
            ? 'opacity-100 h-auto p-6 pointer-events-auto'
            : 'opacity-0 h-0 px-6 py-0 pointer-events-none'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default FooterAccordion;
