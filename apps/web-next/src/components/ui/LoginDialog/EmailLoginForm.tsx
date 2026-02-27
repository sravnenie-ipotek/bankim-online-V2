'use client';

import React, { useState } from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { authLoadingSelector, emailLogin } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';
import FormLabel from './FormLabel/FormLabel';
import EnvelopeIcon from '@/components/icons/EnvelopeIcon';

const baseInputPaddingY = 'clamp(8px, 0.98vh, 12px)';
const baseInputPaddingX = 'clamp(8px, 1.05vw, 12px)';
const baseInputClassName =
  'w-full bg-transparent border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:border-accent-primary autofill:shadow-[inset_0_0_0px_1000px_hsl(219,10%,27%)] autofill:[-webkit-text-fill-color:hsla(0,0%,100%,1)]';

const inputClassName = `${baseInputClassName}`;
const emailInputClassName = `${baseInputClassName}`;

const EmailLoginForm: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const dispatch: AppDispatch = useAppDispatch();
  const isLoading = useAppSelector(authLoadingSelector);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    void dispatch(emailLogin({ email: email.trim(), password }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col" style={{ gap: 'clamp(12px, 2.08vw, 16px)' }}>
      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="email-input">{getContent('enter_email')}</FormLabel>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-[clamp(10px,1.67vw,16px)] top-1/2 -translate-y-1/2 text-textTheme-secondary"
            aria-hidden
          >
            <EnvelopeIcon className="w-[clamp(18px,1.67vw,24px)] h-[clamp(18px,1.67vw,24px)]" />
          </span>
          <input
            id="email-input"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={handleEmailChange}
            dir="ltr"
            autoFocus
            className={emailInputClassName}
            style={{ paddingTop: baseInputPaddingY, paddingBottom: baseInputPaddingY, paddingLeft: 'clamp(40px, 4.21vw, 48px)', paddingRight: baseInputPaddingX }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="email-password">{getContent('enter_password')}</FormLabel>
        <input
          id="email-password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          dir="ltr"
          placeholder="*************"
          className={inputClassName}
          style={{ paddingTop: baseInputPaddingY, paddingBottom: baseInputPaddingY, paddingLeft: baseInputPaddingX, paddingRight: baseInputPaddingX }}
        />
      </div>

      <button
        type="submit"
        disabled={!email.trim() || !password || isLoading}
        className="btn-primary-full"
      >
        {isLoading ? getContent('auth_modal_processing') : getContent('login')}
      </button>
    </form>
  );
};

export default EmailLoginForm;
