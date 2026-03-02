'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import FormField from '@/components/ui/FormField/FormField';
import FormError from '@/components/ui/FormError/FormError';
import { VacancyTag } from '@/components/ui/VacancyTag';
import PhoneInput from '@/components/ui/LoginDialog/PhoneInput/PhoneInput';
import DropdownSelect from '@/components/ui/DropdownSelect/DropdownSelect';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { trackClick } from '@/helpers/analytics';
import type { VacancyDetail } from '@/interfaces/VacancyDetail';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  fetchVacancyById,
  applyToVacancy,
  selectVacancyDetailEntry,
  selectVacancyDetailLoading,
} from '@/store/slices/vacancySlice';
import { fetchCities, selectReferenceEntry } from '@/store/slices/referenceSlice';

const EMPLOYMENT_LABELS: Record<string, string> = {
  fulltime: 'vacancy_employment_fulltime',
  full_time: 'vacancy_employment_fulltime',
  parttime: 'vacancy_employment_parttime',
  part_time: 'vacancy_employment_parttime',
  contract: 'vacancy_employment_contract',
  temporary: 'vacancy_employment_temporary',
};

function getLocationLabelFromCities(
  location: string,
  cityOptions: { value: string; label: string }[]
): string {
  const opt = cityOptions.find((o) => o.value === location || o.label === location);
  return opt ? opt.label : location;
}

/**
 * Normalize text field from DB into clean string[].
 * Strips leading bullet markers (•, -, *) so items are always plain text,
 * ready to be prefixed with a dash (-) in the render layer.
 */
function toBulletItems(value: string | string[] | null | undefined): string[] {
  if (Array.isArray(value)) return value.map((s) => s.replace(/^[\u2022\-\*]\s*/, '').trim()).filter(Boolean);
  if (value == null || value === '') return [];
  return String(value)
    .split(/\n/)
    .map((s) => s.replace(/^[\u2022\-\*]\s*/, '').trim())
    .filter(Boolean);
}

/**
 * Vacancy detail page: fetches vacancy via RTK (fetchVacancyById), shows detail and apply form.
 */
