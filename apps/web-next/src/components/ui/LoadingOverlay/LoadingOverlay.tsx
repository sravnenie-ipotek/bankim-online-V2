'use client';

import React from 'react';
import type { LoadingOverlayProps } from './interfaces/LoadingOverlayProps';

/**
 * Full-screen overlay with a centered spinner. Use for global loading (e.g. content API).
 * @param props.size - Spinner diameter in px. Default 48.
 * @param props.className - Optional extra class names for the overlay.
 */
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ size = 48, className = '' }) => (
  <div
    className={`fixed inset-0 z-modal flex items-center justify-center bg-black/20 ${className}`}
    aria-live="polite"
    aria-busy="true"
    role="progressbar"
  >
    <div
      className="rounded-full border-2 border-white/30 border-t-white animate-spin"
      style={{ width: size, height: size }}
    />
  </div>
);

export default LoadingOverlay;
