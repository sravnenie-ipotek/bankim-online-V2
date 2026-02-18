'use client'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

import type { LawyersFormValues } from './interfaces/LawyersFormValues'
import Container from '@/components/ui/Container/Container'

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
}

export default function LawyersPage() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [formData, setFormData] = useState<LawyersFormValues>(INITIAL_VALUES)
  const [submitting, setSubmitting] = useState(false)
  const [cities, setCities] = useState<Array<{ value: string; label: string }>>([])
  const [regions, setRegions] = useState<Array<{ value: string; label: string }>>([])

  useEffect(() => {
    const lang = i18n.language || 'en'
    fetch(`/api/get-cities?lang=${lang}`).then((r) => r.json()).then((d) => setCities(d || [])).catch(() => {})
    fetch(`/api/get-regions?lang=${lang}`).then((r) => r.json()).then((d) => setRegions(d || [])).catch(() => {})
  }, [i18n.language])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch('/api/lawyers/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Submit failed')
      router.push('/lawyer-success')
    } catch (err) {
      console.error('Form submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8 max-w-[600px] mx-auto">
        <h1 className="text-3xl font-medium text-textTheme-primary">{t('lawyers_form_title')}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Personal Details */}
          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">{t('personal_details')}</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder={t('first_name')} required className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary" />
              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder={t('last_name')} required className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary" />
            </div>
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('email')} required className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary" />
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t('phone')} required className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary" />
          </fieldset>

          {/* Professional Details */}
          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">{t('professional_details')}</legend>
            <select name="city" value={formData.city} onChange={handleChange} className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary outline-none focus:ring-2 focus:ring-accent-primary">
              <option value="">{t('select_city')}</option>
              {cities.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <select name="region" value={formData.region} onChange={handleChange} className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary outline-none focus:ring-2 focus:ring-accent-primary">
              <option value="">{t('select_region')}</option>
              {regions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            <input name="profession" value={formData.profession} onChange={handleChange} placeholder={t('profession')} className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary" />
            <input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder={t('license_number')} className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary" />
            <input name="experience" value={formData.experience} onChange={handleChange} placeholder={t('experience_years')} type="number" className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary" />
          </fieldset>

          {/* Additional Info */}
          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder={t('additional_info')} rows={4} className="px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary resize-none" />

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors disabled:opacity-50"
          >
            {submitting ? t('loading') : t('submit')}
          </button>
        </form>
      </div>
    </Container>
  )
}
