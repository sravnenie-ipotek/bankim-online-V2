'use client';

import React, { useState } from 'react';
import VideoPoster from '@/components/ui/VideoPoster/VideoPoster';
import TopServices from '@/components/ui/TopServices/TopServices';
import PartnersSwiper from '@/components/ui/PartnersSwiper/PartnersSwiper';
import HowItWorks from '@/components/ui/HowItWorks/HowItWorks';
import CookiePolicyModal from '@/components/ui/CookiePolicyModal/CookiePolicyModal';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const Home: React.FC = () => {
  useContentFetch('home_page');
  const { getContent } = useContentApi('home_page');
  const [isCookiePolicyModalOpen, setIsCookiePolicyModalOpen] = useState(false);

  return (
    <>
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

      <CookiePolicyModal
        isOpen={isCookiePolicyModalOpen}
        onClose={() => setIsCookiePolicyModalOpen(false)}
      />
    </>
  );
};

export default Home;
