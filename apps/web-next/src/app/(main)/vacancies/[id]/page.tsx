'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/ui/Container/Container'
import { useContentApi } from '@hooks/useContentApi'
import { trackClick } from '@/helpers/analytics'
import type { VacancyDetail } from '../interfaces/VacancyDetail'

const EMPLOYMENT_LABELS: Record<string, string> = {
  fulltime: 'vacancy_employment_fulltime',
  parttime: 'vacancy_employment_parttime',
  contract: 'vacancy_employment_contract',
  temporary: 'vacancy_employment_temporary',
}

export default function VacancyDetailPage() {
  const { i18n } = useTranslation()
  const { getContent } = useContentApi('vacancies')
  const params = useParams()
  const id = params.id as string

  const [vacancy, setVacancy] = useState<VacancyDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Application form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', coverLetter: '' })
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        setLoading(true)
        const lang = i18n.language || 'en'
        const response = await fetch(`/api/vacancies/${id}?lang=${lang}`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setVacancy(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchVacancy()
  }, [id, i18n.language])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0])
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    trackClick('vacancy_apply', id)
    setSubmitting(true)
    try {
      const body = new FormData()
      body.append('name', formData.name)
      body.append('email', formData.email)
      body.append('phone', formData.phone)
      body.append('coverLetter', formData.coverLetter)
      if (file) body.append('resume', file)

      const response = await fetch(`/api/vacancies/${id}/apply`, { method: 'POST', body })
      if (!response.ok) throw new Error('Submit failed')
      setSubmitted(true)
    } catch {
      setError('Failed to submit application')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
        </div>
      </Container>
    )
  }

  if (error || !vacancy) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-16">
          <h2 className="text-xl text-textTheme-primary">{getContent('vacancy_not_found')}</h2>
          <p className="text-textTheme-secondary">{getContent('vacancy_not_found_description')}</p>
          <Link
            href="/vacancies"
            className="px-4 py-2 bg-accent-primary text-base-primary rounded-lg hover:bg-accent-primaryActiveButton transition-colors"
          >
            {getContent('vacancies.backToVacancies')}
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8">
        {/* Breadcrumbs */}
        <nav className="flex gap-2 text-sm text-textTheme-secondary">
          <Link href="/" className="hover:text-accent-primary transition-colors">
            {getContent('navigation.home')}
          </Link>
          <span>/</span>
          <Link href="/vacancies" className="hover:text-accent-primary transition-colors">
            {getContent('vacancies.title')}
          </Link>
          <span>/</span>
          <span className="text-textTheme-primary">{vacancy.title}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-medium text-textTheme-primary sm:text-2xl">{vacancy.title}</h1>
          <div className="flex gap-3 flex-wrap">
            <span className="px-3 py-1 text-sm rounded bg-base-secondary text-textTheme-secondary">
              {getContent(`vacancies.categories.${vacancy.category}`)}
            </span>
            <span className="px-3 py-1 text-sm rounded bg-base-secondary text-textTheme-secondary">
              {getContent(EMPLOYMENT_LABELS[vacancy.employment_type] || vacancy.employment_type)}
            </span>
            {vacancy.location && (
              <span className="px-3 py-1 text-sm rounded bg-base-secondary text-textTheme-secondary flex items-center gap-1">
                📍 {vacancy.location}
              </span>
            )}
          </div>
          {vacancy.salary_from && (
            <span className="text-accent-primary text-lg font-medium">
              {getContent('vacancy_salary_from')} ₪{vacancy.salary_from.toLocaleString()}
              {vacancy.salary_to ? ` - ₪${vacancy.salary_to.toLocaleString()}` : '+'}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold text-textTheme-primary mb-3">{getContent('vacancyDetail.generalInfo')}</h2>
            <p className="text-textTheme-secondary leading-relaxed whitespace-pre-line">{vacancy.description}</p>
          </div>

          {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-textTheme-primary mb-3">{getContent('vacancyDetail.responsibilities')}</h2>
              <ul className="list-disc list-inside text-textTheme-secondary space-y-1">
                {vacancy.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {vacancy.requirements && vacancy.requirements.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-textTheme-primary mb-3">{getContent('vacancyDetail.requirements')}</h2>
              <ul className="list-disc list-inside text-textTheme-secondary space-y-1">
                {vacancy.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {vacancy.nice_to_have && vacancy.nice_to_have.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-textTheme-primary mb-3">{getContent('vacancyDetail.niceToHave')}</h2>
              <ul className="list-disc list-inside text-textTheme-secondary space-y-1">
                {vacancy.nice_to_have.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {vacancy.benefits && vacancy.benefits.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-textTheme-primary mb-3">{getContent('vacancyDetail.benefits')}</h2>
              <ul className="list-disc list-inside text-textTheme-secondary space-y-1">
                {vacancy.benefits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Application Form */}
        {submitted ? (
          <div className="p-8 bg-base-secondary rounded-lg text-center">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              {getContent('vacancyDetail.applicationForm.success')}
            </h3>
            <p className="text-textTheme-secondary">
              {getContent('vacancyDetail.applicationForm.successMessage')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-base-secondary rounded-lg">
            <h3 className="text-xl font-semibold text-textTheme-primary">
              {getContent('vacancyDetail.applicationForm.title')}
            </h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={getContent('vacancyDetail.applicationForm.fullNamePlaceholder')}
              required
              className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={getContent('vacancyDetail.applicationForm.emailPlaceholder')}
              required
              className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={getContent('vacancyDetail.applicationForm.phonePlaceholder')}
              className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary"
            />
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder={getContent('vacancyDetail.applicationForm.coverLetterPlaceholder')}
              rows={4}
              className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary resize-none"
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm text-textTheme-secondary">
                {getContent('vacancyDetail.applicationForm.resume')}
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="text-textTheme-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent-primary file:text-base-primary file:font-medium file:cursor-pointer"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? getContent('vacancyDetail.applicationForm.submitting') : getContent('vacancyDetail.applicationForm.submitApplication')}
            </button>
          </form>
        )}
      </div>
    </Container>
  )
}
