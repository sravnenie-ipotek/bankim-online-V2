'use client';

import React from 'react';
import Link from 'next/link';
import type { VacancyApplicationSuccessCardProps } from './interfaces/VacancyApplicationSuccessCardProps';

/**
 * Success card shown after vacancy application submit.
 * 601×322 at 1440 (height > 321). At xl: height scaled to 1900 ≈ 425px.
 * Icon: 80×80 at 1440, scaled to 1900 ≈ 106px via clamp(48px, 5.56vw, 106px).
 */
const VacancyApplicationSuccessCard: React.FC<VacancyApplicationSuccessCardProps> = ({
  title,
  message,
  homeButtonLabel,
}) => {
  return (
    <div
      className="w-[clamp(320px,41.74vw,601px)] xl:w-[601px] min-h-[clamp(180px,22.36vw,322px)] xl:h-[425px] aspect-[601/322] xl:aspect-auto rounded-lg bg-base-successCard flex items-center justify-center p-[5%] box-border shrink-0"
    >
      <div className="flex flex-col items-center justify-center gap-[clamp(0.5rem,2.5vw,1.5rem)] w-[89.37%] max-w-[538px] min-h-0">
        <div className="shrink-0 w-[clamp(48px,5.56vw,106px)] h-[clamp(48px,5.56vw,106px)] flex items-center justify-center">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-hidden
          >
            <path
              d="M40 7.5C33.5721 7.5 27.2886 9.40609 21.944 12.9772C16.5994 16.5484 12.4338 21.6242 9.97393 27.5628C7.51408 33.5014 6.87047 40.0361 8.12449 46.3404C9.37851 52.6448 12.4738 58.4358 17.019 62.981C21.5643 67.5262 27.3552 70.6215 33.6596 71.8755C39.964 73.1295 46.4986 72.4859 52.4372 70.0261C58.3758 67.5662 63.4516 63.4006 67.0228 58.056C70.5939 52.7114 72.5 46.4279 72.5 40C72.4909 31.3833 69.0639 23.122 62.9709 17.0291C56.878 10.9361 48.6168 7.5091 40 7.5ZM54.2688 34.2688L36.7688 51.7688C36.5366 52.0012 36.2609 52.1856 35.9574 52.3114C35.6539 52.4372 35.3286 52.502 35 52.502C34.6715 52.502 34.3462 52.4372 34.0427 52.3114C33.7392 52.1856 33.4634 52.0012 33.2313 51.7688L25.7313 44.2688C25.2622 43.7996 24.9986 43.1634 24.9986 42.5C24.9986 41.8366 25.2622 41.2004 25.7313 40.7312C26.2004 40.2621 26.8366 39.9986 27.5 39.9986C28.1634 39.9986 28.7997 40.2621 29.2688 40.7312L35 46.4656L50.7313 30.7312C50.9635 30.499 51.2393 30.3147 51.5428 30.189C51.8463 30.0633 52.1715 29.9986 52.5 29.9986C52.8285 29.9986 53.1538 30.0633 53.4573 30.189C53.7607 30.3147 54.0365 30.499 54.2688 30.7312C54.501 30.9635 54.6853 31.2393 54.811 31.5428C54.9367 31.8462 55.0014 32.1715 55.0014 32.5C55.0014 32.8285 54.9367 33.1538 54.811 33.4572C54.6853 33.7607 54.501 34.0365 54.2688 34.2688Z"
              fill="#FBE54D"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center justify-center text-center min-w-0">
          <h3 className="text-xl font-semibold text-textTheme-primary mb-1">{title}</h3>
          <p className="text-textTheme-secondary text-sm leading-relaxed">{message}</p>
        </div>
        <Link
          href="/"
          className="w-[38.43vw] max-w-[538px] h-12 flex items-center justify-center rounded-lg font-semibold transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton mt-1 text-[clamp(0.875rem,1.05vw,1.25rem)]"
          style={{ minHeight: '48px' }}
        >
          {homeButtonLabel}
        </Link>
      </div>
    </div>
  );
};

export default VacancyApplicationSuccessCard;
