'use client';

import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import type { DropdownOption } from '@/components/ui/DropdownSelect/interfaces/DropdownOption';
import type { DropdownData } from './interfaces/DropdownData';
import type { DropdownEntry } from '@/store/slices/dropdownSlice';
import {
  fetchDropdowns,
  selectDropdownEntry,
  selectDropdownLoading,
} from '@/store/slices/dropdownSlice';

function deriveDropdownData(
  entry: DropdownEntry | undefined,
  fieldName: string,
  screenLocation: string,
  loading: boolean
): DropdownData {
  const dropdownKey = `${screenLocation}_${fieldName}`;
  const options: DropdownOption[] =
    entry?.data?.options?.[dropdownKey] ?? [];
  const placeholder =
    entry?.data?.placeholders?.[`${dropdownKey}_ph`] ??
    entry?.data?.placeholders?.[dropdownKey];
  const label =
    entry?.data?.labels?.[`${dropdownKey}_label`] ??
    entry?.data?.labels?.[dropdownKey];
  const error = entry?.error
    ? new Error(entry.error)
    : null;
  return {
    options,
    placeholder,
    label,
    loading,
    error,
  };
}

/**
 * Fetches dropdown options (and optional placeholder/label) from the dropdown API via RTK.
 * Dispatches fetchDropdowns thunk and reads from dropdown slice.
 * @param screenLocation - API screen location (e.g. 'broker-questionnaire').
 * @param fieldName - Field key in the API response (e.g. 'cities').
 * @param returnStructure - 'options' returns only DropdownOption[]; 'full' returns DropdownData. Default 'options'.
 * @returns Options array or full { options, placeholder, label, loading, error } per returnStructure.
 */
export const useDropdownData = (
  screenLocation: string,
  fieldName: string,
  returnStructure: 'options' | 'full' = 'options'
): DropdownData | DropdownOption[] => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language = i18n.language || 'en';
  const entry = useAppSelector(selectDropdownEntry(screenLocation, language));
  const loading = useAppSelector(
    selectDropdownLoading(screenLocation, language)
  );

  const finalData = useMemo(
    () => deriveDropdownData(entry, fieldName, screenLocation, loading),
    [entry, fieldName, screenLocation, loading]
  );

  useEffect(() => {
    if (entry?.data) return;
    dispatch(fetchDropdowns({ screenLocation, language }));
  }, [screenLocation, language, dispatch, entry?.data]);

  if (returnStructure === 'options' && !loading && !finalData.error) {
    return finalData.options;
  }
  return finalData;
};

export default useDropdownData;
