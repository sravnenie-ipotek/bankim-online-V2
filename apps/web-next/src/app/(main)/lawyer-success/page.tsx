'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const LawyerSuccess: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');

  return (
    <Container>
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M12 20L18 26L28 14"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent('lawyer_success_title')}
        </h1>
        <p className="text-base text-textTheme-secondary max-w-md">
          {getContent('lawyer_success_message')}
        </p>
        <Link href="/" className="btn-primary-lg mt-4">
          {getContent('back_to_home')}
        </Link>
      </div>
    </Container>
  );
};

export default LawyerSuccess;
