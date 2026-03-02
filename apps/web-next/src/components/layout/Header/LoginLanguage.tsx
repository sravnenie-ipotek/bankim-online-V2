'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useContentApi } from '@hooks/useContentApi';
import { useWindowResize } from '@/hooks/useWindowResize';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  openLoginDialog,
  logout,
  isAuthenticatedSelector,
  authUserSelector,
} from '@/store/slices/authSlice';
import ChangeLanguage from '@/components/ui/ChangeLanguage/ChangeLanguage';
import SignOutIcon from '@/components/ui/SignOutIcon/SignOutIcon';
import { LoginButtonModeHelper } from './helpers/LoginButtonModeHelper';

const LoginLanguage: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const user = useAppSelector(authUserSelector);
  const pathMap = pathname.split('/');
  const isService = pathMap.includes('services');
  const loginButtonMode = LoginButtonModeHelper.getMode(pathname);
  const { isDesktop } = useWindowResize();

  const handleClick = (): void => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      dispatch(openLoginDialog());
    }
  };

  const label = isAuthenticated ? (user?.name ?? getContent('account')) : getContent('account');

  return (
    <div className="flex gap-[42px] items-center max-[1240px]:flex-nowrap max-[1240px]:flex-row">
      {isDesktop && (
        <>
          <ChangeLanguage />
          <div className="w-fit">
            <button
              onClick={handleClick}
              className={`flex items-center gap-[42px] flex-nowrap whitespace-nowrap h-[54px] py-3.5 px-4 w-[266px] rounded-[4px] self-stretch m-0 font-medium text-sm cursor-pointer transition-colors rtl:justify-end ${
                isService
                  ? 'bg-transparent text-textTheme-primary border border-base-stroke hover:bg-base-secondaryHoveredButton'
                  : loginButtonMode === 'black'
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : 'bg-accent-loginButton text-base-primary hover:bg-accent-primaryActiveButton'
              }`}
            >
              {label}
              <SignOutIcon color="currentColor" size={24} />
            </button>
          </div>
        </>
      )}
      {!isDesktop && (
        <button
          onClick={handleClick}
          className={`flex justify-center items-center w-10 h-10 rounded-lg ${
            isService
              ? 'bg-transparent text-textTheme-primary border-transparent'
              : loginButtonMode === 'black'
                ? 'bg-black text-white'
                : 'text-base-primary !bg-accent-loginButton'
          }`}
        >
          <SignOutIcon color="currentColor" size={24} />
        </button>
      )}
    </div>
  );
};

export default LoginLanguage;
