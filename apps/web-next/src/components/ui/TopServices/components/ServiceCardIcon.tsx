'use client';

import React from 'react';
import Image from 'next/image';
import type { ServiceCardIconProps } from '../interfaces/ServiceCardIconProps';

const ServiceCardIcon: React.FC<ServiceCardIconProps> = ({ src }) => (
  <Image src={src} alt="" width={178} height={178} className="w-full h-full object-contain" />
);

export default ServiceCardIcon;
