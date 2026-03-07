'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import LogoBox from '@/components/ui/LogoBox/LogoBox';
import { SocialTitleLinks } from '@/components/ui/SocialTitleLinks';

const InfoBlock: React.FC = () => {
  const { getContent } = useContentApi('global_components');

  return (
    <div className="flex flex-col gap-2 md:gap-3 w-full h-full min-w-0 min-h-0 max-w-full max-h-full max-[767px]:pr-0 max-[767px]:pb-4 pr-[3.49719rem] pb-[2.5625rem] ms-0 items-start rtl:items-end max-[767px]:items-center md:p-0 md:pr-0 md:pb-0">
      <div className="w-full flex justify-start max-[767px]:justify-center min-w-0 shrink-0">
        <LogoBox
          src="/static/primary-logo05-1.svg"
          alt="BankIM"
          href="/"
          className="xs:!w-[95.13px] xs:!h-[43px] min-[768px]:!w-[clamp(91px,6.32vw,120px)] min-[768px]:!h-[clamp(42px,2.92vw,55.5px)] max-w-full"
        />
      </div>
      <SocialTitleLinks
        getContent={getContent}
        showTitle={false}
        iconWidth={24}
        iconHeight={24}
        className="w-full min-w-0 max-w-full items-start rtl:items-end max-[767px]:w-full max-[767px]:items-center max-[767px]:justify-center"
      />
    </div>
  );
};

export default InfoBlock;
