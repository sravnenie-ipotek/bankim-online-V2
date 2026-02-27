'use client';

import React, { useState } from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  verifySmsCode,
  pendingPhoneSelector,
  authLoadingSelector,
  forgotPasswordSourceSelector,
  setLoginStep,
} from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';
import FormLabel from './FormLabel/FormLabel';

const SmsVerifyForm: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const dispatch: AppDispatch = useAppDispatch();
  const isLoading = useAppSelector(authLoadingSelector);
  const pendingPhone = useAppSelector(pendingPhoneSelector);
  const forgotPasswordSource = useAppSelector(forgotPasswordSourceSelector);
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!code.trim() || !pendingPhone) return;
    void dispatch(verifySmsCode({ code: code.trim(), mobile_number: pendingPhone }));
  };

  const handleBack = (): void => {
    dispatch(setLoginStep(forgotPasswordSource === 'phone' ? 'forgot-password' : 'form'));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col" style={{ gap: 'clamp(12px, 2.08vw, 16px)' }}>
      <p className="text-textTheme-secondary" style={{ fontSize: 'clamp(12px, 0.97vw, 14px)' }}>{getContent('confirm_phone_number_login')}</p>
      <p className="font-semibold text-textTheme-primary" dir="ltr" style={{ fontSize: 'clamp(12px, 0.97vw, 14px)' }}>
        {pendingPhone}
      </p>
      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="sms-code">{getContent('enter_code')}</FormLabel>
        <input
          id="sms-code"
          type="text"
          placeholder="1234"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
          inputMode="numeric"
          maxLength={4}
          dir="ltr"
          autoFocus
          className="w-full bg-transparent border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:border-accent-primary"
          style={{ padding: 'clamp(8px, 0.98vh, 12px) clamp(8px, 1.05vw, 12px)' }}
        />
      </div>
      <button type="submit" disabled={code.length < 4 || isLoading} className="btn-primary-full">
        {isLoading ? getContent('auth_modal_processing') : getContent('auth_modal_continue')}
      </button>
      <button
        type="button"
        onClick={handleBack}
        className="w-full text-textTheme-secondary hover:text-textTheme-primary transition-colors"
        style={{ paddingTop: 'clamp(6px, 0.59vh, 8px)', paddingBottom: 'clamp(6px, 0.59vh, 8px)', fontSize: 'clamp(12px, 0.97vw, 14px)' }}
      >
        {getContent('back')}
      </button>
    </form>
  );
};

export default SmsVerifyForm;
