'use client';

import React, { useState } from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { emailLogin, authLoadingSelector } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';

const EmailLoginForm: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const dispatch: AppDispatch = useAppDispatch();
  const isLoading = useAppSelector(authLoadingSelector);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    void dispatch(emailLogin({ email: email.trim(), password }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-textTheme-primary">
          {getContent('enter_email')}
        </span>
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dir="ltr"
          autoFocus
          className="w-full px-3 py-2.5 bg-base-inputs border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:border-accent-primary"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-textTheme-primary">
          {getContent('enter_password')}
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          dir="ltr"
          className="w-full px-3 py-2.5 bg-base-inputs border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:border-accent-primary"
        />
      </label>
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
