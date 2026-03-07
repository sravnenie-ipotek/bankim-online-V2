'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { HowItWorksSection } from './components/HowItWorksSection';
import { PartnershipProgramHero } from './components/PartnershipProgramHero';
import { Reward } from './components/Reward';
import { BulletItem } from '@/components/ui/BulletItem';
import { MarketBankimonline } from '@/components/ui/MarketBankimonline';
import { MortgageLoans } from '@/components/ui/MortgageLoans';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { CooperationAbout } from './components/CooperationAbout';
import PartnersSwiper from '@/components/ui/PartnersSwiper/PartnersSwiper';

const Cooperation: React.FC = () => {
  useContentFetch('cooperation');
  const { getContent } = useContentApi('cooperation');
  const { i18n } = useTranslation();
  const direction: 'ltr' | 'rtl' =
    i18n.language?.startsWith('he') || i18n.language === 'iw' ? 'rtl' : 'ltr';

  const bankimTopOffset = 'clamp(29px, 2.847vw, 54px)';

  return (
    <div className="pb-[clamp(96px,6.667vw,127px)]">
      <PartnershipProgramHero getContent={getContent} direction={direction} />
      <div
        className="flex flex-col md:flex-row items-start w-full mt-[clamp(56px,14.36vw,96px)] pt-0 gap-[clamp(16px,2.222vw,32px)] max-md:gap-[clamp(56px,14.36vw,96px)]"
        dir={direction}
      >
        <div className="order-2 shrink-0 max-md:w-full max-md:flex max-md:justify-center" style={{ marginTop: `calc(-1 * ${bankimTopOffset})` }}>
          <MortgageLoans getContent={getContent} direction={direction} />
        </div>
        <div className="order-1 flex-1 flex flex-col gap-[clamp(8px,1.111vw,21px)] max-md:w-full">
          <MarketBankimonline getContent={getContent} direction={direction} />
          <div className="flex flex-row flex-wrap gap-[clamp(12px,2vw,38px)] items-start w-full md:w-[clamp(320px,31.667vw,601px)] min-h-[clamp(40px,4.167vw,79px)]">
            <div className="flex flex-col gap-[clamp(8px,1.111vw,21px)]">
              <BulletItem
                description={getContent('cooperation_bullet_mortgage_calc')}
                direction={direction}
              />
              <BulletItem
                description={getContent('cooperation_bullet_loan_calc')}
                direction={direction}
              />
            </div>
            <div className="flex flex-col gap-[clamp(8px,1.111vw,21px)]">
              <BulletItem
                description={getContent('cooperation_bullet_3')}
                direction={direction}
              />
              <BulletItem
                description={getContent('cooperation_bullet_4')}
                direction={direction}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[clamp(56px,14.36vw,96px)]">
        <Reward getContent={getContent} direction={direction} />
      </div>
      <div className="mt-[clamp(56px,14.36vw,96px)]">
        <HowItWorksSection getContent={getContent} direction={direction} />
      </div>
      <div className="relative w-full min-h-[200px] lg:h-[clamp(266px,18.472vw,351px)] mt-[clamp(56px,14.36vw,96px)] py-[clamp(24px,2vw,0px)] lg:py-0">
        <div
          className="absolute inset-y-0 bg-base-sidebarBg"
          style={{
            left: 'calc(-50vw + 50%)',
            right: 'calc(-50vw + 50%)',
          }}
          aria-hidden
        />
        <div className="relative z-10 w-full h-full flex items-center">
          <PartnersSwiper
            getContent={getContent}
            titleKey="cooperation_partners_title"
            width="100%"
            titleClassName="text-[clamp(22px,2.708vw,51px)]"
          />
        </div>
      </div>
      <div className="mt-[clamp(56px,14.36vw,96px)]">
        <CooperationAbout
          title={getContent('cooperation_about_box_title')}
          buttonLabel={getContent('cooperation_register')}
          buttonLabelMobile={getContent('cooperation_fill_form')}
          buttonHref="/registration"
          direction={direction}
        />
      </div>
    </div>
  );
};

export default Cooperation;
