'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const PaymentHistory: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');

  return (
    <Container>
      <div className="page-stack">
        <div className="flex items-center gap-4">
          <Link href="/personal-cabinet" className="text-accent-primary hover:underline">
            {getContent('personal_cabinet_title')}
          </Link>
          <span className="text-textTheme-secondary">/</span>
          <Link href="/payments" className="text-accent-primary hover:underline">
            {getContent('payments')}
          </Link>
          <span className="text-textTheme-secondary">/</span>
          <span className="text-textTheme-primary">{getContent('payment_history')}</span>
        </div>

        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent('payment_history')}
        </h1>

        <div className="surface-card-p8">
          <p className="text-textTheme-secondary">{getContent('no_payment_history')}</p>
        </div>
      </div>
    </Container>
  );
};

export default PaymentHistory;
