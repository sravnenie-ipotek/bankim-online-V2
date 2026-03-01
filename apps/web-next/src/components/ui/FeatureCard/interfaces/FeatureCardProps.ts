import type React from 'react';

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  text: string;
  size?: 'default' | 'full';
  variant?: 'default' | 'dark';
}
