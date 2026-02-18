'use client'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Container from '@/components/ui/Container/Container'

type TabType = 'phone' | 'email'

export default function RegistrationPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>('phone')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // Registration API call would go here
      console.log('Registration:', formData)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary w-full'

  return (
    <Container>
      <div className="flex justify-center py-16">
        <div className="w-full max-w-[400px] p-8 bg-base-secondary rounded-lg">
          <h1 className="text-2xl font-medium text-textTheme-primary text-center mb-6">
            {t('registration_title')}
          </h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('phone')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'phone'
                  ? 'bg-accent-primary text-base-primary'
                  : 'bg-base-base800 text-textTheme-secondary'
              }`}
            >
              {t('phone')}
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'email'
                  ? 'bg-accent-primary text-base-primary'
                  : 'bg-base-base800 text-textTheme-secondary'
              }`}
            >
              {t('email')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder={t('full_name')} required className={inputClass} />

            {activeTab === 'phone' ? (
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t('phone_number')} required className={inputClass} />
            ) : (
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('email')} required className={inputClass} />
            )}

            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder={t('password')} required className={inputClass} />
            <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder={t('confirm_password')} required className={inputClass} />

            <p className="text-xs text-textTheme-secondary">
              {t('by_registering')}{' '}
              <Link href="/terms" className="text-accent-primary hover:underline">{t('terms_of_service')}</Link>
              {' '}{t('and')}{' '}
              <Link href="/privacy-policy" className="text-accent-primary hover:underline">{t('privacy_policy')}</Link>
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors disabled:opacity-50"
            >
              {submitting ? t('loading') : t('register')}
            </button>
          </form>

          <p className="text-sm text-textTheme-secondary text-center mt-4">
            {t('already_have_account')}{' '}
            <Link href="/login" className="text-accent-primary hover:underline">{t('login')}</Link>
          </p>
        </div>
      </div>
    </Container>
  )
}
