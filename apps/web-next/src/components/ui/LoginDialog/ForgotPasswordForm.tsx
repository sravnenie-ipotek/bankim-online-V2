'use client';

import React, { useState } from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch } from '@/hooks/store';
import { setLoginStep } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';
import FormLabel from './FormLabel/FormLabel';

const ForgotPasswordForm: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const dispatch: AppDispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleBack = (): void => {
    dispatch(setLoginStep('form'));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col" style={{ gap: 'clamp(12px, 2.08vw, 16px)' }}>
        <p className="text-sm text-textTheme-secondary">
          {getContent('reset_password_sent') || 'A password-reset link has been sent to your email.'}
        </p>
        <button
          type="button"
          onClick={handleBack}
          className="btn-primary-full"
        >
          {getContent('back_to_login') || 'Back to login'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col" style={{ gap: 'clamp(12px, 2.08vw, 16px)' }}>
      <p className="text-textTheme-secondary" style={{ fontSize: 'clamp(12px, 0.97vw, 14px)' }}>
        {getContent('forgot_password_instructions') || 'Enter your email address and we will send you a link to reset your password.'}
      </p>

      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="forgot-email">{getContent('enter_email')}</FormLabel>
        <input
          id="forgot-email"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={handleEmailChange}
          dir="ltr"
          autoFocus
          className="w-full bg-transparent border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:border-accent-primary autofill:shadow-[inset_0_0_0px_1000px_hsl(219,10%,27%)] autofill:[-webkit-text-fill-color:hsla(0,0%,100%,1)]"
          style={{ padding: 'clamp(8px, 0.98vh, 12px) clamp(8px, 1.05vw, 12px)' }}
        />
      </div>

      <button
        type="submit"
        disabled={!email.trim()}
        className="btn-primary-full"
      >
        {getContent('auth_modal_continue') || 'Continue'}
      </button>

      <button
        type="button"
        onClick={handleBack}
        className="w-full text-textTheme-secondary hover:text-textTheme-primary transition-colors"
        style={{ paddingTop: 'clamp(6px, 0.59vh, 8px)', paddingBottom: 'clamp(6px, 0.59vh, 8px)', fontSize: 'clamp(12px, 0.97vw, 14px)' }}
      >
        {getContent('back') || 'Back'}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
