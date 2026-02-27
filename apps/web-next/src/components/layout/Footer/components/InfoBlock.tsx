'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import LogoBox from '@/components/ui/LogoBox/LogoBox';
import { SocialDeepLinkHelper } from '@/helpers/SocialDeepLinkHelper';
import { useSocialLink } from '@/hooks/useSocialLink';
import type { SocialPlatformConfig } from '@/helpers/SocialDeepLinkHelper';

const SocialLinkItem: React.FC<{
  config: SocialPlatformConfig;
  getContent: (key: string) => string;
}> = ({ config, getContent }) => {
  const { href, onClick } = useSocialLink(config.platform);
  return (
    <div className="relative group overflow-visible">
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-xs font-normal whitespace-nowrap rounded bg-[#333535] text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 pointer-events-none z-[10002]"
        role="tooltip"
      >
        {getContent(config.tooltipKey)}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className="opacity-70 hover:opacity-100 transition-opacity inline-flex"
      >
        <img alt={config.label} src={config.icon} width={24} height={24} />
      </a>
    </div>
  );
};

const InfoBlock: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const socialPlatforms = SocialDeepLinkHelper.getPlatforms();

  return (
    <div className="flex flex-col gap-4 pr-[3.49719rem] pb-[2.5625rem] ms-0 max-[767px]:items-center md:flex-col md:justify-center md:items-start md:gap-8 md:p-0 md:pr-0 md:pb-0 rtl:items-end rtl:md:items-end">
      <div className="max-[767px]:w-full max-[767px]:flex max-[767px]:justify-center max-[767px]:items-center rtl:w-full rtl:flex rtl:min-[768px]:justify-start">
        <LogoBox
          src="/static/primary-logo05-1.svg"
          alt="BankIM"
          href="/"
          className="xs:!w-[95.13px] xs:!h-[43px] min-[768px]:!w-[91px] min-[768px]:!h-[42px]"
        />
      </div>
      <div className="flex gap-4 flex-wrap rtl:flex-row-reverse rtl:min-[768px]:justify-end rtl:w-full overflow-visible max-[767px]:w-[205.04px] max-[767px]:mx-auto max-[767px]:justify-center">
        {socialPlatforms.map((config) => (
          <SocialLinkItem key={config.platform} config={config} getContent={getContent} />
        ))}
      </div>
    </div>
  );
};

export default InfoBlock;
