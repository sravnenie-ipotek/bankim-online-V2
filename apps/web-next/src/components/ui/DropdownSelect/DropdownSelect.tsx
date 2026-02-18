'use client'

import React, { useState, useMemo, useCallback } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import CaretDownIcon from '@/components/icons/CaretDownIcon'
import CaretUpIcon from '@/components/icons/CaretUpIcon'
import CheckIcon from '@/components/icons/CheckIcon'
import type { DropdownOption } from './interfaces/DropdownOption'

interface DropdownSelectProps {
  data: DropdownOption[]
  title?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  searchable?: boolean
  searchPlaceholder?: string
  nothingFoundText?: string
  error?: boolean | string
  disabled?: boolean
  'data-testid'?: string
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  data,
  title,
  placeholder = 'Select...',
  value,
  onChange,
  onBlur,
  searchable = false,
  searchPlaceholder = 'Search...',
  nothingFoundText = 'Nothing found',
  error,
  disabled = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const wrapperRef = useOutsideClick(() => {
    if (!isOpen) return
    setIsOpen(false)
    setSearchQuery('')
    // Defer to avoid updating Formik (parent) during this component's state update
    if (onBlur) setTimeout(onBlur, 0)
  })

  const selectedOption = data.find((opt) => opt.value === value)

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return data
    const lower = searchQuery.toLowerCase()
    return data.filter((opt) => opt.label.toLowerCase().includes(lower))
  }, [data, searchQuery])

  const handleToggle = useCallback(() => {
    if (disabled) return
    setIsOpen((prev) => {
      if (prev) {
        setSearchQuery('')
        // Defer so Formik is not updated during this setState (avoids "setState in render" error)
        if (onBlur) setTimeout(onBlur, 0)
      }
      return !prev
    })
  }, [disabled, onBlur])

  const handleSelect = useCallback(
    (optValue: string) => {
      onChange(optValue)
      setIsOpen(false)
      setSearchQuery('')
    },
    [onChange],
  )

  const hasError = !!error
  const errorMessage = typeof error === 'string' ? error : null
  const displayLabel = selectedOption?.label || placeholder
  const isPlaceholder = !selectedOption

  const triggerBorderClass = hasError
    ? 'border-red-500'
    : isOpen
      ? 'border-accent-primary'
      : 'border-base-secondaryDefaultButton'

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const optionElements = filteredOptions.map((opt, index) => (
    <div
      key={`${opt.value}-${index}`}
      className={`flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-base-secondaryHoveredButton transition-colors ${
        value === opt.value ? 'bg-base-secondaryHoveredButton' : ''
      }`}
      onClick={() => handleSelect(opt.value)}
      role="option"
      aria-selected={value === opt.value}
    >
      <span className="text-[0.875rem] text-white font-normal">{opt.label}</span>
      {value === opt.value ? <CheckIcon size={16} /> : null}
    </div>
  ))

  return (
    <div ref={wrapperRef} className="flex flex-col gap-1 w-full relative">
      {title ? (
        <label className="text-[0.875rem] not-italic font-normal leading-[140%] text-textTheme-secondary">
          {title}
        </label>
      ) : null}

      <div
        className={`flex items-center justify-between h-14 rounded border bg-base-inputs px-4 cursor-pointer transition-colors ${triggerBorderClass} ${disabledClass}`}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleToggle()
        }}
        data-testid={rest['data-testid']}
      >
        <span className={`text-[1.125rem] font-normal truncate ${isPlaceholder ? 'text-[#848484]' : 'text-white'}`}>
          {displayLabel}
        </span>
        {isOpen ? (
          <CaretUpIcon className="shrink-0 w-5 h-5" />
        ) : (
          <CaretDownIcon className="shrink-0 w-5 h-5" />
        )}
      </div>

      {isOpen ? (
        <div className="absolute top-full left-0 right-0 mt-1 z-[9999] rounded border border-base-secondaryDefaultButton bg-base-secondary shadow-[0px_8px_32px_0px_rgba(0,0,0,0.16)] max-h-[300px] overflow-auto">
          {searchable ? (
            <div className="p-2 border-b border-[#333535]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-base-inputs border border-base-secondaryDefaultButton rounded px-3 py-2 text-white text-sm outline-none placeholder:text-[#848484] focus:border-accent-primary"
                autoFocus
              />
            </div>
          ) : null}

          {filteredOptions.length === 0 ? (
            <div className="py-4 px-4 text-center text-[#848484] text-sm">{nothingFoundText}</div>
          ) : (
            <div role="listbox">{optionElements}</div>
          )}
        </div>
      ) : null}

      {errorMessage ? (
        <span className="text-red-500 text-xs mt-0.5">{errorMessage}</span>
      ) : null}
    </div>
  )
}

export default DropdownSelect
