'use client';

import React, { useState } from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  verifySmsCode,
  pendingPhoneSelector,
  authLoadingSelector,
  setLoginStep,
} from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';

const SmsVerifyForm: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const dispatch: AppDispatch = useAppDispatch();
  const isLoading = useAppSelector(authLoadingSelector);
  const pendingPhone = useAppSelector(pendingPhoneSelector);
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!code.trim() || !pendingPhone) return;
    void dispatch(verifySmsCode({ code: code.trim(), mobile_number: pendingPhone }));
  };

  const handleBack = (): void => {
    dispatch(setLoginStep('form'));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <p className="text-sm text-textTheme-secondary">{getContent('confirm_phone_number_login')}</p>
      <p className="text-sm font-semibold text-textTheme-primary" dir="ltr">
        {pendingPhone}
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-textTheme-primary">
          {getContent('enter_code')}
        </span>
        <input
          type="text"
          placeholder="1234"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
          inputMode="numeric"
          maxLength={4}
          dir="ltr"
          autoFocus
          className="w-full px-3 py-2.5 bg-base-inputs border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:border-accent-primary"
        />
      </label>
      <button type="submit" disabled={code.length < 4 || isLoading} className="btn-primary-full">
        {isLoading ? getContent('auth_modal_processing') : getContent('auth_modal_continue')}
      </button>
      <button
        type="button"
        onClick={handleBack}
        className="w-full py-2 text-textTheme-secondary hover:text-textTheme-primary transition-colors"
      >
        {getContent('back')}
      </button>
    </form>
  );
};

export default SmsVerifyForm;
