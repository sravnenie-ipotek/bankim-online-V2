'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import ServiceCard from './ServiceCard';
import ServiceCardIcon from './components/ServiceCardIcon';

const TopServices: React.FC = () => {
  const { getContent } = useContentApi('home_page');

  return (
    <div className="flex w-full pt-[32px] flex-wrap max-[1280px]:flex-col max-[1280px]:gap-3 gap-[2px] min-[1280px]:flex-nowrap min-[1280px]:justify-between min-[1280px]:gap-[calc((1130px-265px*4)/3)] px-0 xl:gap-[calc((1507px-338px*4)/3)]">
      <ServiceCard
        to="/services/calculate-mortgage/1"
        title={getContent('calculate_mortgage')}
        icon={<ServiceCardIcon src="/static/calculate-mortgage-icon.png" loading="eager" />}
      />
      <ServiceCard
        to="/services/refinance-mortgage/1"
        title={getContent('refinance_mortgage')}
        icon={<ServiceCardIcon src="/static/refinance-mortgage-icon.png" />}
      />
      <ServiceCard
        to="/services/calculate-credit/1"
        title={getContent('calculate_credit')}
        icon={<ServiceCardIcon src="/static/calculate-credit-icon.png" />}
      />
      <ServiceCard
        to="/services/refinance-credit/1"
        title={getContent('refinance_credit')}
        icon={<ServiceCardIcon src="/static/refinance-credit-icon.png" />}
      />
    </div>
  );
};

export default TopServices;
