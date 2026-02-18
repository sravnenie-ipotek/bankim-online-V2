import React from 'react'

import BankIcon from '@/components/icons/BankIcon'
import HandCoinsIcon from '@/components/icons/HandCoinsIcon'
import HandPointingIcon from '@/components/icons/HandPointingIcon'
import LightningIcon from '@/components/icons/LightningIcon'
import PlusMinusIcon from '@/components/icons/PlusMinusIcon'
import ShieldCheckIcon from '@/components/icons/ShieldCheckIcon'
import TargetIcon from '@/components/icons/TargetIcon'

export const ABOUT_FEATURES = [
  {
    icon: <TargetIcon />,
    titleKey: 'about_why_solve_problem_title',
    textKey: 'about_why_solve_problem',
  },
  {
    icon: <BankIcon />,
    titleKey: 'about_why_bank_title',
    textKey: 'about_why_bank',
  },
  {
    icon: <HandCoinsIcon />,
    titleKey: 'about_why_mortgage_complete_title',
    textKey: 'about_why_mortgage_complete',
  },
  {
    icon: <HandPointingIcon />,
    titleKey: 'about_why_simple_title',
    textKey: 'about_why_simple',
  },
  {
    icon: <PlusMinusIcon />,
    titleKey: 'about_why_credit_title',
    textKey: 'about_why_credit',
  },
  {
    icon: <ShieldCheckIcon />,
    titleKey: 'about_why_security_title',
    textKey: 'about_why_security',
  },
  {
    icon: <LightningIcon />,
    titleKey: 'about_why_fast_title',
    textKey: 'about_why_fast',
  },
]
