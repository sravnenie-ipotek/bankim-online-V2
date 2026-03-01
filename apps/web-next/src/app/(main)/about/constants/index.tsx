import React from 'react';
import Image from 'next/image';

import BankIcon from '@/components/icons/BankIcon';
import HandPointingIcon from '@/components/icons/HandPointingIcon';
import LightningIcon from '@/components/icons/LightningIcon';
import ShieldCheckIcon from '@/components/icons/ShieldCheckIcon';

export const ABOUT_FEATURES = [
  {
    icon: <BankIcon color="white" />,
    titleKey: 'about_why_bank_title',
    textKey: 'about_why_bank',
  },
  {
    icon: <LightningIcon color="white" />,
    titleKey: 'about_why_mortgage_complete_title',
    textKey: 'about_why_mortgage_complete',
  },
  {
    icon: <ShieldCheckIcon color="white" />,
    titleKey: 'about_why_security_title',
    textKey: 'about_why_security',
  },
  {
    icon: <Image src="/static/about/frame-14100937611.svg" width={68} height={68} alt="" />,
    titleKey: 'about_why_solve_problem_title',
    textKey: 'about_why_solve_problem',
  },
  
  {
    icon: <HandPointingIcon color="white" />,
    titleKey: 'about_why_simple_title',
    textKey: 'about_why_simple',
  },
  {
    icon: <Image src="/static/about/frame-hand-coins.svg" width={68} height={68} alt="" />,
    titleKey: 'about_why_credit_title',
    textKey: 'about_why_credit',
  },
  
  {
    icon: <LightningIcon color="white" />,
    titleKey: 'about_why_fast_title',
    textKey: 'about_why_fast',
  },
];
