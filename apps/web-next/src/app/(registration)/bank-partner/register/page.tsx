'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

export default function BankPartnerRegister() {
  const { t } = useTranslation()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bank: '',
    position: '',
    serviceType: '',
    password: '',
    confirmPassword: '',
  })
  const [banks, setBanks] = useState<Array<{ value: string; label: string }>>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/banks/list').then((r) => r.json()).then((d) => setBanks(d || [])).catch(() => {})
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) return
    setSubmitting(true)
    try {
      const response = await fetch('/api/bank-employee/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        router.push(`/bank-partner/status/${data.id}`)
      }
    } catch (err) {
      console.error('Registration error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary w-full'

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] p-8 bg-base-secondary rounded-lg">
        <h1 className="text-2xl font-medium text-textTheme-primary text-center mb-6">
          {t('bank_partner_registration')}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder={t('full_name')} required className={inputClass} />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('email')} required className={inputClass} />
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t('phone')} required className={inputClass} />
          <select name="bank" value={formData.bank} onChange={handleChange} required className={inputClass}>
            <option value="">{t('select_bank')}</option>
            {banks.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
          <input name="position" value={formData.position} onChange={handleChange} placeholder={t('position')} required className={inputClass} />
          <input name="serviceType" value={formData.serviceType} onChange={handleChange} placeholder={t('service_type')} className={inputClass} />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder={t('password')} required className={inputClass} />
          <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder={t('confirm_password')} required className={inputClass} />

          <button type="submit" disabled={submitting} className="w-full py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors disabled:opacity-50">
            {submitting ? t('loading') : t('register')}
          </button>
        </form>
      </div>
    </div>
  )
}
