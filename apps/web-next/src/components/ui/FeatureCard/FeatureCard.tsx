'use client';

import React from 'react';
import type { FeatureCardProps } from './interfaces/FeatureCardProps';
import { sizeMap } from './constants/sizeMap';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, text, size = 'default' }) => {
  return (
    <div
      className={`flex flex-col p-[2.4375rem] items-center gap-[1.3125rem] rounded-lg bg-base-secondary ${sizeMap[size] || ''}`}
    >
      <div className="bg-base-base800 rounded-full w-[4.25rem] h-[4.25rem] flex justify-center items-center">
        {icon}
      </div>
      <div className="text-[1.25rem] not-italic font-semibold leading-normal text-textTheme-primary">
        {title}
      </div>
      <div className="text-xs not-italic font-normal leading-normal text-textTheme-secondary">
        {text}
      </div>
    </div>
  );
};

export default FeatureCard;
