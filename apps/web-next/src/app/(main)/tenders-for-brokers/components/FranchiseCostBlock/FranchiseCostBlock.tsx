'use client';

import React from 'react';
import Image from 'next/image';

import type { FranchiseCostBlockProps } from './interfaces/FranchiseCostBlockProps';

const YELLOW_DOT_SRC = '/static/partnerships/yellow-dot.svg';

const METRICS: { labelKey: string; valueKey: string }[] = [
  { labelKey: 'tenders_franchise_investment_label', valueKey: 'tenders_franchise_investment_value' },
  { labelKey: 'tenders_franchise_income_label', valueKey: 'tenders_franchise_income_value' },
  { labelKey: 'tenders_franchise_payback_label', valueKey: 'tenders_franchise_payback_value' },
];

const FranchiseCostBlock: React.FC<FranchiseCostBlockProps> = ({
  getContent,
  direction,
  onButtonClick,
  className = '',
}) => {
  return (
    <div
      dir={direction}
      className={`w-full min-w-0 ${className}`.trim()}
    >
      <div className="flex flex-col md:flex-row items-start md:items-stretch gap-[clamp(16px,4.167vw,60px)] md:gap-0 w-full">
        <div className="flex flex-col items-start justify-center min-w-0 w-full order-1 md:flex-1 md:min-w-0 md:px-[clamp(16px,2.083vw,30px)]">
          <h3 className="text-tenders-brokers-title font-semibold text-white text-start leading-tight whitespace-pre-line">
            {getContent('tenders_franchise_cost_title')}
          </h3>
        </div>

        <div className="flex flex-col items-start justify-center min-w-0 w-full order-2 md:flex-none md:w-[clamp(280px,37.153vw,535px)] md:min-h-[clamp(260px,36.319vw,523px)] md:h-[clamp(260px,36.319vw,523px)]">
          <div className="bg-base-sidebarBg rounded-[clamp(8px,1.111vw,16px)] px-[clamp(16px,2.083vw,30px)] py-[clamp(14px,1.667vw,24px)] w-full h-full flex flex-col gap-[clamp(12px,1.389vw,20px)]">
            {METRICS.map(({ labelKey, valueKey }) => (
              <div key={labelKey} className="flex flex-col gap-[clamp(2px,0.278vw,4px)]">
                <span className="text-tenders-brokers-bullets font-medium text-accent-cooperationHighlight">
                  {getContent(labelKey)}
                </span>
                <span className="text-[clamp(20px,2.431vw,46px)] font-bold text-white leading-tight">
                  {getContent(valueKey)}
                </span>
              </div>
            ))}

            <div className="flex flex-row items-start gap-[clamp(8px,1.111vw,16px)] mt-[clamp(4px,0.556vw,8px)]">
              <Image
                src={YELLOW_DOT_SRC}
                alt=""
                width={20}
                height={20}
                className="w-[clamp(16px,1.389vw,24px)] h-[clamp(16px,1.389vw,24px)] shrink-0 mt-[2px]"
                aria-hidden
              />
              <p className="text-tenders-brokers-description text-[#D0D0D0] leading-relaxed">
                {getContent('tenders_franchise_note')}
              </p>
            </div>

            <button
              type="button"
              onClick={onButtonClick}
              className="bg-white hover:bg-gray-100 text-black font-semibold rounded-[clamp(4px,0.556vw,10px)] px-[clamp(20px,2.778vw,40px)] py-[clamp(10px,1.111vw,16px)] text-tenders-brokers-description transition-colors whitespace-nowrap self-start mt-[clamp(4px,0.556vw,8px)]"
            >
              {getContent('tenders_franchise_button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseCostBlock;