const VacancyDetailPage: React.FC = () => {
  const { i18n } = useTranslation();
  useContentFetch('vacancies');
  useContentFetch('common');
  const { getContent } = useContentApi('vacancies');
  const { getContent: getCommonContent } = useContentApi('common');
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const lang = i18n.language || 'en';

  const handleBack = () => {
    router.back();
  };

  const entry = useAppSelector(selectVacancyDetailEntry(id, lang));
  const loading = useAppSelector(selectVacancyDetailLoading(id, lang));
  const vacancy = entry?.data ?? null;
  const error = entry?.error ?? null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    coverLetter: '',
    expectedSalary: '',
    portfolioUrl: '',
  });
  const [phoneCountryCode, setPhoneCountryCode] = useState('972');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [portfolioUrlTouched, setPortfolioUrlTouched] = useState(false);

  const nameError =
    nameTouched && String(formData.name).trim() === ''
      ? getContent('vacancyDetail.applicationForm.validation.required')
      : null;

  const emailTrimmed = String(formData.email).trim();
  const isEmailValidFormat =
    emailTrimmed === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed);
  const emailError = !emailTouched
    ? null
    : emailTrimmed === ''
      ? getContent('vacancyDetail.applicationForm.validation.required')
      : !isEmailValidFormat
        ? getContent('vacancyDetail.applicationForm.validation.invalidEmail')
        : null;

  const phoneError =
    phoneTouched && String(formData.phone).trim() === ''
      ? getContent('vacancyDetail.applicationForm.validation.required')
      : null;

  const cityError =
    cityTouched && String(formData.city).trim() === ''
      ? getContent('vacancyDetail.applicationForm.validation.required')
      : null;

  const portfolioUrlTrimmed = String(formData.portfolioUrl ?? '').trim();
  const isPortfolioUrlValid =
    portfolioUrlTrimmed === '' ||
    (() => {
      try {
        const withScheme = portfolioUrlTrimmed.startsWith('http://') || portfolioUrlTrimmed.startsWith('https://')
          ? portfolioUrlTrimmed
          : `https://${portfolioUrlTrimmed}`;
        const url = new URL(withScheme);
        const hostname = url.hostname || '';
        const lastDot = hostname.lastIndexOf('.');
        const hasValidTld = lastDot > 0 && hostname.length - lastDot - 1 >= 2;
        return hasValidTld;
      } catch {
        return false;
      }
    })();
  const portfolioUrlError =
    portfolioUrlTouched && portfolioUrlTrimmed !== '' && !isPortfolioUrlValid
      ? getContent('vacancyDetail.applicationForm.validation.invalidUrl')
      : null;

  const isFormValid =
    String(formData.name).trim() !== '' &&
    String(formData.email).trim() !== '' &&
    isEmailValidFormat &&
    String(formData.phone).trim() !== '' &&
    String(formData.city).trim() !== '' &&
    isPortfolioUrlValid;

  const citiesEntry = useAppSelector(selectReferenceEntry('cities', lang));
  const cityOptions = citiesEntry?.data ?? [];

  useEffect(() => {
    if (!id) return;
    dispatch(fetchVacancyById({ id, language: lang }));
  }, [id, lang, dispatch]);

  useEffect(() => {
    dispatch(fetchCities(lang));
  }, [dispatch, lang]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setPhoneTouched(true);
    setCityTouched(true);
    setPortfolioUrlTouched(true);
    if (!isFormValid) return;
    setSubmitError(null);
    trackClick('vacancy_apply', id);
    setSubmitting(true);
    const applicantPhone = `+${phoneCountryCode}${formData.phone}`;
    try {
      const result = await dispatch(
        applyToVacancy({
          id,
          body: {
            applicant_name: formData.name,
            applicant_email: formData.email,
            applicant_phone: applicantPhone,
            applicant_city: formData.city,
            cover_letter: formData.coverLetter || undefined,
            expected_salary: (() => {
              const v = String(formData.expectedSalary).trim();
              if (!v) return undefined;
              const n = Number(v);
              return Number.isFinite(n) && n >= 0 ? n : undefined;
            })(),
            portfolio_url: formData.portfolioUrl?.trim() || undefined,
          },
        })
      );
      if (applyToVacancy.fulfilled.match(result)) {
        router.push('/vacancies/application-success');
        return;
      } else {
        const payload = result.payload as string | undefined;
        setSubmitError(payload || getContent('vacancyDetail.applicationForm.submitError'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
        </div>
      </Container>
    );
  }

  if (error || !vacancy) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-16">
          <h2 className="text-xl text-textTheme-primary">{getContent('vacancy_not_found')}</h2>
          <p className="text-textTheme-secondary">{getContent('vacancy_not_found_description')}</p>
          <Link href="/vacancies" className="btn-primary-sm">
            {getContent('vacancies.backToVacancies')}
          </Link>
        </div>
      </Container>
    );
  }

  const isSubmitting = submitting;

  return (
    <Container>
      <div className="page-stack">
        {/* Back */}
        <button className="flex items-center gap-2" onClick={handleBack}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: lang === 'he' ? 'rotate(0deg)' : 'rotate(180deg)' }}
          >
            <path d="M9 18L15 12L9 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {getCommonContent('back')}
        </button>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-medium text-textTheme-primary sm:text-2xl">
            {vacancy.title}
          </h1>
          <div className="flex gap-[10px] flex-wrap">
            {vacancy.employment_type != null && vacancy.employment_type !== '' && (
              <VacancyTag iconSrc={getContent('vacancyDetail.applicationForm.icons.tag')}>{getContent(EMPLOYMENT_LABELS[vacancy.employment_type] ?? vacancy.employment_type)}</VacancyTag>
            )}
            {vacancy.location && (
              <VacancyTag iconType="location" iconSrc={getContent('vacancyDetail.applicationForm.icons.location')}>
                {getLocationLabelFromCities(vacancy.location, cityOptions)}
              </VacancyTag>
            )}
            {vacancy.salary_min != null && (
              <VacancyTag iconType="nis" iconSrc={getContent('vacancyDetail.applicationForm.icons.nis')}>
                {Number(vacancy.salary_min).toLocaleString()}
              </VacancyTag>
            )}
          </div>
          {vacancy.salary_from && (
            <span className="text-accent-primary text-lg font-medium">
              {getContent('vacancy_salary_from')} ₪{vacancy.salary_from.toLocaleString()}
              {vacancy.salary_to ? ` - ₪${vacancy.salary_to.toLocaleString()}` : '+'}
            </span>
          )}
        </div>

        {/* Two-column layout on desktop: description (left) + form (right). Responsive: ~615px at 1440, scales to ~820px at 1920. */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[2.5rem] w-full">
          {/* Description column: width scales with viewport (42.7vw ≈ 615px @1440, 820px @1920) */}
          <div className="flex flex-col gap-6 min-w-0 lg:flex-[0_1_42.7vw]">
            <div>
              <h2 className="text-xl font-semibold text-textTheme-primary mb-3">
                {getContent('vacancyDetail.generalInfo')}
              </h2>
              <p className="text-textTheme-secondary leading-relaxed whitespace-pre-line">
                {vacancy.description}
              </p>
            </div>

            {toBulletItems(vacancy.responsibilities).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-textTheme-primary mb-3">
                  {getContent('vacancyDetail.responsibilities')}
                </h2>
                <ul className="list-none text-textTheme-secondary space-y-1">
                  {toBulletItems(vacancy.responsibilities).map((item, idx) => (
                    <li key={idx} className="flex gap-2"><span className="shrink-0">-</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {toBulletItems(vacancy.requirements).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-textTheme-primary mb-3">
                  {getContent('vacancyDetail.requirements')}
                </h2>
                <ul className="list-none text-textTheme-secondary space-y-1">
                  {toBulletItems(vacancy.requirements).map((item, idx) => (
                    <li key={idx} className="flex gap-2"><span className="shrink-0">-</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {toBulletItems(vacancy.nice_to_have).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-textTheme-primary mb-3">
                  {getContent('vacancyDetail.niceToHave')}
                </h2>
                <ul className="list-none text-textTheme-secondary space-y-1">
                  {toBulletItems(vacancy.nice_to_have).map((item, idx) => (
                    <li key={idx} className="flex gap-2"><span className="shrink-0">-</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {toBulletItems(vacancy.benefits).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-textTheme-primary mb-3">
                  {getContent('vacancyDetail.benefits')}
                </h2>
                <ul className="list-none text-textTheme-secondary space-y-1">
                  {toBulletItems(vacancy.benefits).map((item, idx) => (
                    <li key={idx} className="flex gap-2"><span className="shrink-0">-</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Application form column: ~590px @1440 (41vw), ~787px @1920 */}
          <div className="flex-shrink-0 w-full lg:w-[41vw] lg:max-w-[41vw]">
            <form onSubmit={handleSubmit} className="surface-card-p6 flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-textTheme-primary">
              {getContent('vacancyDetail.applicationForm.title')}
            </h3>
            <div className="flex flex-col lg:flex-row lg:gap-6 gap-6">
              {/* Row 1: Name | Phone (parallel); Row 2: Email | City (email under name, city under phone) */}
              <div className="flex flex-col gap-6 flex-1 min-w-0">
                <FormField
                  id="vac-app-name"
                  label={getContent('vacancyDetail.applicationForm.fullName')}
                  visibleLabel
                >
                  <input
                    id="vac-app-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={() => setNameTouched(true)}
                    placeholder={getContent('vacancyDetail.applicationForm.fullNamePlaceholder')}
                    required
                    className={
                      nameError
                        ? 'input-base h-[clamp(2.75rem,3.89vw,4.5rem)] border-2 border-error-validation focus:ring-error-validation'
                        : 'input-base h-[clamp(2.75rem,3.89vw,4.5rem)]'
                    }
                  />
                  {nameError && <FormError error={nameError} />}
                </FormField>
                <FormField
                  id="vac-app-email"
                  label={getContent('vacancyDetail.applicationForm.email')}
                  visibleLabel
                >
                  <input
                    id="vac-app-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => setEmailTouched(true)}
                    placeholder={getContent('vacancyDetail.applicationForm.emailPlaceholder')}
                    required
                    className={
                      emailError
                        ? 'input-base h-[clamp(2.75rem,3.89vw,4.5rem)] border-2 border-error-validation focus:ring-error-validation'
                        : 'input-base h-[clamp(2.75rem,3.89vw,4.5rem)]'
                    }
                  />
                  {emailError && <FormError error={emailError} />}
                </FormField>
                <FormField
                  id="vac-app-expectedSalary"
                  label={getContent('vacancyDetail.applicationForm.expectedSalary')}
                  visibleLabel
                >
                  <div className="flex items-center w-full h-[clamp(2.75rem,3.89vw,4.5rem)] rounded-lg border border-base-secondaryDefaultButton bg-base-inputs px-4 focus-within:ring-2 focus-within:ring-accent-primary focus-within:border-accent-primary">
                    <span className="text-textTheme-primary font-medium shrink-0 pr-2" aria-hidden>
                      ₪
                    </span>
                    <input
                      id="vac-app-expectedSalary"
                      type="number"
                      name="expectedSalary"
                      min={0}
                      step={1}
                      value={formData.expectedSalary}
                      onChange={handleInputChange}
                      placeholder={getContent('vacancyDetail.applicationForm.expectedSalaryPlaceholder')}
                      className="flex-1 min-w-0 bg-transparent py-3 text-textTheme-primary placeholder-textTheme-disabled outline-none"
                    />
                  </div>
                </FormField>
              </div>
              <div className="flex flex-col gap-6 flex-1 min-w-0">
                <FormField
                  id="vac-app-phone"
                  label={getContent('vacancyDetail.applicationForm.phone')}
                  visibleLabel
                >
                  <div className="w-full">
                    <PhoneInput
                      id="vac-app-phone"
                      value={formData.phone}
                      onChange={(digits) => setFormData((prev) => ({ ...prev, phone: digits }))}
                      countryCode={phoneCountryCode}
                      onCountryCodeChange={setPhoneCountryCode}
                      placeholder={getContent('vacancyDetail.applicationForm.phonePlaceholder')}
                      aria-label={getContent('vacancyDetail.applicationForm.phone')}
                      className="h-[clamp(2.75rem,3.89vw,4.5rem)]"
                      onBlur={() => setPhoneTouched(true)}
                    />
                    {phoneError && <FormError error={phoneError} />}
                  </div>
                </FormField>
                <FormField
                  id="vac-app-city"
                  label={getContent('vacancyDetail.applicationForm.city')}
                  visibleLabel
                >
                  <DropdownSelect
                    data={cityOptions}
                    title=""
                    placeholder={getContent('vacancyDetail.applicationForm.cityPlaceholder')}
                    value={formData.city}
                    onChange={(val) => setFormData((prev) => ({ ...prev, city: val }))}
                    onBlur={() => setCityTouched(true)}
                    searchable
                    searchPlaceholder={getContent('search')}
                    nothingFoundText={getContent('nothing_found')}
                    error={cityError ? true : undefined}
                  />
                  {cityError && <FormError error={cityError} />}
                </FormField>
                <FormField
                  id="vac-app-portfolioUrl"
                  label={getContent('vacancyDetail.applicationForm.portfolioUrl')}
                  visibleLabel
                >
                  <input
                    id="vac-app-portfolioUrl"
                    type="text"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={(e) => {
                      handleInputChange(e);
                      setPortfolioUrlTouched(true);
                    }}
                    onBlur={() => setPortfolioUrlTouched(true)}
                    placeholder={getContent('vacancyDetail.applicationForm.portfolioUrlPlaceholder')}
                    className={
                      portfolioUrlError
                        ? 'input-base h-[clamp(2.75rem,3.89vw,4.5rem)] border-2 border-error-validation focus:ring-error-validation'
                        : 'input-base h-[clamp(2.75rem,3.89vw,4.5rem)]'
                    }
                  />
                  {portfolioUrlError && <FormError error={portfolioUrlError} />}
                </FormField>
              </div>
            </div>
            {/* Resume and cover letter full width, under salary/portfolio */}
            <div className="flex flex-col gap-6 w-full">
              <FormField
                id="vac-app-resume"
                label={getContent('vacancyDetail.applicationForm.resume')}
                visibleLabel
              >
                {/* Container 100% width; height 132px @1440×1080, scales with vw: clamp(60px, 9.17vw, 176px) for 1920. */}
                <div className="flex justify-center w-full">
                  <label
                    htmlFor="vac-app-resume"
                    className="relative w-full h-[clamp(60px,9.17vw,176px)] flex justify-center items-center rounded-lg bg-base-inputs cursor-pointer"
                  >
                    <input
                      id="vac-app-resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      aria-label={getContent('vacancyDetail.applicationForm.fileInstruction')}
                    />
                    <span className="flex flex-col items-center justify-center gap-2 pointer-events-none px-4">
                      <img
                        src="/static/upload-icon.svg"
                        alt=""
                        width={32}
                        height={32}
                        className="w-[clamp(1.5rem,2.22vw,2.5rem)] h-[clamp(1.5rem,2.22vw,2.5rem)] shrink-0"
                        aria-hidden
                      />
                      {/* Text in 161×34 container @1440 (11.18vw × 2.36vw), responsive via clamp, font centered */}
                      <span className="flex items-center justify-center w-[clamp(100px,11.18vw,215px)] h-[clamp(24px,2.36vw,45px)] box-border">
                        <span className="text-textTheme-secondary text-center leading-tight whitespace-pre-line" style={{ fontSize: 'clamp(10px, 0.833vw, 14px)' }}>
                          {(() => {
                            const t = getContent('vacancyDetail.applicationForm.fileInstruction');
                            const parts = t.trim().split(/\s+/);
                            const rest = parts.length >= 2 ? parts.slice(0, -2).join(' ') : '';
                            const lastTwo = parts.length >= 1 ? parts.slice(-2).join(' ') : t;
                            return (
                              <>
                                {rest}
                                {rest ? ' ' : null}
                                <span className="text-accent-fileBadge">{lastTwo}</span>
                              </>
                            );
                          })()}
                        </span>
                      </span>
                    </span>
                  </label>
                </div>
                {file && (
                  <div className="mt-2 flex items-stretch w-full">
                    <div
                      dir="ltr"
                      className="flex items-center gap-1.5 w-[clamp(140px,12.29vw,236px)] h-[clamp(1.75rem,2.96vh,2.25rem)] px-2 box-border rounded-l rtl:rounded-l-none rtl:rounded-r bg-accent-fileBadge text-[#161616] shrink-0 overflow-hidden rtl:flex-row-reverse"
                    >
                      <img
                        src="/static/paper-icon.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4 shrink-0"
                        aria-hidden
                      />
                      <span className="flex-1 min-w-0 text-xs font-medium truncate leading-tight text-start rtl:text-end">{file.name}</span>
                    </div>
                    <div
                      dir="ltr"
                      className="flex items-center justify-start flex-1 min-w-0 h-[clamp(1.75rem,2.96vh,2.25rem)] px-3 box-border rounded-r rtl:rounded-r-none rtl:rounded-l bg-base-inputs font-inter font-normal text-xs text-textTheme-fileSize"
                    >
                      {file.size >= 1024 * 1024
                        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                        : `${(file.size / 1024).toFixed(1)} KB`}
                    </div>
                  </div>
                )}
              </FormField>
              <FormField
                id="vac-app-coverLetter"
                label={getContent('vacancyDetail.applicationForm.coverLetter')}
                visibleLabel
              >
                <textarea
                  id="vac-app-coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder={getContent('vacancyDetail.applicationForm.coverLetterPlaceholder')}
                  rows={4}
                  className="input-base resize-none w-full h-[clamp(5rem,8.105vw,9.625rem)]"
                />
              </FormField>
            </div>
            {submitError && (
              <p className="text-sm text-red-400">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={
                isFormValid && !isSubmitting
                  ? 'btn-primary-md'
                  : 'rounded-lg font-medium px-6 py-3 transition-colors bg-base-inputs text-textTheme-disabled cursor-not-allowed'
              }
            >
              {isSubmitting
                ? getContent('vacancyDetail.applicationForm.submitting')
                : getContent('vacancyDetail.applicationForm.submit')}
            </button>
          </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VacancyDetailPage;
