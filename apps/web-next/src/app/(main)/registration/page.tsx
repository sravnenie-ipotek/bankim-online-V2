'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import Container from '@/components/ui/Container/Container';
import FormLabel from '@/components/ui/LoginDialog/FormLabel/FormLabel';
import PhoneInput from '@/components/ui/LoginDialog/PhoneInput/PhoneInput';
import EnvelopeIcon from '@/components/icons/EnvelopeIcon';
import UserIcon from '@/components/icons/UserIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import EyeOffIcon from '@/components/icons/EyeOffIcon';

type TabType = 'phone' | 'email';

const BASE_INPUT_PADDING_Y = 'clamp(8px, 0.98vh, 12px)';
const BASE_INPUT_PADDING_X = 'clamp(8px, 1.05vw, 12px)';
const BASE_INPUT_CLASS =
  'w-full bg-transparent border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:border-accent-primary autofill:shadow-[inset_0_0_0px_1000px_hsl(219,10%,27%)] autofill:[-webkit-text-fill-color:hsla(0,0%,100%,1)]';

const RegistrationPage: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const { i18n } = useTranslation();
  const direction: 'ltr' | 'rtl' =
    i18n.language?.startsWith('he') || i18n.language === 'iw' ? 'rtl' : 'ltr';

  const [activeTab, setActiveTab] = useState<TabType>('phone');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('972');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // TODO: submit to API
    } finally {
      setSubmitting(false);
    }
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
            {getContent('registration_title')}
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
            aria-label="Registration method"
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
              {getContent('phone')}
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
              {getContent('email')}
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col"
            style={{ gap: 'clamp(12px, 2.08vw, 16px)' }}
          >
            <div className="flex flex-col gap-1">
              <FormLabel htmlFor="reg-name">{getContent('full_name')}</FormLabel>
              <div className="relative">
                <span
                  className="pointer-events-none absolute left-[clamp(10px,1.67vw,16px)] top-1/2 -translate-y-1/2 text-textTheme-secondary"
                  aria-hidden
                >
                  <UserIcon className="w-[clamp(18px,1.67vw,24px)] h-[clamp(18px,1.67vw,24px)]" />
                </span>
                <input
                  id="reg-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={getContent('full_name')}
                  required
                  className={BASE_INPUT_CLASS}
                  style={{
                    paddingTop: BASE_INPUT_PADDING_Y,
                    paddingBottom: BASE_INPUT_PADDING_Y,
                    paddingLeft: 'clamp(40px, 4.21vw, 48px)',
                    paddingRight: BASE_INPUT_PADDING_X,
                  }}
                />
              </div>
            </div>

            {activeTab === 'phone' ? (
              <div className="flex flex-col gap-1">
                <FormLabel htmlFor="reg-phone">{getContent('phone_number')}</FormLabel>
                <PhoneInput
                  id="reg-phone"
                  value={phone}
                  onChange={(digits: string) => setPhone(digits)}
                  countryCode={countryCode}
                  onCountryCodeChange={(code: string) => setCountryCode(code)}
                  aria-label={getContent('phone_number')}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <FormLabel htmlFor="reg-email">{getContent('email')}</FormLabel>
                <div className="relative">
                  <span
                    className="pointer-events-none absolute left-[clamp(10px,1.67vw,16px)] top-1/2 -translate-y-1/2 text-textTheme-secondary"
                    aria-hidden
                  >
                    <EnvelopeIcon className="w-[clamp(18px,1.67vw,24px)] h-[clamp(18px,1.67vw,24px)]" />
                  </span>
                  <input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    dir="ltr"
                    placeholder="email@example.com"
                    className={BASE_INPUT_CLASS}
                    style={{
                      paddingTop: BASE_INPUT_PADDING_Y,
                      paddingBottom: BASE_INPUT_PADDING_Y,
                      paddingLeft: 'clamp(40px, 4.21vw, 48px)',
                      paddingRight: BASE_INPUT_PADDING_X,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <FormLabel htmlFor="reg-password">{getContent('password')}</FormLabel>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  dir="ltr"
                  placeholder="*************"
                  className={BASE_INPUT_CLASS}
                  style={{
                    paddingTop: BASE_INPUT_PADDING_Y,
                    paddingBottom: BASE_INPUT_PADDING_Y,
                    paddingLeft: BASE_INPUT_PADDING_X,
                    paddingRight: 'clamp(36px, 3.16vw, 48px)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 -translate-y-1/2 right-[clamp(8px,1.5vw,12px)] text-textTheme-secondary hover:text-textTheme-primary transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-[clamp(16px,1.39vw,20px)] h-[clamp(16px,1.39vw,20px)]" />
                  ) : (
                    <EyeIcon className="w-[clamp(16px,1.39vw,20px)] h-[clamp(16px,1.39vw,20px)]" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <FormLabel htmlFor="reg-confirm-password">{getContent('confirm_password')}</FormLabel>
              <div className="relative">
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  dir="ltr"
                  placeholder="*************"
                  className={BASE_INPUT_CLASS}
                  style={{
                    paddingTop: BASE_INPUT_PADDING_Y,
                    paddingBottom: BASE_INPUT_PADDING_Y,
                    paddingLeft: BASE_INPUT_PADDING_X,
                    paddingRight: 'clamp(36px, 3.16vw, 48px)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-1/2 -translate-y-1/2 right-[clamp(8px,1.5vw,12px)] text-textTheme-secondary hover:text-textTheme-primary transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="w-[clamp(16px,1.39vw,20px)] h-[clamp(16px,1.39vw,20px)]" />
                  ) : (
                    <EyeIcon className="w-[clamp(16px,1.39vw,20px)] h-[clamp(16px,1.39vw,20px)]" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-[clamp(12px,0.9722vw,14px)] text-textTheme-secondary text-left rtl:text-right">
              {getContent('by_registering')}{' '}
              <Link
                href="/terms"
                className="font-semibold text-accent-forgotPasswordLink hover:text-accent-forgotPasswordLink/90 underline hover:no-underline"
              >
                {getContent('terms_of_service')}
              </Link>{' '}
              {getContent('and')}{' '}
              <Link
                href="/privacy-policy"
                className="font-semibold text-accent-forgotPasswordLink hover:text-accent-forgotPasswordLink/90 underline hover:no-underline"
              >
                {getContent('privacy_policy')}
              </Link>
            </p>

            <button type="submit" disabled={submitting} className="btn-primary-full">
              {submitting ? getContent('loading') : getContent('register')}
            </button>
          </form>

          <hr
            className="border-base-stroke"
            style={{
              marginTop: 'clamp(12px, 1.56vh, 16px)',
              marginBottom: 'clamp(12px, 1.56vh, 16px)',
            }}
          />

          <p className="text-[clamp(12px,0.9722vw,14px)] text-textTheme-secondary text-left rtl:text-right">
            {getContent('already_have_account')}{' '}
            <Link
              href="/login"
              className="font-semibold text-accent-forgotPasswordLink hover:text-accent-forgotPasswordLink/90 underline hover:no-underline"
            >
              {getContent('login')}
            </Link>
          </p>
        </div>
        </div>
      </div>
    </Container>
  );
};

export default RegistrationPage;
