'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'

interface RegistrationForm {
  bank: string
  position: string
  name: string
}

export default function BankWorkerRegister() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const token = params.token as string

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    branch: '',
    employeeNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [registrationInfo, setRegistrationInfo] = useState<RegistrationForm | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/api/bank-worker/registration-form/${token}`)
        if (response.ok) {
          const data = await response.json()
          setRegistrationInfo(data)
          setFormData((prev) => ({ ...prev, name: data.name || '' }))
        }
      } catch (err) {
        console.error('Failed to fetch form:', err)
      } finally {
        setLoading(false)
      }
    }
    if (token) fetchForm()
  }, [token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) return
    setSubmitting(true)
    try {
      const response = await fetch('/api/bank-worker/complete-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, token }),
      })
      if (response.ok) {
        const data = await response.json()
        router.push(`/bank-worker/status/${data.id}`)
      }
    } catch (err) {
      console.error('Registration error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
      </div>
    )
  }

  const inputClass = 'px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary w-full'

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] p-8 bg-base-secondary rounded-lg">
        <h1 className="text-2xl font-medium text-textTheme-primary text-center mb-2">
          {t('bank_worker_registration')}
        </h1>
        {registrationInfo && (
          <p className="text-textTheme-secondary text-center mb-6">
            {registrationInfo.bank} - {registrationInfo.position}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder={t('full_name')} required className={inputClass} />
          <input name="position" value={formData.position} onChange={handleChange} placeholder={t('position')} required className={inputClass} />
          <input name="branch" value={formData.branch} onChange={handleChange} placeholder={t('branch')} className={inputClass} />
          <input name="employeeNumber" value={formData.employeeNumber} onChange={handleChange} placeholder={t('employee_number')} className={inputClass} />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder={t('password')} required className={inputClass} />
          <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder={t('confirm_password')} required className={inputClass} />

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mt-1 accent-accent-primary" />
            <span className="text-sm text-textTheme-secondary">
              {t('agree_to')} <a href="/terms" className="text-accent-primary hover:underline">{t('terms_of_service')}</a>
            </span>
          </label>

          <button type="submit" disabled={submitting || !formData.agreeTerms} className="w-full py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors disabled:opacity-50">
            {submitting ? t('loading') : t('complete_registration')}
          </button>
        </form>
      </div>
    </div>
  )
}
