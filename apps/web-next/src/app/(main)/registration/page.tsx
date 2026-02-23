'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import FormField from '@/components/ui/FormField/FormField';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

type TabType = 'phone' | 'email';

/**
 * Registration page: phone/email tab, form fields, and submit; uses useContentApi('common').
 */
const RegistrationPage: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const [activeTab, setActiveTab] = useState<TabType>('phone');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // TODO: submit to API
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="flex justify-center py-16">
        <div className="w-full max-w-authSm surface-card-p8">
          <h1 className="text-2xl font-medium text-textTheme-primary text-center mb-6">
            {getContent('registration_title')}
          </h1>

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('phone')}
              className={`tab-btn flex-1 ${activeTab === 'phone' ? 'tab-btn-active' : 'bg-base-base800 text-textTheme-secondary'}`}
            >
              {getContent('phone')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('email')}
              className={`tab-btn flex-1 ${activeTab === 'email' ? 'tab-btn-active' : 'bg-base-base800 text-textTheme-secondary'}`}
            >
              {getContent('email')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField id="reg-name" label={getContent('full_name')}>
              <input
                id="reg-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={getContent('full_name')}
                required
                className="input-base"
              />
            </FormField>

            {activeTab === 'phone' ? (
              <FormField id="reg-phone" label={getContent('phone_number')}>
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={getContent('phone_number')}
                  required
                  className="input-base"
                />
              </FormField>
            ) : (
              <FormField id="reg-email" label={getContent('email')}>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={getContent('email')}
                  required
                  className="input-base"
                />
              </FormField>
            )}

            <FormField id="reg-password" label={getContent('password')}>
              <input
                id="reg-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={getContent('password')}
                required
                className="input-base"
              />
            </FormField>
            <FormField id="reg-confirmPassword" label={getContent('confirm_password')}>
              <input
                id="reg-confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={getContent('confirm_password')}
                required
                className="input-base"
              />
            </FormField>

            <p className="text-xs text-textTheme-secondary">
              {getContent('by_registering')}{' '}
              <Link href="/terms" className="text-accent-primary hover:underline">
                {getContent('terms_of_service')}
              </Link>{' '}
              {getContent('and')}{' '}
              <Link href="/privacy-policy" className="text-accent-primary hover:underline">
                {getContent('privacy_policy')}
              </Link>
            </p>

            <button type="submit" disabled={submitting} className="btn-primary-full">
              {submitting ? getContent('loading') : getContent('register')}
            </button>
          </form>

          <p className="text-sm text-textTheme-secondary text-center mt-4">
            {getContent('already_have_account')}{' '}
            <Link href="/login" className="text-accent-primary hover:underline">
              {getContent('login')}
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default RegistrationPage;
