'use client'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

import type { BrokerFormValues } from './interfaces/BrokerFormValues'
import Container from '@/components/ui/Container/Container'
import { useContentApi } from '@hooks/useContentApi'

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
}

export default function BrokerQuestionnaire() {
  const { i18n } = useTranslation()
  const { getContent } = useContentApi('common')
  const router = useRouter()
  const [formData, setFormData] = useState<BrokerFormValues>(INITIAL_VALUES)
  const [submitting, setSubmitting] = useState(false)
  const [cities, setCities] = useState<Array<{ value: string; label: string }>>([])

  useEffect(() => {
    const lang = i18n.language || 'en'
    fetch(`/api/get-cities?lang=${lang}`)
      .then((r) => r.json())
      .then((d) => {
        const list = Array.isArray(d) ? d : (d && Array.isArray(d.cities) ? d.cities : [])
        setCities(list)
      })
      .catch(() => setCities([]))
  }, [i18n.language])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeTerms) return
    setSubmitting(true)
    try {
      const response = await fetch('/api/brokers/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Submit failed')
      router.push('/services/application-submitted')
    } catch (err) {
      console.error('Broker form error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary w-full'

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8 max-w-[600px] mx-auto">
        <h1 className="text-3xl font-medium text-textTheme-primary">{getContent('broker_questionnaire_title')}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">{getContent('contact_info')}</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder={getContent('first_name')} required className={inputClass} />
              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder={getContent('last_name')} required className={inputClass} />
            </div>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={getContent('phone')} required className={inputClass} />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={getContent('email')} required className={inputClass} />
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">{getContent('location')}</legend>
            <select name="city" value={formData.city} onChange={handleChange} className={inputClass}>
              <option value="">{getContent('select_city')}</option>
              {(Array.isArray(cities) ? cities : []).map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <input name="address" value={formData.address} onChange={handleChange} placeholder={getContent('address')} className={inputClass} />
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-textTheme-primary mb-2">{getContent('professional_info')}</legend>
            <input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder={getContent('license_number')} className={inputClass} />
            <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder={getContent('company_name')} className={inputClass} />
            <input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder={getContent('experience_years')} className={inputClass} />
            <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder={getContent('specialization')} className={inputClass} />
          </fieldset>

          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder={getContent('additional_info')} rows={4} className={`${inputClass} resize-none`} />

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mt-1 accent-accent-primary" />
            <span className="text-sm text-textTheme-secondary">
              {getContent('agree_to')}{' '}
              <a href="/terms" className="text-accent-primary hover:underline">{getContent('terms_of_service')}</a>
              {' '}{getContent('and')}{' '}
              <a href="/privacy-policy" className="text-accent-primary hover:underline">{getContent('privacy_policy')}</a>
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting || !formData.agreeTerms}
            className="px-8 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors disabled:opacity-50"
          >
            {submitting ? getContent('loading') : getContent('submit')}
          </button>
        </form>
      </div>
    </Container>
  )
}
