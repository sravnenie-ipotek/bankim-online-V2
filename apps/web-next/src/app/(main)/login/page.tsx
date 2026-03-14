'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useAppDispatch } from '@/hooks/store';
import { openLoginDialog, setLoginStep, setForgotPasswordSource } from '@/store/slices/authSlice';
import Container from '@/components/ui/Container/Container';
import PhoneLoginForm from '@/components/ui/LoginDialog/PhoneLoginForm';
import EmailLoginForm from '@/components/ui/LoginDialog/EmailLoginForm';

type TabType = 'phone' | 'email';

const LoginPage: React.FC = () => {
  useContentFetch('global_components');
  const { getContent } = useContentApi('global_components');
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const direction: 'ltr' | 'rtl' =
    i18n.language?.startsWith('he') || i18n.language === 'iw' ? 'rtl' : 'ltr';

  const [activeTab, setActiveTab] = useState<TabType>('phone');

  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const handleForgotPassword = (): void => {
    dispatch(setForgotPasswordSource(activeTab));
    dispatch(setLoginStep('forgot-password'));
    dispatch(openLoginDialog());
  };

  return (
    <Container className="max-[1240px]:px-0">
      <div className="flex justify-center w-full py-[clamp(40px,5.556vw,96px)]" dir={direction}>
        <div
          className="relative w-full rounded-xl bg-base-secondary shadow-lg flex flex-col mx-auto"
          style={{
            maxWidth: 'clamp(320px, 52.63vw, 600px)',
            padding: 'clamp(16px, 2.11vw, 24px)',
          }}
        >
          <h1
            className="w-full text-[clamp(18px,1.74vw,25px)] font-medium text-textTheme-primary text-left rtl:text-right border-b border-base-stroke"
            style={{
              paddingBottom: 'clamp(12px, 1.56vh, 16px)',
            }}
          >
            {getContent('login')}
          </h1>

        <div
          className="w-full text-left rtl:text-right"
          style={{
            paddingTop: 'clamp(12px, 1.56vh, 16px)',
          }}
        >
          <div
            className="flex border-b border-base-stroke min-w-0 w-full"
            role="tablist"
            aria-label="Login method"
            style={{
              marginBottom: 'clamp(12px, 1.56vh, 16px)',
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
              style={{
                paddingTop: 'clamp(6px, 0.59vh, 8px)',
                paddingBottom: 'clamp(6px, 0.59vh, 8px)',
                fontSize: 'clamp(14px, 1.4vw, 16px)',
              }}
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
              style={{
                paddingTop: 'clamp(6px, 0.59vh, 8px)',
                paddingBottom: 'clamp(6px, 0.59vh, 8px)',
                fontSize: 'clamp(14px, 1.4vw, 16px)',
              }}
            >
              {getContent('enter_email')}
            </button>
          </div>

          <div className="w-full min-w-0">
            {activeTab === 'phone' && <PhoneLoginForm />}
            {activeTab === 'email' && <EmailLoginForm />}
          </div>

          <div
            className="text-left rtl:text-right"
            style={{
              marginTop: 'clamp(12px, 1.56vh, 16px)',
              marginBottom: 'clamp(8px, 0.78vh, 8px)',
            }}
          >
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[clamp(12px,0.9722vw,14px)] text-accent-forgotPasswordLink hover:text-accent-forgotPasswordLink/90 underline hover:no-underline transition-colors bg-transparent border-0 cursor-pointer p-0"
            >
              {getContent('forgot_password') || 'Forgot password?'}
            </button>
          </div>

          <hr
            className="border-base-stroke"
            style={{
              marginTop: 'clamp(12px, 1.56vh, 16px)',
              marginBottom: 'clamp(12px, 1.56vh, 16px)',
            }}
          />

          <p className="text-[clamp(12px,0.9722vw,14px)] text-textTheme-secondary text-left rtl:text-right">
            {getContent('register_description')}{' '}
            <Link
              href="/registration"
              className="font-semibold text-accent-forgotPasswordLink hover:text-accent-forgotPasswordLink/90 underline hover:no-underline"
            >
              {getContent('register_here')}
            </Link>
          </p>
        </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
