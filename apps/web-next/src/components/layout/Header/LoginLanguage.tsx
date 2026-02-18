'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { useWindowResize } from '@/hooks/useWindowResize'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  openLoginDialog,
  logout,
  isAuthenticatedSelector,
  authUserSelector,
} from '@/store/slices/authSlice'
import ChangeLanguage from '@/components/ui/ChangeLanguage/ChangeLanguage'

const SignOutIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
  </svg>
)

const LoginLanguage: React.FC = () => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const user = useAppSelector(authUserSelector)
  const pathMap = pathname.split('/')
  const isService = pathMap.includes('services')
  const { isDesktop } = useWindowResize()

  const handleClick = (): void => {
    if (isAuthenticated) {
      dispatch(logout())
    } else {
      dispatch(openLoginDialog())
    }
  }

  const label = isAuthenticated ? (user?.name ?? t('account')) : t('account')

  return (
    <div className="flex gap-[42px] items-center max-[1240px]:flex-nowrap max-[1240px]:flex-row">
      {isDesktop && (
        <>
          <ChangeLanguage />
          <div className="w-fit">
            <button
              onClick={handleClick}
              className={`flex items-center gap-[42px] flex-nowrap whitespace-nowrap h-[54px] py-3.5 px-4 w-[266px] rounded-[4px] self-stretch m-0 font-medium text-sm cursor-pointer transition-colors ${
                isService
                  ? 'bg-transparent text-textTheme-primary border border-base-stroke hover:bg-base-secondaryHoveredButton'
                  : 'bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton'
              }`}
            >
              <SignOutIcon color="currentColor" size={24} />
              {label}
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
              : 'text-base-primary !bg-accent-primary'
          }`}
        >
          <SignOutIcon color="currentColor" size={24} />
        </button>
      )}
    </div>
  )
}

export default LoginLanguage
