'use client'

import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useContentApi } from '@hooks/useContentApi'
import { setCurrency } from '@/store/slices/currencySlice'
import useOutsideClick from '@/hooks/useOutsideClick'
import CaretDownIcon from '@/components/icons/CaretDownIcon'
import CaretUpIcon from '@/components/icons/CaretUpIcon'
import CheckIcon from '@/components/icons/CheckIcon'
import type { Currency, CurrencyOption } from './interfaces/CurrencyOption'

const CURRENCY_OPTIONS: CurrencyOption[] = [
  { value: 'ILS', translationKey: 'currency_ils', symbol: '₪' },
  { value: 'USD', translationKey: 'currency_usd', symbol: '$' },
  { value: 'EUR', translationKey: 'currency_eur', symbol: '€' },
]

const CurrencySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { getContent } = useContentApi('global_components')
  const dispatch = useAppDispatch()
  const currencyState = useAppSelector((state) => state.currency)
  const currency = currencyState?.currency || 'ILS'

  const wrapperRef = useOutsideClick(() => setIsOpen(false))

  const selectedOption =
    CURRENCY_OPTIONS.find((opt) => opt.value === currency) ||
    CURRENCY_OPTIONS[0]

  const handleCurrencyChange = (newCurrency: Currency) => {
    dispatch(setCurrency(newCurrency))
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative min-w-[120px]">
      {/* Trigger */}
      <div
        className="flex items-center justify-center rounded border border-[rgb(51,53,53)] bg-[#161616] text-white text-[18px] text-center h-[56px] min-w-[120px] px-4 cursor-pointer select-none gap-2"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen)
          }
        }}
      >
        <span>{getContent(selectedOption.translationKey)}</span>
        {isOpen ? (
          <CaretUpIcon className="shrink-0 w-4 h-4" />
        ) : (
          <CaretDownIcon className="shrink-0 w-4 h-4" />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-1 z-[9999] rounded border-none p-0 flex flex-col max-h-[300px] overflow-auto bg-[#2a2b30] shadow-none min-w-full">
          {CURRENCY_OPTIONS.map((item) => (
            <div
              key={item.value}
              className={`flex items-center justify-between text-[#f2f2f2] border-b border-transparent py-[0.9rem] px-4 text-center cursor-pointer hover:bg-[rgb(58,59,62)] transition-colors ${
                currency === item.value ? 'font-bold text-white' : 'font-normal'
              }`}
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
              <span>{getContent(item.translationKey)}</span>
              {currency === item.value && <CheckIcon size={16} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CurrencySelector

