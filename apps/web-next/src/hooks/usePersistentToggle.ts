'use client';

import { useState, useEffect, useCallback } from 'react';
import { StorageHelper } from '@/helpers/StorageHelper';
import type { ToggleReturn } from './interfaces/ToggleReturn';

/**
 * Boolean state with toggle, on, off, set; persisted to localStorage under key.
 * @param key - localStorage key for persistence.
 * @param defaultValue - Initial value when no saved value exists.
 * @returns { isOn, isOff, toggle, on, off, set }.
 */
export const usePersistentToggle = (key: string, defaultValue: boolean): ToggleReturn => {
  const [isOn, setIsOn] = useState<boolean>(() => {
    const saved = StorageHelper.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    StorageHelper.setItem(key, JSON.stringify(isOn));
  }, [key, isOn]);

  const toggle = useCallback(() => setIsOn((prev) => !prev), []);
  const on = useCallback(() => setIsOn(true), []);
  const off = useCallback(() => setIsOn(false), []);
  const set = useCallback((bool: boolean) => setIsOn(bool), []);

  return { isOn, isOff: !isOn, toggle, on, off, set };
};
