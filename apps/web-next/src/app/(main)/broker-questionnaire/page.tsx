'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import type { BrokerFormValues } from './interfaces/BrokerFormValues';
import type { BrokerFormErrors } from './interfaces/BrokerFormErrors';
import { BrokerQuestionnaireValidationHelper } from './helpers/BrokerQuestionnaireValidationHelper';
import Container from '@/components/ui/Container/Container';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { fetchCities, selectReferenceEntry } from '@/store/slices/referenceSlice';
import { submitBroker } from '@/store/slices/brokersSlice';
import type { SubmitBrokerPayload } from '@/store/slices/brokersSlice';
import FormLabel from '@/components/ui/LoginDialog/FormLabel/FormLabel';
import PhoneInput from '@/components/ui/LoginDialog/PhoneInput/PhoneInput';
import { WizardFrame } from '@/components/ui/WizardFrame';
import DropdownSelect from '@/components/ui/DropdownSelect/DropdownSelect';

const INITIAL_VALUES: BrokerFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  licenseNumber: '',
  experience: '',
  additionalInfo: '',
  desiredRegion: '',
  employmentType: '',
  monthlyIncome: '',
  hasClientCases: null,
  hasDebtCases: null,
  agreeTerms: false,
};

const EMPLOYMENT_TYPE_KEYS = [
  'broker_questionnaire_employment_type_employment',
  'broker_questionnaire_employment_type_business',
  'broker_questionnaire_employment_type_investments',
  'broker_questionnaire_employment_type_property',
  'broker_questionnaire_employment_type_no_income',
] as const;

