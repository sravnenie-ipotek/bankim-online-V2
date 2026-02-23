'use client';

import React from 'react';
import Link from 'next/link';
import { useWindowResize } from '@/hooks/useWindowResize';
import { useContentApi } from '@hooks/useContentApi';
import FooterAccordion from '../FooterAccordion';

const COMPANY_LINKS = [
  { key: 'footer_contacts', href: '/contacts' },
  { key: 'footer_about', href: '/about' },
  { key: 'footer_vacancy', href: '/vacancies' },
  { key: 'footer_partner', href: '/cooperation' },
] as const;

const Company: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const { width } = useWindowResize();

  if (width > 1024) {
    return (
      <div className="flex flex-col">
        <div className="font-medium leading-normal text-textTheme-primary mb-6 text-[clamp(0.9rem,0.9rem+0.2vw,1rem)]">
          {getContent('footer_company')}
        </div>
        <div className="flex flex-col gap-[0.8rem] font-normal leading-[140%] text-textTheme-secondary cursor-pointer text-[clamp(0.8125rem,0.85rem+0.2vw,0.875rem)] [&>a]:cursor-pointer [&>a]:text-textTheme-secondary [&>a]:no-underline [&>a]:transition-colors [&>a]:duration-200 [&>a:hover]:underline [&>a:hover]:text-textTheme-primary">
          {COMPANY_LINKS.map((link) => (
            <Link key={link.key} href={link.href} className="hover:underline">
              {getContent(link.key)}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <FooterAccordion title={getContent('footer_company')}>
      {COMPANY_LINKS.map((link) => (
        <Link key={link.key} href={link.href}>
          {getContent(link.key)}
        </Link>
      ))}
    </FooterAccordion>
  );
};

export default Company;
