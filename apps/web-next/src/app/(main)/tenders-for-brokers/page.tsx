'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import Container from '@/components/ui/Container/Container';
import { trackClick } from '@/helpers/analytics';

/**
 * Tenders for brokers page: steps, metrics, and CTA; content from useContentApi.
 */
const TendersForBrokers: React.FC = () => {
  useContentFetch('tenders_brokers');
  const { getContent } = useContentApi('tenders_brokers');
  const router = useRouter();

  return (
    <Container>
      <div className="flex flex-col gap-16 w-full my-8">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-medium text-textTheme-primary sm:text-[1.9375rem]">
            {getContent('tenders_for_brokers_title')}
          </h1>
          <p className="text-base text-textTheme-secondary max-w-[48rem]">
            {getContent('tenders_for_brokers_subtitle')}
          </p>
          <button
            onClick={() => {
              trackClick('brokers_register', '/broker-questionnaire');
              router.push('/broker-questionnaire');
            }}
            className="btn-primary-lg mt-4 w-fit"
          >
            {getContent('brokers_register_button')}
          </button>
        </div>

        {/* Clients & Earnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="surface-card-p8">
            <h2 className="text-2xl font-semibold text-textTheme-primary mb-4">
              {getContent('brokers_clients_title')}
            </h2>
            <p className="text-textTheme-secondary leading-relaxed">
              {getContent('brokers_clients_text')}
            </p>
          </div>
          <div className="surface-card-p8">
            <h2 className="text-2xl font-semibold text-textTheme-primary mb-4">
              {getContent('brokers_earnings_title')}
            </h2>
            <p className="text-textTheme-secondary leading-relaxed">
              {getContent('brokers_earnings_text')}
            </p>
          </div>
        </div>

        {/* License */}
        <div className="surface-card-p8 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('brokers_license_title')}
          </h2>
          <p className="text-textTheme-secondary leading-relaxed">
            {getContent('brokers_license_text')}
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('brokers_steps_title')}
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="surface-card-p6 flex-1">
                <span className="text-4xl font-bold text-accent-primary">{`0${num}`}</span>
                <p className="text-textTheme-primary mt-2">{getContent(`brokers_step_${num}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {['deals', 'partners', 'cities', 'years'].map((metric) => (
            <div key={metric} className="surface-card-p6">
              <span className="text-3xl font-bold text-accent-primary">
                {getContent(`brokers_metric_${metric}_value`)}
              </span>
              <p className="text-sm text-textTheme-secondary mt-1">
                {getContent(`brokers_metric_${metric}_label`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="surface-card-p8 flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('brokers_cta_title')}
          </h2>
          <button
            onClick={() => {
              trackClick('brokers_cta', '/broker-questionnaire');
              router.push('/broker-questionnaire');
            }}
            className="btn-primary-lg"
          >
            {getContent('brokers_cta_button')}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default TendersForBrokers;
