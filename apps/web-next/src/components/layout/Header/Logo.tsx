'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import LogoBox from '@/components/ui/LogoBox/LogoBox';

const Logo: React.FC = () => {
  const pathname = usePathname() ?? '';
  const isLogin = pathname.includes('login');
  return (
    <LogoBox
      src="/static/primary-logo05-1.svg"
      alt="BankIM"
      href="/"
      loading="eager"
      className={isLogin ? 'invert' : undefined}
    />
  );
};

export default Logo;
