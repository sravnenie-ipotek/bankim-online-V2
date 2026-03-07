'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { ABOUT_FEATURES } from './constants';
import Container from '@/components/ui/Container/Container';
import { AboutBox } from '@/components/ui/AboutBox';
import FeatureCard from '@/components/ui/FeatureCard/FeatureCard';
import VideoPoster from '@/components/ui/VideoPoster/VideoPoster';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const About: React.FC = () => {
  useContentFetch('about');
  const { getContent } = useContentApi('about');
  const { i18n } = useTranslation();
  const direction: 'ltr' | 'rtl' =
    i18n.language?.startsWith('he') || i18n.language === 'iw' ? 'rtl' : 'ltr';

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
            <AboutBox
              description={getContent('about_desc')}
              variant="default"
              direction={direction}
            />
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
