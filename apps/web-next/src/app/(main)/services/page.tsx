'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { trackClick } from '@/helpers/analytics';

interface ServiceItem {
  titleKey: string;
  descriptionKey: string;
  route: string;
  icon: string;
}

const SERVICES: ServiceItem[] = [
  {
    titleKey: 'calculate_mortgage',
    descriptionKey: 'calculate_mortgage_desc',
    route: '/services/calculate-mortgage/1',
    icon: '🏠',
  },
  {
    titleKey: 'refinance_mortgage',
    descriptionKey: 'refinance_mortgage_desc',
    route: '/services/refinance-mortgage/1',
    icon: '🔄',
  },
  {
    titleKey: 'calculate_credit',
    descriptionKey: 'calculate_credit_desc',
    route: '/services/calculate-credit/1',
    icon: '💳',
  },
  {
    titleKey: 'refinance_credit',
    descriptionKey: 'refinance_credit_desc',
    route: '/services/refinance-credit/1',
    icon: '📊',
  },
];

/**
 * Services overview page: list of service cards (calculate mortgage, etc.) with links.
 */
const ServicesOverview: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const router = useRouter();

  return (
    <Container>
      <div className="page-stack">
        <h1 className="text-[clamp(1.9375rem,2rem+1vw,3rem)] font-medium text-textTheme-primary">
          {getContent('services_title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <button
              key={service.route}
              onClick={() => {
                trackClick('start_calculation', service.route);
                router.push(service.route);
              }}
              className="surface-card-hover flex items-start gap-4 p-6 text-left"
            >
              <span className="text-4xl">{service.icon}</span>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-textTheme-primary">
                  {getContent(service.titleKey)}
                </h2>
                <p className="text-sm text-textTheme-secondary">
                  {getContent(service.descriptionKey)}
                </p>
                <span className="text-accent-primary text-sm font-medium flex items-center gap-1">
                  {getContent('start_calculation')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ServicesOverview;
