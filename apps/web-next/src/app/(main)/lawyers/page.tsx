'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import type { LawyersFormValues } from './interfaces/LawyersFormValues';
import Container from '@/components/ui/Container/Container';
import FormField from '@/components/ui/FormField/FormField';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  fetchCities,
  fetchRegions,
  selectReferenceEntry,
} from '@/store/slices/referenceSlice';
import { submitLawyer } from '@/store/slices/lawyersSlice';

const INITIAL_VALUES: LawyersFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  region: '',
  profession: '',
  licenseNumber: '',
  experience: '',
  additionalInfo: '',
};

const LawyersPage: React.FC = () => {
  const { i18n } = useTranslation();
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = i18n.language || 'en';
  const citiesEntry = useAppSelector(selectReferenceEntry('cities', lang));
  const regionsEntry = useAppSelector(selectReferenceEntry('regions', lang));
  const cities = citiesEntry?.data ?? [];
  const regions = regionsEntry?.data ?? [];

  const [formData, setFormData] = useState<LawyersFormValues>(INITIAL_VALUES);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCities(lang));
    dispatch(fetchRegions(lang));
  }, [dispatch, lang]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await dispatch(submitLawyer(formData));
      if (submitLawyer.fulfilled.match(result)) {
        router.push('/lawyer-success');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="page-stack max-w-authLg mx-auto">
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent('lawyers_form_title')}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">
              {getContent('personal_details')}
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField id="law-firstName" label={getContent('first_name')}>
                <input
                  id="law-firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={getContent('first_name')}
                  required
                  className="input-base"
                />
              </FormField>
              <FormField id="law-lastName" label={getContent('last_name')}>
                <input
                  id="law-lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={getContent('last_name')}
                  required
                  className="input-base"
                />
              </FormField>
            </div>
            <FormField id="law-email" label={getContent('email')}>
              <input
                id="law-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={getContent('email')}
                required
                className="input-base"
              />
            </FormField>
            <FormField id="law-phone" label={getContent('phone')}>
              <input
                id="law-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={getContent('phone')}
                required
                className="input-base"
              />
            </FormField>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">
              {getContent('professional_details')}
            </legend>
            <FormField id="law-city" label={getContent('select_city')}>
              <select
                id="law-city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-base"
              >
                <option value="">{getContent('select_city')}</option>
                {cities.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField id="law-region" label={getContent('select_region')}>
              <select
                id="law-region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="input-base"
              >
                <option value="">{getContent('select_region')}</option>
                {regions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField id="law-profession" label={getContent('profession')}>
              <input
                id="law-profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder={getContent('profession')}
                className="input-base"
              />
            </FormField>
            <FormField id="law-licenseNumber" label={getContent('license_number')}>
              <input
                id="law-licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder={getContent('license_number')}
                className="input-base"
              />
            </FormField>
            <FormField id="law-experience" label={getContent('experience_years')}>
              <input
                id="law-experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder={getContent('experience_years')}
                type="number"
                className="input-base"
              />
            </FormField>
          </fieldset>

          <FormField id="law-additionalInfo" label={getContent('additional_info')}>
            <textarea
              id="law-additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder={getContent('additional_info')}
              rows={4}
              className="input-base resize-none"
            />
          </FormField>

          <button type="submit" disabled={submitting} className="btn-primary-lg">
            {submitting ? getContent('loading') : getContent('submit')}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default LawyersPage;
