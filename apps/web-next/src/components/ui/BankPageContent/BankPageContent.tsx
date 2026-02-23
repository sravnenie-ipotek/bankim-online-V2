'use client';

import React from 'react';

import Container from '@/components/ui/Container/Container';
import type { BankPageContentProps } from './interfaces/BankPageContentProps';

const BankPageContent: React.FC<BankPageContentProps> = ({ title, description }) => (
  <Container>
    <div className="py-8">
      <h1 className="text-3xl font-medium text-textTheme-primary">{title}</h1>
      <p className="text-textTheme-secondary mt-4">{description}</p>
    </div>
  </Container>
);

export default BankPageContent;
