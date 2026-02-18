'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

export default function BankEmployeeRegister() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bank: '',
    position: '',
    branchNumber: '',
    employeeNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [banks, setBanks] = useState<Array<{ value: string; label: string }>>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/banks/list').then((r) => r.json()).then((d) => setBanks(d || [])).catch(() => {})
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const response = await fetch('/api/bank-employee/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        router.push('/bank-employee/registration-success')
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
          {t('bank_employee_registration')}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder={t('first_name')} required className={inputClass} />
            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder={t('last_name')} required className={inputClass} />
          </div>
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('email')} required className={inputClass} />
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t('phone')} required className={inputClass} />
          <select name="bank" value={formData.bank} onChange={handleChange} required className={inputClass}>
            <option value="">{t('select_bank')}</option>
            {banks.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
          <input name="position" value={formData.position} onChange={handleChange} placeholder={t('position')} required className={inputClass} />
          <input name="branchNumber" value={formData.branchNumber} onChange={handleChange} placeholder={t('branch_number')} className={inputClass} />
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
            {submitting ? t('loading') : t('register')}
          </button>
        </form>
      </div>
    </div>
  )
}
