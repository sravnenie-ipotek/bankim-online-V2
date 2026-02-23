'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import type { BrokerFormValues } from './interfaces/BrokerFormValues';
import Container from '@/components/ui/Container/Container';
import FormField from '@/components/ui/FormField/FormField';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { fetchCities, selectReferenceEntry } from '@/store/slices/referenceSlice';
import { submitBroker } from '@/store/slices/brokersSlice';

const INITIAL_VALUES: BrokerFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  licenseNumber: '',
  companyName: '',
  experience: '',
  specialization: '',
  additionalInfo: '',
  agreeTerms: false,
};

const BrokerQuestionnaire: React.FC = () => {
  const { i18n } = useTranslation();
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = i18n.language || 'en';
  const citiesEntry = useAppSelector(selectReferenceEntry('cities', lang));
  const cities = citiesEntry?.data ?? [];

  const [formData, setFormData] = useState<BrokerFormValues>(INITIAL_VALUES);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCities(lang));
  }, [dispatch, lang]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) return;
    setSubmitting(true);
    try {
      const result = await dispatch(submitBroker(formData));
      if (submitBroker.fulfilled.match(result)) {
        router.push('/services/application-submitted');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="page-stack max-w-authLg mx-auto">
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent('broker_questionnaire_title')}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">
              {getContent('contact_info')}
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField id="bq-firstName" label={getContent('first_name')}>
                <input
                  id="bq-firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={getContent('first_name')}
                  required
                  className="input-base"
                />
              </FormField>
              <FormField id="bq-lastName" label={getContent('last_name')}>
                <input
                  id="bq-lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={getContent('last_name')}
                  required
                  className="input-base"
                />
              </FormField>
            </div>
            <FormField id="bq-phone" label={getContent('phone')}>
              <input
                id="bq-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={getContent('phone')}
                required
                className="input-base"
              />
            </FormField>
            <FormField id="bq-email" label={getContent('email')}>
              <input
                id="bq-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={getContent('email')}
                required
                className="input-base"
              />
            </FormField>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">
              {getContent('location')}
            </legend>
            <FormField id="bq-city" label={getContent('select_city')}>
              <select
                id="bq-city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-base"
              >
                <option value="">{getContent('select_city')}</option>
                {(Array.isArray(cities) ? cities : []).map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField id="bq-address" label={getContent('address')}>
              <input
                id="bq-address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={getContent('address')}
                className="input-base"
              />
            </FormField>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">
              {getContent('professional_info')}
            </legend>
            <FormField id="bq-licenseNumber" label={getContent('license_number')}>
              <input
                id="bq-licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder={getContent('license_number')}
                className="input-base"
              />
            </FormField>
            <FormField id="bq-companyName" label={getContent('company_name')}>
              <input
                id="bq-companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder={getContent('company_name')}
                className="input-base"
              />
            </FormField>
            <FormField id="bq-experience" label={getContent('experience_years')}>
              <input
                id="bq-experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                placeholder={getContent('experience_years')}
                className="input-base"
              />
            </FormField>
            <FormField id="bq-specialization" label={getContent('specialization')}>
              <input
                id="bq-specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder={getContent('specialization')}
                className="input-base"
              />
            </FormField>
          </fieldset>

          <FormField id="bq-additionalInfo" label={getContent('additional_info')}>
            <textarea
              id="bq-additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder={getContent('additional_info')}
              rows={4}
              className="input-base resize-none"
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
              </a>{' '}
              {getContent('and')}{' '}
              <a href="/privacy-policy" className="text-accent-primary hover:underline">
                {getContent('privacy_policy')}
              </a>
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting || !formData.agreeTerms}
            className="btn-primary-lg"
          >
            {submitting ? getContent('loading') : getContent('submit')}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default BrokerQuestionnaire;
