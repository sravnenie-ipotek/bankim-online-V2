'use client';

import React, { useState } from 'react';
import VideoPoster from '@/components/ui/VideoPoster/VideoPoster';
import TopServices from '@/components/ui/TopServices/TopServices';
import PartnersSwiper from '@/components/ui/PartnersSwiper/PartnersSwiper';
import HowItWorks from '@/components/ui/HowItWorks/HowItWorks';
import CookiePolicyModal from '@/components/ui/CookiePolicyModal/CookiePolicyModal';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const Home: React.FC = () => {
  useContentFetch('home_page');
  const { getContent } = useContentApi('home_page');
  const [isCookiePolicyModalOpen, setIsCookiePolicyModalOpen] = useState(false);

  return (
    <>
      <Container className="max-[1240px]:px-0 max-[890px]:!pb-4">
        <section className="w-full" aria-label="Video">
          <VideoPoster
            title={getContent('title_compare')}
            subtitle={getContent('compare_in_5minutes')}
            text={getContent('show_offers')}
          />
        </section>
        <div className="w-full flex flex-col gap-[56px]">
          <TopServices />

          <PartnersSwiper />

          <HowItWorks />
        </div>
      </Container>

      <CookiePolicyModal
        isOpen={isCookiePolicyModalOpen}
        onClose={() => setIsCookiePolicyModalOpen(false)}
      />
    </>
  );
};

export default Home;
