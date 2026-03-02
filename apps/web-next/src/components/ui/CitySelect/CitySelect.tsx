'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  fetchCities,
  selectReferenceEntry,
  selectReferenceLoading,
} from '@/store/slices/referenceSlice';
import type { CitySelectProps } from './interfaces/CitySelectProps';

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onChange,
  id,
  name = 'city',
  placeholder = '',
  required = false,
  disabled = false,
  className = 'input-base',
  'aria-label': ariaLabel,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const dispatch = useAppDispatch();
  const citiesEntry = useAppSelector(selectReferenceEntry('cities', lang));
  const citiesLoading = useAppSelector(selectReferenceLoading('cities', lang));
  const cities = citiesEntry?.data ?? [];

  useEffect(() => {
    dispatch(fetchCities(lang));
  }, [dispatch, lang]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(e.target.value);
  };

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      required={required}
      disabled={disabled || citiesLoading}
      className={className}
      aria-label={ariaLabel}
    >
      <option value="">{placeholder}</option>
      {cities.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  );
};

export default CitySelect;
