'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import type { TextPageProps } from './interfaces/TextPageProps';

const TextPage: React.FC<TextPageProps> = ({ title, text, htmlContent = false }) => {
  const { i18n } = useTranslation();
  const { getContent } = useContentApi('global_components');
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div data-testid="text-page">
      <Container>
        <div className="flex flex-col gap-8 items-start w-full my-8">
          <div className="flex flex-col gap-4">
            <button className="flex items-center gap-2" onClick={handleBack}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: i18n.language === 'he' ? 'rotate(0)' : 'rotate(180deg)',
                }}
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {getContent('back')}
            </button>
            <h1 className="not-italic font-medium leading-normal text-textTheme-primary text-[clamp(1.9375rem,1.5rem+1.2vw,3rem)]">
              {title}
            </h1>
          </div>
          <div className="not-italic font-normal leading-[140%] text-textTheme-primary whitespace-pre-line text-[clamp(0.8125rem,0.85rem+0.2vw,0.875rem)]">
            {htmlContent ? <div dangerouslySetInnerHTML={{ __html: text }} /> : text}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TextPage;
