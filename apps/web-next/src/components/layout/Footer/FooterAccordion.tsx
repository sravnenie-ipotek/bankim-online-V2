'use client'

import React from 'react'
import useDisclosure from '@/hooks/useDisclosure'

interface FooterAccordionProps {
  title: string
  children: React.ReactNode
}

/**
 * Reusable accordion component for mobile footer sections.
 * Extracts the repeated accordion pattern from Company, Contacts, Documents.
 */
const FooterAccordion: React.FC<FooterAccordionProps> = ({ title, children }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div className="flex flex-col w-full">
      <div
        onClick={opened ? close : open}
        className="text-[1rem] font-medium leading-normal text-textTheme-primary flex justify-between w-full border-b border-base-secondaryDefaultButton py-[0.9375rem] px-[1.4375rem] m-0 cursor-pointer items-center"
      >
        {title}
        <div
          className={`transition-all duration-100 ease-in-out ${opened ? 'rotate-180' : ''}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </div>
      <div
        className={`flex flex-col gap-[0.8rem] transition-all duration-300 ease-in-out overflow-hidden [&>a]:block [&>a]:py-2 [&>a]:text-textTheme-secondary [&>a]:no-underline [&>a]:text-[0.875rem] [&>a]:transition-colors [&>a]:duration-200 [&>a:hover]:text-textTheme-primary [&>a:hover]:underline ${
          opened
            ? 'opacity-100 h-auto p-6 pointer-events-auto'
            : 'opacity-0 h-0 px-6 py-0 pointer-events-none'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default FooterAccordion
