'use client';

import React from 'react';

import type { MarketBankimonlineProps } from './interfaces/MarketBankimonlineProps';

const CONTENT_KEY_TITLE = 'cooperation_market_bankimonline_title';
const CONTENT_KEY_DESCRIPTION = 'cooperation_market_bankimonline_description';

/** 16px at 1440 → 21px at 1900 (1.111vw). */
const DESCRIPTION_SIZE = 'text-[clamp(12px,1.111vw,21px)]';

/** Description block: 525×44px at 1440 → 693×58px at 1900 (36.458vw × 3.056vw). */
const DESCRIPTION_BLOCK_WIDTH = 'w-[clamp(280px,36.458vw,693px)]';
const DESCRIPTION_BLOCK_HEIGHT = 'min-h-[clamp(30px,3.056vw,58px)]';

const MarketBankimonline: React.FC<MarketBankimonlineProps> = ({
  getContent,
  direction,
  className = '',
}) => {
  const title = getContent(CONTENT_KEY_TITLE);
  const description = getContent(CONTENT_KEY_DESCRIPTION);

  if (!title) return null;

  return (
    <section
      dir={direction}
      className={`w-full ${className}`.trim()}
      aria-labelledby="market-bankimonline-title"
    >
      <h2
        id="market-bankimonline-title"
        className="text-[clamp(18px,2vw,32px)] font-medium text-white leading-tight"
      >
        {title}
      </h2>
      {description && (
        <p className={`${DESCRIPTION_BLOCK_WIDTH} ${DESCRIPTION_BLOCK_HEIGHT} ${DESCRIPTION_SIZE} text-white mt-2 leading-relaxed`}>
          {description}
        </p>
      )}
    </section>
  );
};

export default MarketBankimonline;
