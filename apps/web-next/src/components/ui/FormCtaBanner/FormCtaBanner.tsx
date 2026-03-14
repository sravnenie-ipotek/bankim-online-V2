'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/ui/Container/Container';
import type { FormCtaBannerProps } from './interfaces/FormCtaBannerProps';

const BG_SRC_LTR = '/static/partnerships/cooperation-about-bg.svg';
const BG_SRC_RTL = '/static/partnerships/cooperation-about-bg-rtl.svg';

const FormCtaBanner: React.FC<FormCtaBannerProps> = ({
  title,
  buttonLabel,
  buttonLabelMobile,
  buttonHref,
  direction,
  onButtonClick,
  titleClassName,
  className = '',
  innerContentClassName = '',
  showBackgroundImage = true,
  backgroundImageSrc,
  backgroundImageSrcRtl,
  backgroundClassName = 'bg-techrealt-containers',
  buttonClassName = '',
  buttonBorderClassName = '',
  alignToLayout = false,
  inputPlaceholder,
  inputName = 'cta-input',
  selectOptions,
  selectPlaceholder,
  selectName = 'cta-select',
  containerClassName = '',
}) => {
  const bgSrc =
    (direction === 'rtl' ? backgroundImageSrcRtl ?? backgroundImageSrc : backgroundImageSrc) ??
    (direction === 'rtl' ? BG_SRC_RTL : BG_SRC_LTR);
  const offsetClass = alignToLayout ? 'ms-0' : 'md:ms-[clamp(40px,2.778vw,53px)]';
  const wrapperBgClass = showBackgroundImage
    ? 'bg-transparent max-md:bg-white'
    : backgroundClassName;
  const widthAndPaddingClass = alignToLayout
    ? 'max-w-full ps-0 pe-0'
    : 'max-w-[clamp(1126px,78.194vw,1486px)] ps-[clamp(1rem,2vw,2rem)] pe-[5%]';

  return (
    <div
      className={`overflow-hidden flex items-center justify-start py-[clamp(1rem,3vw,1.5rem)] relative rounded-[4px] w-full ${widthAndPaddingClass} max-md:flex-col max-md:items-start max-md:justify-center max-md:p-[clamp(32px,8.205vw,84px)] max-md:rounded-[12px] max-md:w-full max-md:max-w-[clamp(350px,89.744vw,919px)] max-md:min-h-[clamp(285px,73.077vw,748px)] max-md:mx-auto max-md:box-border md:min-h-[clamp(200px,16.319vw,310px)] ${wrapperBgClass} ${offsetClass} ${className}`.trim()}
      dir={direction}
      role="region"
      aria-label="Call to action"
    >
      {showBackgroundImage && (
        <Image
          src={bgSrc}
          alt=""
          fill
          className="object-cover pointer-events-none rounded-[inherit]"
          aria-hidden
        />
      )}

      <div className="relative z-10 flex flex-1 min-h-0 self-stretch items-center w-full gap-[clamp(4px,0.694vw,10px)] max-md:flex-col max-md:items-center">
        <Container className={`flex flex-col gap-[clamp(16px,2.222vw,32px)] w-[clamp(280px,72.639vw,1046px)] min-h-[clamp(120px,11.944vw,172px)] ms-[10px] me-auto pt-0 max-md:ms-auto max-md:me-auto max-md:gap-[clamp(32px,8.205vw,84px)] max-md:items-start max-md:text-start max-md:w-[clamp(270px,69.231vw,350px)] max-md:min-h-[clamp(167px,42.821vw,219px)] ${direction === 'rtl' ? 'md:pe-[clamp(40px,2.778vw,53px)]' : ''} ${innerContentClassName} ${containerClassName}`.trim()}>
          {title && (
            <h2 className={`max-w-full whitespace-pre-line break-words font-semibold leading-tight text-start text-techrealt-titleText shrink-0 ${titleClassName ?? 'text-[clamp(22px,2.708vw,51px)] max-md:text-[clamp(25px,6.41vw,66px)]'}`.trim()}>
              {title}
            </h2>
          )}
          {(inputPlaceholder != null || (selectOptions != null && selectOptions.length > 0)) && (
            <div className="flex flex-col gap-[clamp(8px,1.11vw,16px)] w-full shrink-0">
              {inputPlaceholder != null && (
                <input
                  type="text"
                  name={inputName}
                  placeholder={inputPlaceholder}
                  className="w-full rounded-[clamp(4px,0.4vw,8px)] border border-techrealt-buttonBorder bg-white px-[clamp(12px,1.5vw,20px)] py-[clamp(10px,1.2vw,14px)] text-form text-techrealt-titleText placeholder:text-techrealt-descriptionText focus:outline-none focus:ring-2 focus:ring-techrealt-red/50"
                  aria-label={inputPlaceholder}
                />
              )}
              {selectOptions != null && selectOptions.length > 0 && (
                <select
                  name={selectName}
                  className="w-full rounded-[clamp(4px,0.4vw,8px)] border border-techrealt-buttonBorder bg-white px-[clamp(12px,1.5vw,20px)] py-[clamp(10px,1.2vw,14px)] text-form text-techrealt-titleText focus:outline-none focus:ring-2 focus:ring-techrealt-red/50"
                  aria-label={selectPlaceholder ?? 'Select option'}
                >
                  {selectPlaceholder != null && (
                    <option value="">{selectPlaceholder}</option>
                  )}
                  {selectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
          <Link
            href={buttonHref}
            onClick={onButtonClick}
            className={`inline-flex items-center justify-center gap-[clamp(6px,0.8vw,12px)] rounded-[clamp(4px,0.4vw,8px)] px-[clamp(16px,2.2vw,24px)] py-[clamp(8px,1.1vw,14px)] font-semibold transition-colors mt-auto shrink-0 bg-techrealt-containers hover:bg-techrealt-containers/90 text-techrealt-titleText text-form w-full max-w-[clamp(240px,20.139vw,383px)] h-[clamp(44px,3.333vw,63px)] max-md:w-full max-md:max-w-full max-md:h-[48px] ${buttonBorderClassName} ${buttonClassName}`.trim()}
          >
            {buttonLabelMobile != null && buttonLabelMobile !== '' && (
              <span className="md:hidden">{buttonLabelMobile}</span>
            )}
            <span className={buttonLabelMobile != null && buttonLabelMobile !== '' ? 'hidden md:inline' : ''}>{buttonLabel}</span>
            <Image
              src="/static/arrow_triangle.png"
              alt=""
              width={20}
              height={20}
              className={`shrink-0 w-5 h-5 object-contain ms-auto ${direction === 'rtl' ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default FormCtaBanner;
