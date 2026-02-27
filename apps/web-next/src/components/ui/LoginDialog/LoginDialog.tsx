'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  closeLoginDialog,
  setActiveTab,
  isLoginDialogOpenSelector,
  loginStepSelector,
  activeTabSelector,
  authErrorSelector,
  clearAuthError,
  setLoginStep,
  setForgotPasswordSource,
  forgotPasswordSourceSelector,
} from '@/store/slices/authSlice';
import type { Tab as AuthTab } from '@/store/slices/authSlice';
import { ModalDomHelper } from '@/helpers/ModalDomHelper';
import PhoneLoginForm from './PhoneLoginForm';
import EmailLoginForm from './EmailLoginForm';
import SmsVerifyForm from './SmsVerifyForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ForgotPasswordPhoneForm from './ForgotPasswordPhoneForm';

const handleModalKeyDown = (
  e: KeyboardEvent,
  container: HTMLElement | null,
): void => {
  if (container) {
    ModalDomHelper.trapFocusOnTab(e, container);
  }
};

const LoginDialog: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isLoginDialogOpenSelector);
  const loginStep = useAppSelector(loginStepSelector);
  const activeTab = useAppSelector(activeTabSelector);
  const forgotPasswordSource = useAppSelector(forgotPasswordSourceSelector);
  const error = useAppSelector(authErrorSelector);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const unlockScroll = ModalDomHelper.lockScroll();

    const onKeyDown = (e: KeyboardEvent): void => {
      handleModalKeyDown(e, dialogRef.current);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      unlockScroll();
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleTabChange = (value: string): void => {
    dispatch(setActiveTab(value as AuthTab));
    dispatch(clearAuthError());
  };

  const handleForgotPasswordOpen = (): void => {
    dispatch(setForgotPasswordSource(activeTab));
    dispatch(setLoginStep('forgot-password'));
  };

  if (!isOpen) return null;

  const isForgotPassword = loginStep === 'forgot-password';
  const dialogTitle = isForgotPassword
    ? getContent('forgot_password') || 'Forgot password'
    : getContent('login');

  return (
    <div
      className="fixed inset-0 z-[1300] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="login-dialog-title"
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden />
      <div
        ref={dialogRef}
        className="relative min-w-[320px] max-h-[90vh] rounded-xl bg-base-secondary shadow-lg flex flex-col overflow-visible"
        style={{
          width: 'clamp(320px, 52.63vw, 600px)',
          height: 'clamp(360px, 52.54vh, 538px)',
        }}
      >
        {/* Header */}
        <div
          className="w-full flex flex-col border-b border-base-stroke"
          style={{
            paddingLeft: 'clamp(16px, 2.11vw, 24px)',
            paddingRight: 'clamp(16px, 2.11vw, 24px)',
            paddingTop: 'clamp(12px, 1.56vh, 16px)',
            paddingBottom: 'clamp(12px, 1.56vh, 16px)',
          }}
        >
          <button
            type="button"
            onClick={() => dispatch(closeLoginDialog())}
            className="absolute p-1 text-textTheme-secondary hover:text-textTheme-primary rounded transition-colors"
            style={{
              top: 'clamp(12px, 1.17vh, 16px)',
              insetInlineEnd: 'clamp(12px, 1.05vw, 18px)',
              width: 'clamp(20px, 1.667vw, 24px)',
              height: 'clamp(20px, 1.667vw, 24px)',
            }}
            aria-label="close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-full h-full"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <h2
            id="login-dialog-title"
            className="w-full text-[clamp(18px,1.74vw,25px)] font-medium text-textTheme-primary text-left rtl:text-right"
          >
            {dialogTitle}
          </h2>
        </div>

        {/* Body */}
        <div
          className="overflow-auto flex-1 text-left rtl:text-right"
          style={{
            paddingLeft: 'clamp(16px, 2.11vw, 24px)',
            paddingRight: 'clamp(16px, 2.11vw, 24px)',
            paddingTop: 'clamp(12px, 1.56vh, 16px)',
            paddingBottom: 'clamp(12px, 1.56vh, 16px)',
          }}
        >
          {error && (
            <div
              className="flex items-center justify-between gap-2 rounded-lg bg-warning-error500 text-warning-error100"
              style={{
                marginBottom: 'clamp(12px, 1.56vh, 16px)',
                paddingTop: 'clamp(8px, 0.78vh, 12px)',
                paddingBottom: 'clamp(8px, 0.78vh, 12px)',
                paddingLeft: 'clamp(12px, 1.05vw, 12px)',
                paddingRight: 'clamp(12px, 1.05vw, 12px)',
              }}
            >
              <span className="text-[clamp(12px,0.9722vw,14px)]">{error}</span>
              <button
                type="button"
                onClick={() => dispatch(clearAuthError())}
                className="shrink-0 p-1 hover:opacity-80"
                aria-label="Dismiss"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {loginStep === 'form' && (
            <>
              <div
                className="flex border-b border-base-stroke min-w-0 w-full"
                role="tablist"
                aria-label="Login method"
                style={{
                  marginBottom: 'clamp(12px, 1.56vh, 16px)',
                  ['--tabs-gradient-edge' as string]: 'clamp(120px, 38.26vw, 551px)',
                  background: `linear-gradient(to right, hsla(228, 6%, 15%, 1) 0, transparent var(--tabs-gradient-edge)), linear-gradient(to left, hsla(228, 6%, 15%, 1) 0, transparent var(--tabs-gradient-edge))`,
                  backgroundColor: 'hsla(228, 6%, 15%, 1)',
                }}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'phone'}
                  onClick={() => handleTabChange('phone')}
                  className={`flex-1 min-w-0 break-words text-center font-medium transition-colors text-left rtl:text-right ${
                    activeTab === 'phone'
                      ? 'text-accent-primary border-b-2 border-accent-primary'
                      : 'text-textTheme-secondary hover:text-textTheme-primary'
                  }`}
                style={{ paddingTop: 'clamp(6px, 0.59vh, 8px)', paddingBottom: 'clamp(6px, 0.59vh, 8px)', fontSize: 'clamp(14px, 1.4vw, 16px)' }}
                >
                  {getContent('contact_form_phone')}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'email'}
                  onClick={() => handleTabChange('email')}
                  className={`flex-1 min-w-0 break-words text-center font-medium transition-colors text-left rtl:text-right ${
                    activeTab === 'email'
                      ? 'text-accent-primary border-b-2 border-accent-primary'
                      : 'text-textTheme-secondary hover:text-textTheme-primary'
                  }`}
                style={{ paddingTop: 'clamp(6px, 0.59vh, 8px)', paddingBottom: 'clamp(6px, 0.59vh, 8px)', fontSize: 'clamp(14px, 1.4vw, 16px)' }}
                >
                  {getContent('enter_email')}
                </button>
              </div>

              <div className="w-full min-w-0">
                {activeTab === 'phone' && <PhoneLoginForm />}
                {activeTab === 'email' && <EmailLoginForm />}
              </div>

              <div className="text-left rtl:text-right" style={{ marginTop: 'clamp(12px, 1.56vh, 16px)', marginBottom: 'clamp(8px, 0.78vh, 8px)' }}>
                <button
                  type="button"
                  onClick={handleForgotPasswordOpen}
                  className="text-[clamp(12px,0.9722vw,14px)] text-accent-forgotPasswordLink hover:text-accent-forgotPasswordLink/90 underline hover:no-underline transition-colors"
                >
                  {getContent('forgot_password') || 'Forgot password?'}
                </button>
              </div>

              <hr className="border-base-stroke" style={{ marginTop: 'clamp(12px, 1.56vh, 16px)', marginBottom: 'clamp(12px, 1.56vh, 16px)' }} />

              <p className="text-[clamp(12px,0.9722vw,14px)] text-textTheme-secondary text-left rtl:text-right">
                {getContent('register_description')}{' '}
                <Link
                  href="/registration"
                  onClick={() => dispatch(closeLoginDialog())}
                  className="font-semibold text-accent-forgotPasswordLink hover:text-accent-forgotPasswordLink/90 underline hover:no-underline"
                >
                  {getContent('register_here')}
                </Link>
              </p>
            </>
          )}

          {loginStep === 'sms-verify' && <SmsVerifyForm />}
          {loginStep === 'forgot-password' && forgotPasswordSource === 'phone' && <ForgotPasswordPhoneForm />}
          {loginStep === 'forgot-password' && forgotPasswordSource !== 'phone' && <ForgotPasswordForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
