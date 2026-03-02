'use client';

import React from 'react';
import type { VacancyCategoryBadgeProps } from './interfaces/VacancyCategoryBadgeProps';

/**
 * Category badge for job cards: 111×35 at 1440, bg #3F444D, radius 20px, yellow bullet + category name.
 * Sizes use clamp for responsiveness.
 */
const VacancyCategoryBadge: React.FC<VacancyCategoryBadgeProps> = ({ categoryLabel }) => {
  return (
    <span
      className="inline-flex items-center justify-center gap-1.5 rounded-[20px] bg-[#3F444D] box-border text-textTheme-secondary text-[clamp(0.75rem,0.9vw,0.875rem)] px-3 py-1.5 min-w-0 max-w-full w-[clamp(80px,7.71vw,111px)] h-[clamp(28px,2.43vw,35px)]"
    >
      <span
        className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#FBE54D]"
        aria-hidden
      />
      <span className="truncate">{categoryLabel}</span>
    </span>
  );
};

export default VacancyCategoryBadge;
