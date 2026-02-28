'use client';

import React from 'react';
import Image from 'next/image';
import type { ServiceCardIconProps } from '../interfaces/ServiceCardIconProps';

const ServiceCardIcon: React.FC<ServiceCardIconProps> = ({ src, loading }) => (
  <Image
    src={src}
    alt=""
    width={178}
    height={178}
    loading={loading}
    className="w-full h-full object-contain"
    style={{ width: 'auto', height: 'auto' }}
  />
);

export default ServiceCardIcon;
