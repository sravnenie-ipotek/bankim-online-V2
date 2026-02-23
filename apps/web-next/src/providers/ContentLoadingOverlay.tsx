'use client';

import React from 'react';
import LoadingOverlay from '@/components/ui/LoadingOverlay/LoadingOverlay';
import type { ContentLoadingOverlayProps } from './interfaces/ContentLoadingOverlayProps';

/**
 * Full-screen loading overlay shown when loadingKeys is non-empty.
 */
const ContentLoadingOverlay: React.FC<ContentLoadingOverlayProps> = ({ loadingKeys }) => {
  const isVisible = loadingKeys.size > 0;

  if (!isVisible) return null;

  return <LoadingOverlay size={48} />;
};

export default ContentLoadingOverlay;
