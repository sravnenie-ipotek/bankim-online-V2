'use client';

import React from 'react';
import Link from 'next/link';

import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import type { PersonalCabinetSectionProps } from './interfaces/PersonalCabinetSectionProps';

const PersonalCabinetSection: React.FC<PersonalCabinetSectionProps> = ({
  titleKey,
  descriptionKey,
}) => {
  const { getContent } = useContentApi('common');

  return (
    <Container>
      <div className="page-stack">
        <div className="flex items-center gap-4">
          <Link href="/personal-cabinet" className="text-accent-primary hover:underline">
            {getContent('personal_cabinet_title')}
          </Link>
          <span className="text-textTheme-secondary">/</span>
          <span className="text-textTheme-primary">{getContent(titleKey)}</span>
        </div>

        <h1 className="text-3xl font-medium text-textTheme-primary">{getContent(titleKey)}</h1>

        <div className="surface-card-p8">
          <p className="text-textTheme-secondary">{getContent(descriptionKey)}</p>
        </div>
      </div>
    </Container>
  );
};

export default PersonalCabinetSection;
