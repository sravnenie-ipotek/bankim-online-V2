'use client';

import React from 'react';
import Image from 'next/image';

import { ABOUT_FEATURES } from './constants';
import Container from '@/components/ui/Container/Container';
import FeatureCard from '@/components/ui/FeatureCard/FeatureCard';
import VideoPoster from '@/components/ui/VideoPoster/VideoPoster';
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
          <h1
            className="text-[clamp(1.5rem,3.33vw,3rem)] font-bold not-italic leading-normal text-textTheme-primary text-center w-full"
          >
            {getContent('about_title')}
          </h1>
          <div className="w-full">
            <div className="overflow-hidden bg-base-sidebarBg flex items-center justify-start py-[clamp(1rem,3vw,1.5rem)] min-h-[clamp(80px,9vw,130px)] relative rounded-[4px] w-full ps-4 pe-[10%] max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:p-[2.4375rem] max-sm:gap-[1.3125rem] max-sm:rounded-lg">
            <Image
              src="/static/about/about-banner-shapes.svg"
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 0px, 50vw"
              className="rtl:hidden max-sm:hidden object-contain object-right pointer-events-none"
            />
            <Image
              src="/static/about/about-banner-shapes-he.svg"
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 0px, 50vw"
              className="ltr:hidden max-sm:hidden object-cover object-left pointer-events-none"
            />
            <p className="relative z-10 text-[clamp(14px,2.19vw,25px)] not-italic font-normal leading-[140%] text-white max-w-[48rem] text-start max-sm:w-full max-sm:max-w-full max-sm:font-inter max-sm:text-xs max-sm:leading-normal max-sm:text-center">
              {getContent('about_desc')}
            </p>
          </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-[clamp(1.25rem,1.5rem+0.5vw,1.875rem)] font-medium text-textTheme-primary">
            {getContent('about_how_it_work')}
          </h2>
          <div className="flex flex-col md:flex-row gap-[clamp(1.5rem,2.5vw,3rem)] items-stretch">
            <div
              className="w-full md:flex-[582_1_0%] text-start bg-base-sidebarBg rounded-lg p-[clamp(1rem,2.08vw,2.5rem)]"
            >
              <p className="text-[clamp(0.875rem,0.9rem+0.2vw,1rem)] leading-[160%] text-textTheme-secondary">
                {getContent('about_how_it_work_text')}{' '}
                <span className="text-accent-primary font-semibold">{getContent('bankimonline')}</span>{' '}
                {getContent('about_how_it_work_text_second')}
              </p>
            </div>
            <div
              className="w-full md:flex-[515_1_0%] [&>div]:!mt-0"
            >
              <VideoPoster size="small" autoPlay={false} showControls={true} />
            </div>
          </div>
        </div>

        {/* Why us section */}
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-[clamp(1.25rem,1.5rem+0.5vw,1.875rem)] font-medium text-textTheme-primary">
            {getContent('about_why_title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ABOUT_FEATURES.map((feature, index) => (
              <div
                key={feature.titleKey}
                className={`h-full ${index === ABOUT_FEATURES.length - 1 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={getContent(feature.titleKey)}
                  text={getContent(feature.textKey)}
                  size="full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
