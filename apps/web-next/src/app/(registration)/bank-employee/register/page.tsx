'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FormField from '@/components/ui/FormField/FormField';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  fetchBanksList,
  registerBankEmployee,
  selectBanksList,
  selectBanksListLoading,
} from '@/store/slices/banksSlice';

/**
 * Bank employee registration: banks list and form submit via RTK.
 */
const BankEmployeeRegister: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const listEntry = useAppSelector(selectBanksList);
  const loadingBanks = useAppSelector(selectBanksListLoading);
  const banks = listEntry?.data ?? [];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bank: '',
    position: '',
    branchNumber: '',
    employeeNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchBanksList());
  }, [dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    setSubmitting(true);
    try {
      const result = await dispatch(registerBankEmployee(formData));
      if (registerBankEmployee.fulfilled.match(result)) {
        router.push('/bank-employee/registration-success');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-authMd surface-card-p8">
        <h1 className="text-2xl font-medium text-textTheme-primary text-center mb-6">
          {getContent('bank_employee_registration')}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField id="be-firstName" label={getContent('first_name')}>
              <input
                id="be-firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={getContent('first_name')}
                required
                className="input-base"
              />
            </FormField>
            <FormField id="be-lastName" label={getContent('last_name')}>
              <input
                id="be-lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={getContent('last_name')}
                required
                className="input-base"
              />
            </FormField>
          </div>
          <FormField id="be-email" label={getContent('email')}>
            <input
              id="be-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={getContent('email')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="be-phone" label={getContent('phone')}>
            <input
              id="be-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={getContent('phone')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="be-bank" label={getContent('select_bank')}>
            <select
              id="be-bank"
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
          <FormField id="be-position" label={getContent('position')}>
            <input
              id="be-position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder={getContent('position')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="be-branchNumber" label={getContent('branch_number')}>
            <input
              id="be-branchNumber"
              name="branchNumber"
              value={formData.branchNumber}
              onChange={handleChange}
              placeholder={getContent('branch_number')}
              className="input-base"
            />
          </FormField>
          <FormField id="be-employeeNumber" label={getContent('employee_number')}>
            <input
              id="be-employeeNumber"
              name="employeeNumber"
              value={formData.employeeNumber}
              onChange={handleChange}
              placeholder={getContent('employee_number')}
              className="input-base"
            />
          </FormField>
          <FormField id="be-password" label={getContent('password')}>
            <input
              id="be-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={getContent('password')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="be-confirmPassword" label={getContent('confirm_password')}>
            <input
              id="be-confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={getContent('confirm_password')}
              required
              className="input-base"
            />
          </FormField>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 accent-accent-primary"
            />
            <span className="text-sm text-textTheme-secondary">
              {getContent('agree_to')}{' '}
              <a href="/terms" className="text-accent-primary hover:underline">
                {getContent('terms_of_service')}
              </a>
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting || !formData.agreeTerms}
            className="btn-primary-full"
          >
            {submitting ? getContent('loading') : getContent('register')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankEmployeeRegister;
