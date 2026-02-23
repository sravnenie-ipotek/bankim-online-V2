'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

interface NavItem {
  href: string;
  labelKey: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/personal-cabinet/questionnaire-overview',
    labelKey: 'cabinet_questionnaire',
    icon: '📋',
  },
  {
    href: '/personal-cabinet/main-borrower-personal-data',
    labelKey: 'cabinet_personal_data',
    icon: '👤',
  },
  { href: '/personal-cabinet/income-data', labelKey: 'cabinet_income', icon: '💰' },
  { href: '/personal-cabinet/documents', labelKey: 'cabinet_documents', icon: '📄' },
  { href: '/personal-cabinet/credit-history', labelKey: 'cabinet_credit_history', icon: '📊' },
  { href: '/personal-cabinet/bank-authorization', labelKey: 'cabinet_bank_auth', icon: '🏦' },
  { href: '/personal-cabinet/settings', labelKey: 'cabinet_settings', icon: '⚙️' },
  { href: '/personal-cabinet/notifications', labelKey: 'cabinet_notifications', icon: '🔔' },
  { href: '/payments', labelKey: 'cabinet_payments', icon: '💳' },
];

const PersonalCabinet: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');

  return (
    <Container>
      <div className="page-stack">
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent('personal_cabinet_title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="surface-card-hover flex items-center gap-4 p-6"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-textTheme-primary font-medium">
                {getContent(item.labelKey)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PersonalCabinet;
