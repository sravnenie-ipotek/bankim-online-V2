'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/hooks/store'
import type { CalculateMortgageTypes } from '@/interfaces/CalculateMortgageTypes'

interface ParamRowProps {
  label: string
  value: string
}

const ParamRow: React.FC<ParamRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-[#333535] last:border-b-0">
    <span className="text-[0.875rem] text-textTheme-secondary">{label}</span>
    <span className="text-[1rem] text-white font-semibold">{value}</span>
  </div>
)

const UserParams: React.FC = () => {
  const { t } = useTranslation()
  const mortgage = (useAppSelector((state) => state.mortgage) ?? {}) as Partial<CalculateMortgageTypes>

  const formatCurrency = (val: number): string =>
    val ? `${val.toLocaleString('en-US')} ₪` : '—'

  return (
    <div className="bg-base-secondary rounded-lg p-6">
      <h3 className="text-[1.25rem] font-semibold text-textTheme-primary mb-4">
        {t('calculate_mortgage_parameters', 'Mortgage Parameters')}
      </h3>
      <ParamRow
        label={t('calculate_mortgage_parameters_cost', 'Property Value')}
        value={formatCurrency(mortgage.priceOfEstate ?? 0)}
      />
      <ParamRow
        label={t('calculate_mortgage_parameters_initial', 'Initial Payment')}
        value={formatCurrency(mortgage.initialFee ?? 0)}
      />
      <ParamRow
        label={t('calculate_mortgage_parameters_period', 'Period')}
        value={mortgage.period ? `${mortgage.period} ${t('calculate_mortgage_parameters_months', 'years')}` : '—'}
      />
      <ParamRow
        label={t('mortgage_monthly', 'Monthly Payment')}
        value={formatCurrency(mortgage.monthlyPayment ?? 0)}
      />
      <ParamRow
        label={t('mortgage_total', 'Total Mortgage')}
        value={formatCurrency((mortgage.priceOfEstate ?? 0) - (mortgage.initialFee ?? 0))}
      />
    </div>
  )
}

export default UserParams
