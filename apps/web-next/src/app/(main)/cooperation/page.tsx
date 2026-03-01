'use client';

import React from 'react';
import Image from 'next/image';

import { FEATURES } from './constants';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const Cooperation: React.FC = () => {
  useContentFetch('cooperation');
  const { getContent } = useContentApi('cooperation');

  return (
    <Container>
      <div className="flex flex-col gap-16 w-full my-8">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-medium text-textTheme-primary sm:text-[1.9375rem]">
            {getContent('cooperation_title')}
          </h1>
          <p className="text-base text-textTheme-secondary max-w-[48rem]">
            {getContent('cooperation_subtitle')}
          </p>
        </div>

        {/* Marketplace section */}
        <div
          className="relative flex flex-col gap-6 rounded-lg overflow-hidden px-[10%] py-[clamp(1.5rem,4vw,2.5rem)] min-h-[clamp(100px,12vw,160px)]"
          style={{
            backgroundColor: '#1a1a1a',
            backgroundImage: 'url(/static/about/vector-32.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '100% 100%',
            backgroundSize: '50% auto',
          }}
        >
          <h2 className="text-2xl font-semibold text-white">
            {getContent('marketplace_title')}
          </h2>
          <p className="text-base text-white leading-relaxed max-w-[70%]">
            {getContent('marketplace_description')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature) => (
            <div key={feature.key} className="surface-card-p6 flex items-center gap-4">
              <span className="text-3xl">{feature.icon}</span>
              <span className="text-base font-medium text-textTheme-primary">
                {getContent(feature.key)}
              </span>
            </div>
          ))}
        </div>

        {/* One Click Mortgage */}
        <div className="flex flex-col md:flex-row gap-8 items-center bg-base-secondary rounded-lg p-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-textTheme-primary mb-4">
              {getContent('one_click_mortgage')}
            </h2>
          </div>
          <div className="flex-shrink-0 flex gap-4">
            <Image
              src="/static/about/frame-14100937611.svg"
              alt="Feature 1"
              width={100}
              height={100}
            />
            <Image
              src="/static/about/frame-14100937612.svg"
              alt="Feature 2"
              width={100}
              height={100}
            />
          </div>
        </div>

        {/* Referral Program */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('referral_title')}
          </h2>
          <p className="text-base text-textTheme-secondary leading-relaxed">
            {getContent('referral_description')}
          </p>
        </div>

        {/* CTA */}
        <div className="surface-card-p8 flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('cooperation_cta_title')}
          </h2>
          <span className="text-base text-textTheme-secondary">
            {getContent('register_partner_program')}
          </span>
        </div>
      </div>
    </Container>
  );
};

export default Cooperation;
