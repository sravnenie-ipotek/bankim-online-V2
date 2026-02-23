'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import FormField from '@/components/ui/FormField/FormField';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  fetchBankWorkerRegistrationForm,
  completeBankWorkerRegistration,
  selectBankWorkerFormEntry,
  selectBankWorkerFormLoading,
} from '@/store/slices/bankWorkerSlice';

/**
 * Bank worker registration by token: fetches form via RTK (fetchBankWorkerRegistrationForm), submit via completeBankWorkerRegistration.
 */
const BankWorkerRegister: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const dispatch = useAppDispatch();

  const formEntry = useAppSelector(selectBankWorkerFormEntry(token));
  const loading = useAppSelector(selectBankWorkerFormLoading(token));
  const registrationInfo = formEntry?.data ?? null;

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    branch: '',
    employeeNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;
    dispatch(fetchBankWorkerRegistrationForm(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (registrationInfo?.name) {
      setFormData((prev) => ({ ...prev, name: registrationInfo.name }));
    }
  }, [registrationInfo?.name]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const result = await dispatch(
        completeBankWorkerRegistration({ ...formData, token })
      );
      if (completeBankWorkerRegistration.fulfilled.match(result) && result.payload?.id) {
        router.push(`/bank-worker/status/${result.payload.id}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-authMd surface-card-p8">
        <h1 className="text-2xl font-medium text-textTheme-primary text-center mb-2">
          {getContent('bank_worker_registration')}
        </h1>
        {registrationInfo && (
          <p className="text-textTheme-secondary text-center mb-6">
            {registrationInfo.bank} - {registrationInfo.position}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField id="bw-name" label={getContent('full_name')}>
            <input
              id="bw-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={getContent('full_name')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="bw-position" label={getContent('position')}>
            <input
              id="bw-position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder={getContent('position')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="bw-branch" label={getContent('branch')}>
            <input
              id="bw-branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder={getContent('branch')}
              className="input-base"
            />
          </FormField>
          <FormField id="bw-employeeNumber" label={getContent('employee_number')}>
            <input
              id="bw-employeeNumber"
              name="employeeNumber"
              value={formData.employeeNumber}
              onChange={handleChange}
              placeholder={getContent('employee_number')}
              className="input-base"
            />
          </FormField>
          <FormField id="bw-password" label={getContent('password')}>
            <input
              id="bw-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={getContent('password')}
              required
              className="input-base"
            />
          </FormField>
          <FormField id="bw-confirmPassword" label={getContent('confirm_password')}>
            <input
              id="bw-confirmPassword"
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
            {submitting ? getContent('loading') : getContent('complete_registration')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankWorkerRegister;
