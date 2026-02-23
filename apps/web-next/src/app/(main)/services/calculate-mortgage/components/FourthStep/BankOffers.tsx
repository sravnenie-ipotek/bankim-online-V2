'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useContentApi } from '@hooks/useContentApi';
import type { BankOffer } from './interfaces/BankOffer';
import type { BankOffersProps } from './interfaces/BankOffersProps';

// Placeholder bank offers until API integration
const SAMPLE_OFFERS: BankOffer[] = [
  {
    id: 'leumi',
    bankName: 'Bank Leumi',
    logo: '/static/bankleumilogo-1.svg',
    interestRate: '3.5%',
    monthlyPayment: '4,250 ₪',
    totalReturn: '1,530,000 ₪',
  },
  {
    id: 'discount',
    bankName: 'Discount Bank',
    logo: '/static/discountbank.svg',
    interestRate: '3.7%',
    monthlyPayment: '4,380 ₪',
    totalReturn: '1,576,800 ₪',
  },
  {
    id: 'hapoalim',
    bankName: 'Bank Hapoalim',
    logo: '/static/bankhapoalimlogo-1.svg',
    interestRate: '3.4%',
    monthlyPayment: '4,200 ₪',
    totalReturn: '1,512,000 ₪',
  },
  {
    id: 'mizrahi',
    bankName: 'Mizrahi Tefahot',
    logo: '/static/mizrahitefahotlogo-1.svg',
    interestRate: '3.6%',
    monthlyPayment: '4,310 ₪',
    totalReturn: '1,551,600 ₪',
  },
];

const BankOffers: React.FC<BankOffersProps> = ({ selectedBank, onSelect }) => {
  const { getContent } = useContentApi('mortgage_step4');
  const [filter, setFilter] = useState<string>('all');

  const filterOptions = [
    { value: 'all', label: getContent('calculate_mortgage_filter_1') },
    { value: 'lowest_rate', label: getContent('calculate_mortgage_filter_2') },
    { value: 'lowest_payment', label: getContent('calculate_mortgage_filter_3') },
    { value: 'lowest_total', label: getContent('calculate_mortgage_filter_4') },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[1.25rem] font-semibold text-textTheme-primary">
        {getContent('mortgage_select_bank')}
      </h3>

      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === opt.value
                ? 'bg-accent-primary text-[#161616]'
                : 'bg-base-secondary text-textTheme-secondary border border-[#333535] hover:bg-base-secondaryHoveredButton'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Bank offer cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SAMPLE_OFFERS.map((offer) => (
          <div
            key={offer.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(offer.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(offer.id);
              }
            }}
            aria-label={`Select ${offer.bankName}, bid ${offer.interestRate}`}
            className={`flex flex-col gap-3 p-5 rounded-lg border-2 cursor-pointer transition-colors ${
              selectedBank === offer.id
                ? 'border-accent-primary bg-base-secondary'
                : 'border-[#333535] bg-base-secondary hover:border-[#555]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={offer.logo}
                alt={offer.bankName}
                width={40}
                height={40}
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <span className="text-[1rem] font-semibold text-white">{offer.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-textTheme-secondary text-sm">{getContent('bid')}</span>
              <span className="text-white font-medium">{offer.interestRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-textTheme-secondary text-sm">
                {getContent('mortgage_monthly')}
              </span>
              <span className="text-white font-medium">{offer.monthlyPayment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-textTheme-secondary text-sm">
                {getContent('mortgage_total_return')}
              </span>
              <span className="text-white font-medium">{offer.totalReturn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankOffers;
