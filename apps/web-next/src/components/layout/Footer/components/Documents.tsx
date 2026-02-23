'use client';

import React from 'react';
import Link from 'next/link';
import { useWindowResize } from '@hooks/useWindowResize';
import { useContentApi } from '@hooks/useContentApi';
import FooterAccordion from '../FooterAccordion';

const DOCUMENT_LINKS = [
  { key: 'footer_tenders_brokers', href: '/tenders-for-brokers' },
  { key: 'footer_tenders_lawyers', href: '/tenders-for-lawyers' },
  { key: 'footer_legal_1', href: '/terms' },
  { key: 'footer_legal_2', href: '/privacy-policy' },
  { key: 'footer_legal_3', href: '/cookie' },
  { key: 'footer_legal_4', href: '/refund' },
] as const;

const Documents: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const { width } = useWindowResize();

  if (width > 1024) {
    return (
      <div className="flex flex-col">
        <div className="font-medium leading-normal text-textTheme-primary mb-6 text-left text-[clamp(0.9rem,0.9rem+0.2vw,1rem)]">
          {getContent('footer_legal')}
        </div>
        <div className="font-normal leading-[140%] text-textTheme-secondary gap-[0.8rem] flex flex-col text-[clamp(0.8125rem,0.85rem+0.2vw,0.875rem)] [&>a]:cursor-pointer [&>a]:text-textTheme-secondary [&>a]:no-underline [&>a]:transition-colors [&>a]:duration-200 [&>a:hover]:underline [&>a:hover]:text-textTheme-primary">
          {DOCUMENT_LINKS.map((link) => (
            <Link key={link.key} href={link.href} className="cursor-pointer hover:underline">
              {getContent(link.key)}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <FooterAccordion title={getContent('footer_legal')}>
      {DOCUMENT_LINKS.map((link) => (
        <Link key={link.key} href={link.href}>
          {getContent(link.key)}
        </Link>
      ))}
    </FooterAccordion>
  );
};

export default Documents;
