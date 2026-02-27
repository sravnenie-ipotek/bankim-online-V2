import React from 'react';
import IsraelFlagIcon from '@/components/icons/IsraelFlagIcon';
import RussiaFlagIcon from '@/components/icons/RussiaFlagIcon';
import USFlagIcon from '@/components/icons/USFlagIcon';

const FLAG_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  en: USFlagIcon,
  he: IsraelFlagIcon,
  ru: RussiaFlagIcon,
};

const DEFAULT_LANGUAGE = 'he';

export interface GetFlagProps extends React.SVGProps<SVGSVGElement> {
  circle?: boolean;
  transparentBackground?: boolean;
}

export class LanguageFlagHelper {
  static getFlag(language: string, props?: GetFlagProps): React.ReactNode {
    const Component = FLAG_MAP[language] ?? FLAG_MAP[DEFAULT_LANGUAGE];
    return React.createElement(Component, props);
  }
}
