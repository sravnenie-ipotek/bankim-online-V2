'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import Container from '@/components/ui/Container/Container';
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
  parttime: 'vacancy_employment_parttime',
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
    [listEntry?.data]
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

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`tab-btn ${selectedCategory === category ? 'tab-btn-active' : 'tab-btn-inactive'}`}
            >
              {category === 'all'
                ? getContent('all')
                : getContent(`vacancies_category_${category}`)}
            </button>
          ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVacancies.map((vacancy) => (
              <Link
                key={vacancy.id}
                href={`/vacancies/${vacancy.id}`}
                onClick={() => trackClick('vacancy_card', vacancy.id)}
                className="surface-card-hover flex flex-col gap-3 p-6"
              >
                <h3 className="text-lg font-semibold text-textTheme-primary">{vacancy.title}</h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 text-xs rounded bg-base-base800 text-textTheme-secondary">
                    {getContent(`vacancies_category_${vacancy.category}`)}
                  </span>
                  <span className="px-2 py-1 text-xs rounded bg-base-base800 text-textTheme-secondary">
                    {getContent(
                      EMPLOYMENT_LABELS[vacancy.employment_type] || vacancy.employment_type
                    )}
                  </span>
                </div>
                {vacancy.salary_from && (
                  <span className="text-accent-primary text-sm">
                    {getContent('vacancy_salary_from')} ₪{vacancy.salary_from.toLocaleString()}
                    {vacancy.salary_to ? ` - ₪${vacancy.salary_to.toLocaleString()}` : '+'}
                  </span>
                )}
                <p className="text-sm text-textTheme-secondary line-clamp-2">
                  {vacancy.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Vacancies;
