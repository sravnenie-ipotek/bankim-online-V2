'use client';

import { useState, useEffect } from 'react';

const BREAKPOINTS = {
  small: 768,
  large: 1240,
} as const;

/**
 * Next-compatible window resize hook.
 * Uses local state instead of Redux windowSize slice.
 */
export const useWindowResize = () => {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.large + 1
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = width + 1 > BREAKPOINTS.large;
  const isTablet = width <= BREAKPOINTS.large && width > BREAKPOINTS.small;
  const isMobile = width <= BREAKPOINTS.small;

  return { isDesktop, isTablet, isMobile, width };
};
