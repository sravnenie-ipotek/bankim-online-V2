'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import Container from '@/components/ui/Container/Container';
import { VacancyTag } from '@/components/ui/VacancyTag';
import { VacancyCategoryBadge } from '@/components/ui/VacancyCategoryBadge';
import { trackClick } from '@/helpers/analytics';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  fetchVacancyList,
  selectVacancyListEntry,
  selectVacancyListLoading,
} from '@/store/slices/vacancySlice';

const CATEGORIES = ['all', 'development', 'marketing', 'support', 'management', 'finance'];

const EMPLOYMENT_LABELS: Record<string, string> = {
  fulltime: 'vacancy_employment_fulltime',
  full_time: 'vacancy_employment_fulltime',
  parttime: 'vacancy_employment_parttime',
  part_time: 'vacancy_employment_parttime',
  contract: 'vacancy_employment_contract',
  temporary: 'vacancy_employment_temporary',
};

/**
 * Vacancies list page: category filter, RTK fetchVacancyList, vacancy cards with links to detail.
 */
const Vacancies: React.FC = () => {
  const { i18n } = useTranslation();
  useContentFetch('vacancies');
  const { getContent } = useContentApi('vacancies');
  const dispatch = useAppDispatch();
  const lang = i18n.language || 'en';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const listEntry = useAppSelector(selectVacancyListEntry(lang, selectedCategory));
  const loading = useAppSelector(selectVacancyListLoading(lang, selectedCategory));
  const vacancies = useMemo(
    () => (Array.isArray(listEntry?.data) ? listEntry.data : []),
    [listEntry]
  );
  const error = listEntry?.error ?? null;

  const filteredVacancies = useMemo(() => {
    if (selectedCategory === 'all') return vacancies;
    return vacancies.filter((v) => v.category === selectedCategory);
  }, [vacancies, selectedCategory]);

  useEffect(() => {
    dispatch(fetchVacancyList({ language: lang, category: selectedCategory }));
  }, [dispatch, lang, selectedCategory]);

  const handleRetry = (): void => {
    dispatch(fetchVacancyList({ language: lang, category: selectedCategory }));
  };

  return (
    <Container>
      <div className="page-stack">
        <div className="flex flex-col gap-2">
          <h1 className="text-[clamp(1.9375rem,2rem+1vw,3rem)] font-medium text-textTheme-primary">
            {getContent('vacancies_title')}
          </h1>
          <p className="text-base text-textTheme-secondary">{getContent('vacancies_subtitle')}</p>
        </div>

        {/* Category tabs: horizontal scroll on mobile, wrap on larger screens */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 sm:overflow-visible scrollbar-thin">
          <div
            role="tablist"
            aria-label={getContent('vacancies_title')}
            className="flex flex-nowrap sm:flex-wrap gap-0 sm:gap-0 border-b border-base-stroke min-w-0"
          >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 font-medium transition-colors border-b-2 -mb-px text-[clamp(0.75rem,1.111vw,1rem)] ${
                  isSelected
                    ? 'border-accent-primary text-textTheme-primary'
                    : 'border-transparent text-textTheme-secondary hover:text-textTheme-primary hover:border-base-stroke'
                }`}
              >
                {category === 'all'
                  ? getContent('all')
                  : getContent(`vacancies_category_${category}`)}
              </button>
            );
          })}
          </div>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 py-16">
            <p className="text-red-400">{getContent('error_loading_vacancies')}</p>
            <button type="button" onClick={handleRetry} className="btn-primary-sm">
              {getContent('retry')}
            </button>
          </div>
        )}

        {!loading && !error && filteredVacancies.length === 0 && (
          <p className="text-textTheme-secondary text-center py-16">
            {getContent('vacancies_no_results')}
          </p>
        )}

        {!loading && !error && filteredVacancies.length > 0 && (
          <div className="flex flex-col gap-6 items-center sm:items-stretch">
            {filteredVacancies.map((vacancy) => (
              <Link
                key={vacancy.id}
                href={`/vacancies/${vacancy.id}`}
                onClick={() => trackClick('vacancy_card', vacancy.id)}
                className="surface-card-hover flex flex-col gap-3 p-6 w-[clamp(280px,93.33vw,350px)] min-h-[clamp(260px,91.2vw,342px)] sm:w-full sm:min-h-[clamp(180px,15.97vw,230px)] box-border"
              >
                {/* Mobile: category up, title mid, location below. Sm+: row with title+category and location */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 min-w-0 flex-1 rtl:justify-start order-1 sm:order-1 rtl:sm:order-1">
                    {vacancy.category && (
                      <span className="order-1 sm:order-2 rtl:sm:order-1">
                        <VacancyCategoryBadge
                          categoryLabel={getContent(`vacancies_category_${vacancy.category}`) || vacancy.category}
                        />
                      </span>
                    )}
                    <h3 className="text-[31px] font-semibold text-textTheme-primary min-w-0 order-2 sm:order-1 rtl:sm:order-2">{vacancy.title}</h3>
                  </div>
                  {vacancy.location && (
                    <span className="inline-flex items-center gap-2 shrink-0 order-3 sm:order-2 rtl:sm:order-2">
                      <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-base-tagBg">
                        <Image
                          src="/static/tags/location-icon.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                        />
                      </span>
                      <span className="text-textTheme-secondary text-sm">{vacancy.location}</span>
                    </span>
                  )}
                </div>
                <div className="flex-1 flex items-center min-h-0 sm:items-stretch w-full max-w-[clamp(280px,73.89vw,1064px)]">
                  <p className="text-[clamp(0.875rem,1.111vw,1rem)] text-textTheme-secondary line-clamp-2 w-full min-h-0 sm:flex-1">
                    {vacancy.description}
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap mt-auto items-center">
                  <VacancyTag showBackground={false} className="text-[clamp(0.875rem,1.25vw,1.125rem)]" iconSrc={getContent('vacancyDetail.applicationForm.icons.tag')}>
                    {getContent(EMPLOYMENT_LABELS[vacancy.employment_type] || vacancy.employment_type)}
                  </VacancyTag>
                  {(vacancy.salary_from != null || vacancy.salary_min != null) && (
                    <VacancyTag showBackground={false} className="text-[clamp(0.875rem,1.25vw,1.125rem)]" iconType="nis" iconSrc={getContent('vacancyDetail.applicationForm.icons.nis')}>
                      {getContent('vacancy_salary_from')} ₪{Number(vacancy.salary_from ?? vacancy.salary_min).toLocaleString()}
                    </VacancyTag>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Vacancies;
