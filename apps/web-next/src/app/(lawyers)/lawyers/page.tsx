'use client';

import React from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container/Container';

const LawyersPage: React.FC = () => {
  return (
    <Container className="bg-white min-h-screen relative">
      <Image
        src="/static/menu/techRealt.png"
        alt="TechRealt Logo"
        width={160}
        height={33}
        className="object-contain absolute top-[33.34px] [inset-inline-start:33.34px]"
      />
    </Container>
  );
};

export default LawyersPage;
