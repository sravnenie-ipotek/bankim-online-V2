'use client';

import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/store';

const BODY_FONT_CLASSES = ['font-he', 'font-ru'] as const;

/**
 * Syncs document.body font class with Redux language (Hebrew → Arimo/font-he, Russian/English → Roboto/font-ru).
 * Mount once inside StoreProvider so body uses the correct font per locale.
 */
const BodyFontSync: React.FC = () => {
  const currentFont = useAppSelector((state) => state.language.currentFont);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const { classList } = document.body;
    BODY_FONT_CLASSES.forEach((cls) => classList.remove(cls));
    classList.add(currentFont);
  }, [currentFont]);

  return null;
};

export default BodyFontSync;
