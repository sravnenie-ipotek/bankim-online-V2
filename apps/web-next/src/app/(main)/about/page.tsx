'use client';

import React from 'react';
import Image from 'next/image';

import { ABOUT_FEATURES } from './constants';
import Container from '@/components/ui/Container/Container';
import FeatureCard from '@/components/ui/FeatureCard/FeatureCard';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const About: React.FC = () => {
  useContentFetch('about');
  const { getContent } = useContentApi('about');

  return (
    <Container>
      <div className="flex flex-col gap-16 items-start w-full my-8">
        {/* Hero Section */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-5xl not-italic font-medium leading-normal text-textTheme-primary sm:text-[1.9375rem]">
            {getContent('about_title')}
          </h1>
          <p className="text-base not-italic font-normal leading-[140%] text-textTheme-secondary max-w-[48rem]">
            {getContent('about_desc')}
          </p>
        </div>

        {/* How it works section */}
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-3xl font-medium text-textTheme-primary">
            {getContent('about_how_it_work')}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <p className="text-base leading-[160%] text-textTheme-secondary">
                {getContent('about_how_it_work_text')}
              </p>
              <p className="text-accent-primary font-semibold mt-4">{getContent('bankimonline')}</p>
              <p className="text-base leading-[160%] text-textTheme-secondary mt-4">
                {getContent('about_how_it_work_text_second')}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/static/about/frame-1410093763@3x.png"
                alt="About BankimOnline"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Why us section */}
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-3xl font-medium text-textTheme-primary">
            {getContent('about_why_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ABOUT_FEATURES.map((feature) => (
              <FeatureCard
                key={feature.titleKey}
                icon={feature.icon}
                title={getContent(feature.titleKey)}
                text={getContent(feature.textKey)}
                size="full"
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
