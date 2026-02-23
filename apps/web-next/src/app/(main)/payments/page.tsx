'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

type TabType = 'cards' | 'history';

/**
 * Payments page: tabs for payment cards and history, with content from useContentApi('common').
 */
const Payments: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const [activeTab, setActiveTab] = useState<TabType>('cards');

  return (
    <Container>
      <div className="page-stack">
        <div className="flex items-center gap-4">
          <Link href="/personal-cabinet" className="text-accent-primary hover:underline">
            {getContent('personal_cabinet_title')}
          </Link>
          <span className="text-textTheme-secondary">/</span>
          <span className="text-textTheme-primary">{getContent('payments')}</span>
        </div>

        <h1 className="text-3xl font-medium text-textTheme-primary">{getContent('payments')}</h1>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('cards')}
            className={`tab-btn ${activeTab === 'cards' ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            {getContent('payment_cards')}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`tab-btn ${activeTab === 'history' ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            {getContent('payment_history')}
          </button>
        </div>

        <div className="surface-card-p8">
          {activeTab === 'cards' ? (
            <div className="flex flex-col gap-4">
              <p className="text-textTheme-secondary">{getContent('no_payment_cards')}</p>
              <button type="button" className="btn-primary-md w-fit">
                {getContent('add_card')}
              </button>
            </div>
          ) : (
            <p className="text-textTheme-secondary">{getContent('no_payment_history')}</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Payments;
