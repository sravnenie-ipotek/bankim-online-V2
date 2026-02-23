'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useAppSelector } from '@/hooks/store';
import type { CalculateMortgageTypes } from '@/interfaces/CalculateMortgageTypes';
import ParamRow from './ParamRow';

const UserParams: React.FC = () => {
  const { getContent } = useContentApi('mortgage_step4');
  const mortgage = (useAppSelector((state) => state.mortgage) ??
    {}) as Partial<CalculateMortgageTypes>;

  const formatCurrency = (val: number): string => (val ? `${val.toLocaleString('en-US')} ₪` : '—');

  return (
    <div className="surface-card-p6">
      <h3 className="text-[1.25rem] font-semibold text-textTheme-primary mb-4">
        {getContent('calculate_mortgage_parameters')}
      </h3>
      <ParamRow
        label={getContent('calculate_mortgage_parameters_cost')}
        value={formatCurrency(mortgage.priceOfEstate ?? 0)}
      />
      <ParamRow
        label={getContent('calculate_mortgage_parameters_initial')}
        value={formatCurrency(mortgage.initialFee ?? 0)}
      />
      <ParamRow
        label={getContent('calculate_mortgage_parameters_period')}
        value={
          mortgage.period
            ? `${mortgage.period} ${getContent('calculate_mortgage_parameters_months')}`
            : '—'
        }
      />
      <ParamRow
        label={getContent('mortgage_monthly')}
        value={formatCurrency(mortgage.monthlyPayment ?? 0)}
      />
      <ParamRow
        label={getContent('mortgage_total')}
        value={formatCurrency((mortgage.priceOfEstate ?? 0) - (mortgage.initialFee ?? 0))}
      />
    </div>
  );
};

export default UserParams;
