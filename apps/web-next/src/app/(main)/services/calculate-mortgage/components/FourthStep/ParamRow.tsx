'use client';

import React from 'react';
import type { ParamRowProps } from './interfaces/ParamRowProps';

const ParamRow: React.FC<ParamRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-[#333535] last:border-b-0">
    <span className="text-[clamp(0.75rem,0.85rem+0.15vw,0.875rem)] text-textTheme-secondary">{label}</span>
    <span className="text-[clamp(0.875rem,0.9rem+0.2vw,1rem)] text-white font-semibold">{value}</span>
  </div>
);

export default ParamRow;
