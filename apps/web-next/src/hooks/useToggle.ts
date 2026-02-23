'use client';

import { useState, useCallback } from 'react';
import type { ToggleReturn } from './interfaces/ToggleReturn';

/**
 * Boolean state with toggle, on, off, and set. Non-persistent (resets on unmount).
 * @param start - Initial value.
 * @returns { isOn, isOff, toggle, on, off, set }.
 */
export const useToggle = (start: boolean): ToggleReturn => {
  const [isOn, setIsOn] = useState(start);

  const toggle = useCallback(() => setIsOn((prev) => !prev), []);
  const on = useCallback(() => setIsOn(true), []);
  const off = useCallback(() => setIsOn(false), []);
  const set = useCallback((bool: boolean) => setIsOn(bool), []);

  return { isOn, isOff: !isOn, toggle, on, off, set };
};