const BrokerQuestionnaire: React.FC = () => {
  const { i18n } = useTranslation();
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = i18n.language || 'en';
  const direction: 'ltr' | 'rtl' =
    i18n.language?.startsWith('he') || i18n.language === 'iw' ? 'rtl' : 'ltr';
  const citiesEntry = useAppSelector(selectReferenceEntry('cities', lang));
  const cities = citiesEntry?.data ?? [];
  const employmentTypeOptions = EMPLOYMENT_TYPE_KEYS.map((key) => ({
    value: key,
    label: getContent(key),
  }));

  const [fullName, setFullName] = useState('');
  const [formData, setFormData] = useState<BrokerFormValues>(INITIAL_VALUES);
  const [countryCode, setCountryCode] = useState('972');
  const [errors, setErrors] = useState<BrokerFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCities(lang));
  }, [dispatch, lang]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined, submission: undefined }));
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFullName(e.target.value);
    setErrors((prev) => ({ ...prev, fullName: undefined, submission: undefined }));
  };

  const handlePhoneChange = (digits: string): void => {
    setFormData((prev) => ({ ...prev, phone: digits }));
    setErrors((prev) => ({ ...prev, phone: undefined, submission: undefined }));
  };

  const handleCountryCodeChange = (code: string): void => {
    setCountryCode(code);
    setErrors((prev) => ({ ...prev, phone: undefined, submission: undefined }));
  };

  const handleBooleanToggle = (field: 'hasClientCases' | 'hasDebtCases', value: boolean): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, submission: undefined }));
  };

  const fieldSizeClass = 'w-full max-w-[clamp(325px,22.569vw,433px)] h-[clamp(48px,3.333vw,64px)] box-border';
  const rowContainerClass = 'min-h-[clamp(84px,5.833vw,112px)]';
  const inputClassName =
    `${fieldSizeClass} text-broker-questionnaire-field bg-base-successCard border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:outline-none focus-visible:outline-none focus-visible:outline-offset-0 focus:border-accent-primary focus-visible:border-accent-primary focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 [&:focus-visible]:!outline-none [&:focus-visible]:!outline-offset-0 autofill:shadow-[inset_0_0_0px_1000px_#2A2B31] autofill:[-webkit-text-fill-color:hsla(0,0%,100%,1)]`.trim();
  const inputErrorClassName = 'border-error-validation focus:border-error-validation';
  const baseInputPaddingY = 'clamp(8px, 0.98vh, 12px)';
  const baseInputPaddingX = 'clamp(8px, 1.05vw, 12px)';

  const getFieldClassName = (fieldError?: string): string =>
    `${inputClassName} ${fieldError ? inputErrorClassName : ''}`;

  const getToggleClassName = (isActive: boolean): string => {
    const base =
      'flex-1 md:flex-none md:w-[clamp(154.5px,10.729vw,206px)] h-[clamp(48px,3.333vw,64px)] shrink-0 rounded text-[clamp(13px,0.97vw,15px)] font-medium cursor-pointer transition-colors text-center flex items-center justify-center outline-none focus:ring-0 focus:ring-offset-0';
    return isActive
      ? `${base} bg-accent-primary text-black`
      : `${base} bg-base-successCard border border-base-secondaryDefaultButton text-textTheme-secondary hover:bg-base-stroke`;
  };

  const getValidationParams = () => ({
    fullName,
    phone: formData.phone,
    email: formData.email,
    city: formData.city,
    desiredRegion: formData.desiredRegion,
    employmentType: formData.employmentType,
    monthlyIncome: formData.monthlyIncome,
    experience: formData.experience,
    hasClientCases: formData.hasClientCases,
    hasDebtCases: formData.hasDebtCases,
    additionalInfo: formData.additionalInfo,
    agreeTerms: formData.agreeTerms,
    getContent,
  });

  const isFormValid = (): boolean => {
    const nextErrors = BrokerQuestionnaireValidationHelper.validateForm(getValidationParams());
    return Object.keys(nextErrors).length === 0;
  };

  const validateForm = (): boolean => {
    const nextErrors = BrokerQuestionnaireValidationHelper.validateForm(getValidationParams());
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const performSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    const { firstName, lastName } = BrokerQuestionnaireValidationHelper.splitFullName(fullName);
    const payload: SubmitBrokerPayload = {
      ...formData,
      firstName,
      lastName,
      phone: `+${countryCode}${formData.phone.trim()}`,
      hasClientCases: formData.hasClientCases ?? false,
      hasDebtCases: formData.hasDebtCases ?? false,
    };

    setSubmitting(true);
    try {
      const result = await dispatch(submitBroker(payload));
      if (submitBroker.fulfilled.match(result)) {
        router.push('/services/application-submitted');
      } else {
        setErrors((prev) => ({
          ...prev,
          submission: getContent('broker_questionnaire_error_submission'),
        }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await performSubmit();
  };

  // #region agent log
  useEffect(() => {
    const container = document.querySelector('[data-debug-container]') as HTMLElement;
    const outerDiv = document.querySelector('[data-debug-outer]') as HTMLElement;
    const innerDiv = document.querySelector('[data-debug-inner]') as HTMLElement;
    const wizardWrapper = document.querySelector('[data-debug-wizard-wrapper]') as HTMLElement;
    const wizardFrame = document.querySelector('[data-debug-wizard-frame]') as HTMLElement;
    const els = { container, outerDiv, innerDiv, wizardWrapper, wizardFrame };
    const data: Record<string, Record<string, string>> = {};
    for (const [name, el] of Object.entries(els)) {
      if (!el) { data[name] = { error: 'not found' }; continue; }
      const cs = window.getComputedStyle(el);
      data[name] = {
        paddingBottom: cs.paddingBottom,
        paddingTop: cs.paddingTop,
        marginBottom: cs.marginBottom,
        minHeight: cs.minHeight,
        height: cs.height,
        offsetHeight: String(el.offsetHeight),
        gap: cs.gap,
      };
    }
    fetch('http://127.0.0.1:7242/ingest/aa60bfad-20a3-448e-86c5-898638c67ff4',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'319ecc'},body:JSON.stringify({sessionId:'319ecc',location:'page.tsx:useEffect',message:'computed-styles',data,timestamp:Date.now(),hypothesisId:'A-B-C'})}).catch(()=>{});
  }, []);
  // #endregion

  return (
    <Container className="max-[1240px]:px-0 w-full max-w-full max-[890px]:!pb-4" data-debug-container>
      <div className="flex w-full pt-[clamp(32px,4.167vw,72px)] max-md:pb-0 md:pb-[clamp(32px,4.167vw,72px)]" dir={direction} data-debug-outer>
        <div
          className="relative w-full max-w-full rounded-xl bg-transparent flex flex-col max-md:pb-0 md:pb-[clamp(16px,2.11vw,24px)]"
          data-debug-inner
          style={{
            paddingTop: 'clamp(16px, 2.11vw, 24px)',
            paddingInline: 'clamp(16px, 2.11vw, 24px)',
          }}
        >
          <h1
            className="w-full text-broker-questionnaire-title font-medium text-textTheme-primary text-left rtl:text-right"
            style={{ paddingBottom: 'clamp(12px, 1.56vh, 16px)' }}
          >
            {getContent('broker_questionnaire_title')}
          </h1>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 md:gap-[clamp(8px,0.833vw,16px)] [&_.form-label]:text-broker-questionnaire-label [&_input:focus-visible]:!outline-none [&_input:focus-visible]:!outline-offset-0 [&_textarea:focus-visible]:!outline-none [&_textarea:focus-visible]:!outline-offset-0"
            style={{ paddingTop: 'clamp(12px, 1.56vh, 16px)' }}
          >
            {/* Contact row */}
            <div className={rowContainerClass}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-[clamp(8px,0.833vw,16px)] min-w-0">
              <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0">
                <FormLabel htmlFor="bq-fullName">
                  {getContent('broker_questionnaire_full_name')}
                </FormLabel>
                <input
                  id="bq-fullName"
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder={getContent('broker_questionnaire_full_name_placeholder')}
                  required
                  className={getFieldClassName(errors.fullName)}
                  style={{
                    paddingTop: baseInputPaddingY,
                    paddingBottom: baseInputPaddingY,
                    paddingLeft: baseInputPaddingX,
                    paddingRight: baseInputPaddingX,
                  }}
                />
                {errors.fullName && (
                  <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0">
                <FormLabel htmlFor="bq-phone">
                  {getContent('broker_questionnaire_phone')}
                </FormLabel>
                <PhoneInput
                  id="bq-phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  countryCode={countryCode}
                  onCountryCodeChange={handleCountryCodeChange}
                  aria-label={getContent('broker_questionnaire_phone')}
                  className={`!max-w-[clamp(325px,22.569vw,433px)] h-[clamp(48px,3.333vw,64px)] text-broker-questionnaire-field bg-base-successCard outline-none focus:ring-0 focus:ring-offset-0 focus-within:border-accent-primary ${errors.phone ? '!border-error-validation focus-within:!border-error-validation' : ''}`}
                />
                {errors.phone && (
                  <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0 sm:col-span-2 md:col-span-1">
                <FormLabel htmlFor="bq-email">
                  {getContent('broker_questionnaire_email')}
                </FormLabel>
                <input
                  id="bq-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  dir="ltr"
                  placeholder={getContent('broker_questionnaire_email_placeholder')}
                  required
                  className={getFieldClassName(errors.email)}
                  style={{
                    paddingTop: baseInputPaddingY,
                    paddingBottom: baseInputPaddingY,
                    paddingLeft: baseInputPaddingX,
                    paddingRight: baseInputPaddingX,
                  }}
                />
                {errors.email && (
                  <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            </div>

            {/* Location row */}
            <div className={rowContainerClass}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-[clamp(8px,0.833vw,16px)] min-w-0">
              <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0">
                <FormLabel htmlFor="bq-city">
                  {getContent('broker_questionnaire_city')}
                </FormLabel>
                <DropdownSelect
                  data={Array.isArray(cities) ? cities : []}
                  placeholder={getContent('broker_questionnaire_city_placeholder')}
                  value={formData.city}
                  onChange={(val) => {
                    setFormData((prev) => ({ ...prev, city: val }));
                    setErrors((prev) => ({ ...prev, city: undefined, submission: undefined }));
                  }}
                  searchable
                  searchPlaceholder={getContent('search')}
                  nothingFoundText={getContent('nothing_found')}
                  error={errors.city ? true : undefined}
                  className="max-w-[clamp(325px,22.569vw,433px)]"
                />
                {errors.city && (
                  <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                    {errors.city}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0">
                <FormLabel htmlFor="bq-desiredRegion">
                  {getContent('broker_questionnaire_desired_region')}
                </FormLabel>
                <DropdownSelect
                  data={Array.isArray(cities) ? cities : []}
                  placeholder={getContent('broker_questionnaire_desired_region_placeholder')}
                  value={formData.desiredRegion}
                  onChange={(val) => {
                    setFormData((prev) => ({ ...prev, desiredRegion: val }));
                    setErrors((prev) => ({ ...prev, desiredRegion: undefined, submission: undefined }));
                  }}
                  searchable
                  searchPlaceholder={getContent('search')}
                  nothingFoundText={getContent('nothing_found')}
                  error={errors.desiredRegion ? true : undefined}
                  className="max-w-[clamp(325px,22.569vw,433px)]"
                />
                {errors.desiredRegion && (
                  <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                    {errors.desiredRegion}
                  </span>
                )}
              </div>
            </div>
            </div>

            <div className="w-full h-px bg-base-stroke shrink-0" aria-hidden="true" />

            {/* Work section */}
            <fieldset className="flex flex-col gap-5 md:gap-[clamp(8px,0.833vw,16px)] min-w-0">
              <legend className="text-broker-questionnaire-title font-semibold text-textTheme-primary mb-1 text-left rtl:text-right">
                {getContent('broker_questionnaire_work_section')}
              </legend>
              <div className={rowContainerClass}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-[clamp(8px,0.833vw,16px)]">
                <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0">
                  <FormLabel htmlFor="bq-employmentType">
                    {getContent('broker_questionnaire_employment_type')}
                  </FormLabel>
                  <DropdownSelect
                    data={employmentTypeOptions}
                    placeholder={getContent('broker_questionnaire_employment_type_placeholder')}
                    value={formData.employmentType}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, employmentType: val }));
                      setErrors((prev) => ({ ...prev, employmentType: undefined, submission: undefined }));
                    }}
                    error={errors.employmentType ? true : undefined}
                    className="max-w-[clamp(325px,22.569vw,433px)]"
                  />
                  {errors.employmentType && (
                    <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                      {errors.employmentType}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0">
                  <FormLabel htmlFor="bq-monthlyIncome">
                    {getContent('broker_questionnaire_monthly_income')}
                  </FormLabel>
                  <input
                    id="bq-monthlyIncome"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    placeholder={getContent('broker_questionnaire_monthly_income_placeholder')}
                    className={getFieldClassName(errors.monthlyIncome)}
                    style={{
                      paddingTop: baseInputPaddingY,
                      paddingBottom: baseInputPaddingY,
                      paddingLeft: baseInputPaddingX,
                      paddingRight: baseInputPaddingX,
                    }}
                  />
                  {errors.monthlyIncome && (
                    <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                      {errors.monthlyIncome}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0 sm:col-span-2 md:col-span-1">
                  <FormLabel htmlFor="bq-experience">
                    {getContent('broker_questionnaire_work_experience')}
                  </FormLabel>
                  <input
                    id="bq-experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder={getContent('broker_questionnaire_work_experience_placeholder')}
                    className={getFieldClassName(errors.experience)}
                    style={{
                      paddingTop: baseInputPaddingY,
                      paddingBottom: baseInputPaddingY,
                      paddingLeft: baseInputPaddingX,
                      paddingRight: baseInputPaddingX,
                    }}
                  />
                  {errors.experience && (
                    <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                      {errors.experience}
                    </span>
                  )}
                </div>
              </div>
              </div>
            </fieldset>

            <div className="w-full h-px bg-base-stroke shrink-0" aria-hidden="true" />

            {/* Additional information section */}
            <fieldset className="flex flex-col gap-5 md:gap-[clamp(8px,0.833vw,16px)] min-w-0 mt-[clamp(8px,0.833vw,16px)]">
              <legend className="text-broker-questionnaire-title font-semibold text-textTheme-primary mb-[clamp(8px,0.833vw,16px)] text-left rtl:text-right">
                {getContent('broker_questionnaire_additional_info')}
              </legend>

              <div className={rowContainerClass}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-[clamp(8px,0.833vw,16px)] min-w-0">
                <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0">
                  <FormLabel>{getContent('broker_questionnaire_has_client_cases')}</FormLabel>
                  <div className="flex gap-[clamp(6px,0.56vw,8px)]">
                    <button
                      type="button"
                      className={getToggleClassName(formData.hasClientCases === true)}
                      onClick={() => handleBooleanToggle('hasClientCases', true)}
                    >
                      {getContent('yes')}
                    </button>
                    <button
                      type="button"
                      className={getToggleClassName(formData.hasClientCases === false)}
                      onClick={() => handleBooleanToggle('hasClientCases', false)}
                    >
                      {getContent('no')}
                    </button>
                  </div>
                  {errors.hasClientCases && (
                    <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                      {errors.hasClientCases}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0">
                  <FormLabel>{getContent('broker_questionnaire_has_debt_cases')}</FormLabel>
                  <div className="flex gap-[clamp(6px,0.56vw,8px)]">
                    <button
                      type="button"
                      className={getToggleClassName(formData.hasDebtCases === true)}
                      onClick={() => handleBooleanToggle('hasDebtCases', true)}
                    >
                      {getContent('yes')}
                    </button>
                    <button
                      type="button"
                      className={getToggleClassName(formData.hasDebtCases === false)}
                      onClick={() => handleBooleanToggle('hasDebtCases', false)}
                    >
                      {getContent('no')}
                    </button>
                  </div>
                  {errors.hasDebtCases && (
                    <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                      {errors.hasDebtCases}
                    </span>
                  )}
                </div>
              </div>
              </div>

              <div className={rowContainerClass}>
              <div className="flex flex-col gap-[clamp(12px,3.43vw,16px)] min-w-0">
                <FormLabel htmlFor="bq-additionalInfo">
                  {getContent('broker_questionnaire_comments')}
                </FormLabel>
                <textarea
                  id="bq-additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder={getContent('broker_questionnaire_comments_placeholder')}
                  rows={4}
                  className={`${getFieldClassName(errors.additionalInfo)} resize-none !h-auto !max-w-[clamp(724px,50.278vw,965px)] min-h-[clamp(101px,7.014vw,135px)]`}
                  style={{
                    paddingTop: baseInputPaddingY,
                    paddingBottom: baseInputPaddingY,
                    paddingLeft: baseInputPaddingX,
                    paddingRight: baseInputPaddingX,
                  }}
                />
                {errors.additionalInfo && (
                  <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                    {errors.additionalInfo}
                  </span>
                )}
              </div>
              </div>
            </fieldset>

            {/* Terms */}
            <div className={`${rowContainerClass} flex flex-col gap-1 mt-[clamp(8px,0.833vw,16px)]`}>
              <label className="flex items-start gap-3 cursor-pointer text-left rtl:text-right">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 appearance-none w-4 h-4 shrink-0 rounded border border-textTheme-secondary bg-transparent checked:bg-transparent checked:border-accent-primary relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-accent-primary checked:after:text-xs checked:after:leading-none"
                />
                <span className="text-[clamp(12px,0.9722vw,14px)] text-textTheme-secondary">
                  {getContent('broker_questionnaire_agreement')}{' '}
                  <Link
                    href="/terms"
                    className="text-accent-forgotPasswordLink hover:underline"
                  >
                    {getContent('terms_of_service')}
                  </Link>{' '}
                  {getContent('and')}{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-accent-forgotPasswordLink hover:underline"
                  >
                    {getContent('privacy_policy')}
                  </Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                  {errors.agreeTerms}
                </span>
              )}
            </div>

            {errors.submission && (
              <span className="text-[clamp(11px,0.83vw,12px)] text-error-validation">
                {errors.submission}
              </span>
            )}

            <div className={`max-md:min-h-0 md:min-h-[clamp(84px,5.833vw,112px)]`} data-debug-wizard-wrapper>
              <WizardFrame
                backLabel={getContent('wizard_back')}
                submitLabel={submitting ? getContent('broker_questionnaire_submitting') : getContent('wizard_submit')}
                onBack={() => router.back()}
                onSubmit={() => void performSubmit()}
                submitDisabled={submitting || !isFormValid()}
                direction={direction}
                className="gap-[clamp(8px,0.833vw,16px)]"
              />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default BrokerQuestionnaire;
