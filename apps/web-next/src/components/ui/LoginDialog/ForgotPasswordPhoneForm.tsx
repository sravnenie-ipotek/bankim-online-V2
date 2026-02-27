'use client';

import React, { useState } from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { sendSmsCode, authLoadingSelector, setLoginStep } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';
import FormLabel from './FormLabel/FormLabel';
import PhoneInput from './PhoneInput/PhoneInput';

const ForgotPasswordPhoneForm: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const dispatch: AppDispatch = useAppDispatch();
  const isLoading = useAppSelector(authLoadingSelector);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('972');

  const handlePhoneChange = (digits: string): void => {
    setPhone(digits);
  };

  const handleCountryCodeChange = (code: string): void => {
    setCountryCode(code);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!phone.trim()) return;
    void dispatch(sendSmsCode(`+${countryCode}${phone.trim()}`));
  };

  const handleBack = (): void => {
    dispatch(setLoginStep('form'));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col" style={{ gap: 'clamp(12px, 2.08vw, 16px)' }}>
      <p className="text-textTheme-secondary text-left rtl:text-right" style={{ fontSize: 'clamp(12px, 0.97vw, 14px)' }}>
        {getContent('forgot_password_instructions') || 'Enter your phone number and we will send you a code to reset your password.'}
      </p>
      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="forgot-phone-input">{getContent('enter_phone_number')}</FormLabel>
        <PhoneInput
          id="forgot-phone-input"
          value={phone}
          onChange={handlePhoneChange}
          countryCode={countryCode}
          onCountryCodeChange={handleCountryCodeChange}
          aria-label={getContent('enter_phone_number')}
        />
      </div>
      <button type="submit" disabled={!phone.trim() || isLoading} className="btn-primary-full">
        {isLoading ? getContent('auth_modal_processing') : getContent('auth_modal_continue')}
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

export default ForgotPasswordPhoneForm;
