'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FormField from '@/components/ui/FormField/FormField';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  fetchBanksList,
  registerBankPartner,
  selectBanksList,
} from '@/store/slices/banksSlice';

/**
 * Bank partner registration: banks list and form submit via RTK.
 */
const BankPartnerRegister: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const listEntry = useAppSelector(selectBanksList);
  const banks = listEntry?.data ?? [];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bank: '',
    position: '',
    serviceType: '',
    password: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchBanksList());
  }, [dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    setSubmitting(true);
    try {
      const result = await dispatch(registerBankPartner(formData));
      if (registerBankPartner.fulfilled.match(result) && result.payload?.id) {
        router.push(`/bank-partner/status/${result.payload.id}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-authMd surface-card-p8">
        <h1 className="text-2xl font-medium text-textTheme-primary text-center mb-6">
          {getContent('bank_partner_registration')}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField id="bp-name" label={getContent('full_name')}>
            <input
              id="bp-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={getContent('full_name')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="bp-email" label={getContent('email')}>
            <input
              id="bp-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={getContent('email')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="bp-phone" label={getContent('phone')}>
            <input
              id="bp-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={getContent('phone')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="bp-bank" label={getContent('select_bank')}>
            <select
              id="bp-bank"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
              className="input-base"
            >
              <option value="">{getContent('select_bank')}</option>
              {banks.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="bp-position" label={getContent('position')}>
            <input
              id="bp-position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder={getContent('position')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="bp-serviceType" label={getContent('service_type')}>
            <input
              id="bp-serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              placeholder={getContent('service_type')}
              className="input-base"
            />
          </FormField>
          <FormField id="bp-password" label={getContent('password')}>
            <input
              id="bp-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={getContent('password')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="bp-confirmPassword" label={getContent('confirm_password')}>
            <input
              id="bp-confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={getContent('confirm_password')}
              required
              className="input-base"
            />
          </FormField>

          <button type="submit" disabled={submitting} className="btn-primary-full">
            {submitting ? getContent('loading') : getContent('register')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankPartnerRegister;
