'use client';

import React from 'react';
import type { SignOutIconProps } from './interfaces/SignOutIconProps';

const SignOutIcon: React.FC<SignOutIconProps> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
  </svg>
);

export default SignOutIcon;
