'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { CooperationAboutProps } from './interfaces/CooperationAboutProps';

const BG_SRC_LTR = '/static/partnerships/cooperation-about-bg.svg';
const BG_SRC_RTL = '/static/partnerships/cooperation-about-bg-rtl.svg';

const CooperationAbout: React.FC<CooperationAboutProps> = ({
  title,
  buttonLabel,
  buttonLabelMobile,
  buttonHref,
  direction,
}) => {
  const bgSrc = direction === 'rtl' ? BG_SRC_RTL : BG_SRC_LTR;
  const offsetClass = 'md:ms-[clamp(40px,2.778vw,53px)]';

  return (
    <div
      className={`overflow-hidden bg-transparent flex items-center justify-start py-[clamp(1rem,3vw,1.5rem)] relative rounded-[4px] w-full max-w-[clamp(1126px,78.194vw,1486px)] ps-[clamp(1rem,2vw,2rem)] pe-[5%] max-md:flex-col max-md:items-start max-md:justify-center max-md:p-[clamp(32px,8.205vw,84px)] max-md:rounded-[12px] max-md:w-full max-md:max-w-[clamp(350px,89.744vw,919px)] max-md:min-h-[clamp(285px,73.077vw,748px)] max-md:mx-auto max-md:box-border max-md:bg-white md:min-h-[clamp(200px,16.319vw,310px)] ${offsetClass}`}
      dir={direction}
    >
      <Image
        src={bgSrc}
        alt=""
        fill
        className="object-cover pointer-events-none rounded-[inherit]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 min-h-0 self-stretch items-center w-full max-md:flex-col max-md:items-center">
        <div className={`flex flex-1 min-h-0 flex-col gap-[clamp(8px,1.11vw,16px)] w-full pt-0 max-md:gap-[clamp(32px,8.205vw,84px)] max-md:items-start max-md:text-start max-md:w-[clamp(270px,69.231vw,350px)] max-md:min-h-[clamp(167px,42.821vw,219px)] max-md:mx-auto ${direction === 'rtl' ? 'md:pe-[clamp(40px,2.778vw,53px)]' : ''}`}>
          {title && (
            <h2 className="text-[clamp(22px,2.708vw,51px)] max-md:text-[clamp(25px,6.41vw,66px)] max-w-full whitespace-pre-line break-words font-semibold leading-tight text-start text-black">
              {title}
            </h2>
          )}
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center gap-[clamp(6px,0.8vw,12px)] rounded-[clamp(4px,0.4vw,8px)] px-[clamp(16px,2.2vw,24px)] py-[clamp(8px,1.1vw,14px)] font-semibold transition-colors mt-auto bg-white text-black border border-[#333] hover:bg-gray-100 text-[clamp(14px,1.111vw,21px)] w-full max-w-[clamp(240px,20.139vw,383px)] h-[clamp(44px,3.333vw,63px)] max-md:max-w-full max-md:h-[48px] max-md:text-[clamp(19px,4.872vw,50px)]"
          >
            {buttonLabelMobile && (
              <span className="md:hidden">{buttonLabelMobile}</span>
            )}
            <span className={buttonLabelMobile ? 'hidden md:inline' : ''}>{buttonLabel}</span>
            <Image
              src="/static/arrow_triangle.png"
              alt=""
              width={20}
              height={20}
              className={`shrink-0 w-5 h-5 object-contain ms-auto ${direction === 'rtl' ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CooperationAbout;
