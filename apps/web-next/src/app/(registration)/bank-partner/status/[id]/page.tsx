'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'

interface StatusData {
  id: string
  status: string
  name: string
  bank: string
  nextSteps?: string[]
  message?: string
}

export default function BankPartnerStatus() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [statusData, setStatusData] = useState<StatusData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/bank-worker/status/${id}`)
        if (response.ok) setStatusData(await response.json())
      } catch (err) {
        console.error('Failed to fetch status:', err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchStatus()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    approved: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] p-8 bg-base-secondary rounded-lg">
        <h1 className="text-2xl font-medium text-textTheme-primary text-center mb-6">
          {t('registration_status')}
        </h1>

        {statusData ? (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-textTheme-secondary">{t('status')}</span>
              <span className={`px-3 py-1 rounded text-sm font-medium ${statusColors[statusData.status] || 'bg-base-base800 text-textTheme-secondary'}`}>
                {statusData.status}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between"><span className="text-textTheme-secondary">{t('name')}</span><span className="text-textTheme-primary">{statusData.name}</span></div>
              <div className="flex justify-between"><span className="text-textTheme-secondary">{t('bank')}</span><span className="text-textTheme-primary">{statusData.bank}</span></div>
            </div>

            {statusData.message && (
              <p className="text-textTheme-secondary text-sm bg-base-base800 p-4 rounded-lg">{statusData.message}</p>
            )}

            {statusData.status === 'approved' && (
              <button
                onClick={() => router.push('/personal-cabinet')}
                className="w-full py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors"
              >
                {t('go_to_personal_cabinet')}
              </button>
            )}
          </div>
        ) : (
          <p className="text-textTheme-secondary text-center">{t('status_not_found')}</p>
        )}
      </div>
    </div>
  )
}
