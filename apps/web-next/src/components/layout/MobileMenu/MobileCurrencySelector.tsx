'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { setCurrency } from '@/store/slices/currencySlice'
import CheckIcon from '@/components/icons/CheckIcon'

type Currency = 'ILS' | 'USD' | 'EUR'

interface CurrencyItem {
  value: Currency
  translationKey: string
  symbol: string
}

const CURRENCY_ITEMS: CurrencyItem[] = [
  { value: 'ILS', translationKey: 'currency_ils', symbol: '₪' },
  { value: 'USD', translationKey: 'currency_usd', symbol: '$' },
  { value: 'EUR', translationKey: 'currency_eur', symbol: '€' },
]

const MobileCurrencySelector: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const currencyState = useAppSelector((state) => state.currency)
  const currency = currencyState?.currency || 'ILS'

  const handleCurrencyChange = (newCurrency: Currency) => {
    dispatch(setCurrency(newCurrency))
  }

  return (
    <div className="mb-4">
      <div className="pb-2 text-[14px] font-semibold text-textTheme-secondary">
        {t('select_currency', 'Select Currency')}
      </div>
      <div className="flex flex-col gap-1">
        {CURRENCY_ITEMS.map((item) => (
          <div
            key={item.value}
            className="flex items-center justify-between py-2 px-2 rounded-md cursor-pointer hover:bg-base-secondaryHoveredButton transition-colors"
            onClick={() => handleCurrencyChange(item.value)}
            role="option"
            aria-selected={currency === item.value}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCurrencyChange(item.value)
              }
            }}
          >
            <div className="flex items-center gap-2">
              <div className="text-[24px] font-semibold min-w-[30px] text-center">
                {item.symbol}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[0.875rem] font-normal leading-[140%] text-white">
                  {t(item.translationKey)}
                </span>
                <span className="text-3xs font-normal leading-[140%] text-textTheme-secondary">
                  {item.value}
                </span>
              </div>
            </div>
            {currency === item.value && <CheckIcon size={16} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileCurrencySelector
