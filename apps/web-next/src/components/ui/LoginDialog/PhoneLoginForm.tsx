'use client';

import React, { useState } from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { sendSmsCode, authLoadingSelector } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';
import FormLabel from './FormLabel/FormLabel';
import PhoneInput from './PhoneInput/PhoneInput';
import EyeIcon from '@/components/icons/EyeIcon';
import EyeOffIcon from '@/components/icons/EyeOffIcon';

const PhoneLoginForm: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const dispatch: AppDispatch = useAppDispatch();
  const isLoading = useAppSelector(authLoadingSelector);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('972');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneChange = (digits: string): void => {
    setPhone(digits);
  };

  const handleCountryCodeChange = (code: string): void => {
    setCountryCode(code);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!phone.trim()) return;
    void dispatch(sendSmsCode(`+${countryCode}${phone.trim()}`));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col" style={{ gap: 'clamp(12px, 2.08vw, 16px)' }}>
      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="phone-input">{getContent('enter_phone_number')}</FormLabel>
        <PhoneInput
          id="phone-input"
          value={phone}
          onChange={handlePhoneChange}
          countryCode={countryCode}
          onCountryCodeChange={handleCountryCodeChange}
          aria-label={getContent('enter_phone_number')}
        />
      </div>

      <div className="flex flex-col gap-1">
        <FormLabel htmlFor="phone-password">{getContent('enter_password')}</FormLabel>
        <div className="relative">
          <input
            id="phone-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            dir="ltr"
            placeholder="*************"
            className="w-full bg-transparent border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:border-accent-primary autofill:shadow-[inset_0_0_0px_1000px_hsl(219,10%,27%)] autofill:[-webkit-text-fill-color:hsla(0,0%,100%,1)]"
          style={{ paddingTop: 'clamp(8px, 0.98vh, 12px)', paddingBottom: 'clamp(8px, 0.98vh, 12px)', paddingLeft: 'clamp(8px, 1.05vw, 12px)', paddingRight: 'clamp(36px, 3.16vw, 48px)' }}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
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

      <button type="submit" disabled={!phone.trim() || isLoading} className="btn-primary-full">
        {isLoading ? getContent('auth_modal_processing') : getContent('auth_modal_continue')}
      </button>
    </form>
  );
};

export default PhoneLoginForm;
