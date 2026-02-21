'use client'

import React from 'react'
import Link from 'next/link'
import { useContentApi } from '@hooks/useContentApi'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  closeLoginDialog,
  setActiveTab,
  isLoginDialogOpenSelector,
  loginStepSelector,
  activeTabSelector,
  authErrorSelector,
  clearAuthError,
} from '@/store/slices/authSlice'
import type { Tab as AuthTab } from '@/store/slices/authSlice'
import PhoneLoginForm from './PhoneLoginForm'
import EmailLoginForm from './EmailLoginForm'
import SmsVerifyForm from './SmsVerifyForm'

const LoginDialog: React.FC = () => {
  const { getContent } = useContentApi('global_components')
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(isLoginDialogOpenSelector)
  const loginStep = useAppSelector(loginStepSelector)
  const activeTab = useAppSelector(activeTabSelector)
  const error = useAppSelector(authErrorSelector)

  const handleClose = (): void => {
    dispatch(closeLoginDialog())
  }

  const handleTabChange = (value: string): void => {
    dispatch(setActiveTab(value as AuthTab))
    dispatch(clearAuthError())
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4" aria-modal role="dialog">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} aria-hidden />
      <div className="relative w-full max-w-xs rounded-xl bg-base-secondary shadow-lg flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-base-stroke">
          <h2 className="text-xl font-medium text-textTheme-primary">{getContent('login')}</h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 text-textTheme-secondary hover:text-textTheme-primary rounded transition-colors"
            aria-label="close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 overflow-auto">
          {error && (
            <div className="mb-4 flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-warning-error500 text-warning-error100">
              <span className="text-sm">{error}</span>
              <button
                type="button"
                onClick={() => dispatch(clearAuthError())}
                className="shrink-0 p-1 hover:opacity-80"
                aria-label="Dismiss"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {loginStep === 'form' && (
            <>
              <div className="flex border-b border-base-stroke mb-4">
                <button
                  type="button"
                  onClick={() => handleTabChange('phone')}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'phone'
                      ? 'text-accent-primary border-b-2 border-accent-primary'
                      : 'text-textTheme-secondary hover:text-textTheme-primary'
                  }`}
                >
                  {getContent('contact_form_phone')}
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('email')}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'email'
                      ? 'text-accent-primary border-b-2 border-accent-primary'
                      : 'text-textTheme-secondary hover:text-textTheme-primary'
                  }`}
                >
                  {getContent('enter_email')}
                </button>
              </div>

              {activeTab === 'phone' && <PhoneLoginForm />}
              {activeTab === 'email' && <EmailLoginForm />}

              <hr className="my-6 border-base-stroke" />

              <p className="text-sm text-textTheme-secondary text-center">
                {getContent('register_description')}{' '}
                <Link
                  href="/registration"
                  onClick={handleClose}
                  className="font-semibold text-textTheme-primary underline hover:no-underline"
                >
                  {getContent('register_here')}
                </Link>
              </p>
            </>
          )}

          {loginStep === 'sms-verify' && <SmsVerifyForm />}
        </div>
      </div>
    </div>
  )
}

export default LoginDialog
