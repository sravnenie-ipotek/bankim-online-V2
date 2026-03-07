'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useContentApi } from '@hooks/useContentApi';
import Company from './components/Company';
import Contacts from './Contacts';
import Documents from './components/Documents';
import InfoBlock from './components/InfoBlock';

function formatCopyrightSentenceFirst(text: string): string {
  const match = text.match(/^(\d{4})\s+(.*)$/);
  if (match) return `${match[2].trim()} ${match[1]}`;
  return text;
}

const FOOTER_COPYRIGHT_LANGUAGES = ['he', 'en', 'ru'] as const;

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const { getContent } = useContentApi('global_components');
  const copyrightRaw = getContent('footer_copyright');
  const language = i18n.language?.split('-')[0] ?? 'en';
  const useSentenceFirst = FOOTER_COPYRIGHT_LANGUAGES.includes(
    language as (typeof FOOTER_COPYRIGHT_LANGUAGES)[number]
  );
  const copyright = useSentenceFirst ? formatCopyrightSentenceFirst(copyrightRaw) : copyrightRaw;

  return (
    <footer className="relative z-[10001] bg-base-secondary w-full pt-8 pb-4">
      {/* Same alignment as header/main: on mobile 20px gap, 350px max; desktop fluid */}
      <div className="w-full min-[768px]:ps-[35px] md:ps-[46px] rtl:min-[768px]:ps-0 rtl:md:ps-0 rtl:min-[768px]:pe-[35px] rtl:md:pe-[46px] max-[767px]:px-[var(--mobile-content-gap)]">
        <div className="layout-content-fluid w-full min-w-0 max-w-[var(--content-width-fluid)] mx-[var(--content-margin-fluid)] rtl:md:me-0 max-[767px]:w-[var(--mobile-content-width-fluid)] max-[767px]:mx-auto max-[767px]:px-0 flex flex-col justify-center rtl:justify-start items-start rtl:items-start gap-8 px-4 sm:px-5 md:px-0">
          {/* One flex row: logo+social container 373px wide at 1440px (responsive) | space-between | links */}
          <div className="w-full lg:w-[1130px] md:min-h-[clamp(120px,11.04vw,159px)] flex flex-col md:flex-row md:justify-between md:items-stretch gap-4 md:gap-0 max-[767px]:gap-1 pt-0">
            <div className="w-full max-[767px]:w-full md:w-[clamp(192px,25.903vw,373px)] md:h-full md:min-w-0 md:min-h-0 shrink-0 self-start md:max-w-[373px] ms-0 rtl:me-0">
              <InfoBlock />
            </div>
            <div className="flex w-full max-w-full flex-col md:flex-row md:flex-1 md:justify-between md:min-w-0 pt-0">
              <Company />
              <Contacts />
              <Documents />
            </div>
          </div>
          <div className="w-full md:w-[261px] md:min-w-[261px] md:max-w-[261px] md:shrink-0 rtl:self-start font-normal leading-[140%] text-[clamp(0.6875rem,0.7rem+0.15vw,0.75rem)] text-textTheme-primary text-center md:text-start rtl:md:text-start">
            <span>{copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
