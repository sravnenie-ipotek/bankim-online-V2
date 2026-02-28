'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const ADVANTAGES = [
  'tenders_advantage_1',
  'tenders_advantage_2',
  'tenders_advantage_3',
  'tenders_advantage_4',
];

const STEPS = [
  { num: '01', key: 'tenders_step_1' },
  { num: '02', key: 'tenders_step_2' },
  { num: '03', key: 'tenders_step_3' },
];

const TendersForLawyers: React.FC = () => {
  useContentFetch('tenders_lawyers');
  const { getContent } = useContentApi('tenders_lawyers');
  const router = useRouter();

  const handleRegister = (): void => {
    router.push('/lawyers');
  };

  return (
    <Container>
      <div className="flex flex-col gap-16 w-full my-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-[clamp(1.9375rem,2rem+1vw,3rem)] font-medium text-textTheme-primary">
            {getContent('tenders_for_lawyers_title')}
          </h1>
          <p className="text-base text-textTheme-secondary max-w-[48rem]">
            {getContent('tenders_for_lawyers_subtitle')}
          </p>
          <button onClick={handleRegister} className="btn-primary-lg mt-4 w-fit">
            {getContent('tenders_register_button')}
          </button>
        </div>

        <div className="surface-card-p8 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('tenders_about_title')}
          </h2>
          <p className="text-base text-textTheme-secondary leading-relaxed">
            {getContent('tenders_about_text')}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('tenders_earnings_title')}
          </h2>
          <p className="text-base text-textTheme-secondary leading-relaxed">
            {getContent('tenders_earnings_text')}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('tenders_advantages_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADVANTAGES.map((key) => (
              <div key={key} className="surface-card flex items-start gap-3 p-4">
                <span className="text-accent-primary text-xl">&#10003;</span>
                <span className="text-textTheme-primary">{getContent(key)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('tenders_how_it_works')}
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="surface-card-p6 flex-1 flex flex-col gap-2">
                <span className="text-4xl font-bold text-accent-primary">{step.num}</span>
                <p className="text-textTheme-primary">{getContent(step.key)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card-p8 flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-semibold text-textTheme-primary">
            {getContent('tenders_cta_title')}
          </h2>
          <button onClick={handleRegister} className="btn-primary-lg">
            {getContent('tenders_cta_button')}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default TendersForLawyers;
