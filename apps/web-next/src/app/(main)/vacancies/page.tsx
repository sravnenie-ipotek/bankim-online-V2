'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useContentApi } from '@hooks/useContentApi'
import Container from '@/components/ui/Container/Container'
import { trackClick } from '@/helpers/analytics'
import type { Vacancy } from './interfaces/Vacancy'

const CATEGORIES = ['all', 'development', 'marketing', 'support', 'management', 'finance']

const EMPLOYMENT_LABELS: Record<string, string> = {
  fulltime: 'vacancy_employment_fulltime',
  parttime: 'vacancy_employment_parttime',
  contract: 'vacancy_employment_contract',
  temporary: 'vacancy_employment_temporary',
}

const Vacancies: React.FC = () => {
  const { i18n } = useTranslation()
  const { getContent } = useContentApi('vacancies')
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const fetchVacancies = async () => {
    try {
      setLoading(true)
      setError(null)
      const lang = i18n.language || 'en'
      const categoryParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''
      const response = await fetch(`/api/vacancies?lang=${lang}&active_only=true${categoryParam}`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      const list = Array.isArray(data?.vacancies) ? data.vacancies : Array.isArray(data) ? data : []
      setVacancies(list)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVacancies()
  }, [selectedCategory, i18n.language])

  const filteredVacancies = useMemo(() => {
    const list = Array.isArray(vacancies) ? vacancies : []
    if (selectedCategory === 'all') return list
    return list.filter((v) => v.category === selectedCategory)
  }, [vacancies, selectedCategory])

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-medium text-textTheme-primary sm:text-[1.9375rem]">
            {getContent('vacancies_title')}
          </h1>
          <p className="text-base text-textTheme-secondary">{getContent('vacancies_subtitle')}</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-accent-primary text-base-primary'
                  : 'bg-base-secondary text-textTheme-secondary hover:bg-base-base800'
              }`}
            >
              {category === 'all' ? getContent('all') : getContent(`vacancies_category_${category}`)}
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
            <button
              onClick={fetchVacancies}
              className="px-4 py-2 bg-accent-primary text-base-primary rounded-lg hover:bg-accent-primaryActiveButton transition-colors"
            >
              {getContent('retry')}
            </button>
          </div>
        )}

        {!loading && !error && filteredVacancies.length === 0 && (
          <p className="text-textTheme-secondary text-center py-16">{getContent('vacancies_no_results')}</p>
        )}

        {!loading && !error && filteredVacancies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVacancies.map((vacancy) => (
              <Link
                key={vacancy.id}
                href={`/vacancies/${vacancy.id}`}
                onClick={() => trackClick('vacancy_card', vacancy.id)}
                className="flex flex-col gap-3 p-6 bg-base-secondary rounded-lg hover:bg-base-base800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-textTheme-primary">{vacancy.title}</h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 text-xs rounded bg-base-base800 text-textTheme-secondary">
                    {getContent(`vacancies_category_${vacancy.category}`)}
                  </span>
                  <span className="px-2 py-1 text-xs rounded bg-base-base800 text-textTheme-secondary">
                    {getContent(EMPLOYMENT_LABELS[vacancy.employment_type] || vacancy.employment_type)}
                  </span>
                </div>
                {vacancy.salary_from && (
                  <span className="text-accent-primary text-sm">
                    {getContent('vacancy_salary_from')} ₪{vacancy.salary_from.toLocaleString()}
                    {vacancy.salary_to ? ` - ₪${vacancy.salary_to.toLocaleString()}` : '+'}
                  </span>
                )}
                <p className="text-sm text-textTheme-secondary line-clamp-2">{vacancy.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export default Vacancies
