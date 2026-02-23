'use client';

import React from 'react';
import Link from 'next/link';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

/**
 * Bank worker demo page: simple content and CTA for demo flow.
 */
const BankWorkerDemo: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-authLg surface-card-p8 text-center">
        <h1 className="text-2xl font-medium text-textTheme-primary mb-4">
          {getContent('bank_worker_demo_title')}
        </h1>
        <p className="text-textTheme-secondary mb-6">
          {getContent('bank_worker_demo_description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {['feature_1', 'feature_2', 'feature_3', 'feature_4'].map((key) => (
            <div key={key} className="p-4 bg-base-base800 rounded-lg">
              <p className="text-textTheme-primary text-sm">{getContent(`demo_${key}`)}</p>
            </div>
          ))}
        </div>
        <Link href="/bank-worker/register/demo-token" className="btn-primary-lg inline-block">
          {getContent('start_demo')}
        </Link>
      </div>
    </div>
  );
};

export default BankWorkerDemo;
