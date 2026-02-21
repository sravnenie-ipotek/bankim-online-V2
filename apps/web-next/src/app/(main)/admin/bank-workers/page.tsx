'use client'

import React, { useEffect, useState } from 'react'

import type { ApprovalItem } from './interfaces/ApprovalItem'
import type { Invitation } from './interfaces/Invitation'
import Container from '@/components/ui/Container/Container'
import { useContentApi } from '@hooks/useContentApi'

type TabType = 'invitations' | 'approvals'

export default function BankWorkerManagement() {
  const { getContent } = useContentApi('common')
  const [activeTab, setActiveTab] = useState<TabType>('invitations')
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [approvals, setApprovals] = useState<ApprovalItem[]>([])
  const [loading, setLoading] = useState(true)

  // Invitation form
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteBank, setInviteBank] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [invRes, appRes] = await Promise.all([
          fetch('/api/bank-worker/invitations'),
          fetch('/api/bank-worker/approval-queue'),
        ])
        if (invRes.ok) setInvitations(await invRes.json())
        if (appRes.ok) setApprovals(await appRes.json())
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const response = await fetch('/api/bank-worker/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, bank: inviteBank }),
      })
      if (response.ok) {
        const newInv = await response.json()
        setInvitations((prev) => [...prev, newInv])
        setInviteEmail('')
        setInviteBank('')
      }
    } catch (err) {
      console.error('Failed to send invitation:', err)
    } finally {
      setSending(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await fetch(`/api/bank-worker/approve/${id}`, { method: 'POST' })
      setApprovals((prev) => prev.map((a) => a.id === id ? { ...a, status: 'approved' } : a))
    } catch (err) {
      console.error('Failed to approve:', err)
    }
  }

  const handleReject = async (id: string) => {
    try {
      await fetch(`/api/bank-worker/reject/${id}`, { method: 'POST' })
      setApprovals((prev) => prev.map((a) => a.id === id ? { ...a, status: 'rejected' } : a))
    } catch (err) {
      console.error('Failed to reject:', err)
    }
  }

  const inputClass = 'px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary'

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8">
        <h1 className="text-3xl font-medium text-textTheme-primary">{getContent('bank_worker_management')}</h1>

        <div className="flex gap-2">
          <button onClick={() => setActiveTab('invitations')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'invitations' ? 'bg-accent-primary text-base-primary' : 'bg-base-secondary text-textTheme-secondary'}`}>
            {getContent('invitations')}
          </button>
          <button onClick={() => setActiveTab('approvals')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'approvals' ? 'bg-accent-primary text-base-primary' : 'bg-base-secondary text-textTheme-secondary'}`}>
            {getContent('approval_queue')}
          </button>
        </div>

        {activeTab === 'invitations' && (
          <div className="flex flex-col gap-6">
            <form onSubmit={handleSendInvitation} className="flex gap-4 items-end flex-wrap">
              <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} type="email" placeholder={getContent('email')} required className={inputClass} />
              <input value={inviteBank} onChange={(e) => setInviteBank(e.target.value)} placeholder={getContent('bank_name')} required className={inputClass} />
              <button type="submit" disabled={sending} className="px-6 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors disabled:opacity-50">
                {sending ? getContent('sending') : getContent('send_invitation')}
              </button>
            </form>

            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto" />
            ) : invitations.length === 0 ? (
              <p className="text-textTheme-secondary">{getContent('no_invitations')}</p>
            ) : (
              <div className="flex flex-col gap-2">
                {invitations.map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center p-4 bg-base-secondary rounded-lg">
                    <div>
                      <span className="text-textTheme-primary">{inv.email}</span>
                      <span className="text-textTheme-secondary text-sm ml-4">{inv.bank}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded ${inv.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                      {inv.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="flex flex-col gap-2">
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto" />
            ) : approvals.length === 0 ? (
              <p className="text-textTheme-secondary">{getContent('no_pending_approvals')}</p>
            ) : (
              approvals.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-base-secondary rounded-lg">
                  <div className="flex flex-col gap-1">
                    <span className="text-textTheme-primary font-medium">{item.name}</span>
                    <span className="text-textTheme-secondary text-sm">{item.email} - {item.bank} - {item.position}</span>
                  </div>
                  {item.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(item.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                        {getContent('approve')}
                      </button>
                      <button onClick={() => handleReject(item.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                        {getContent('reject')}
                      </button>
                    </div>
                  ) : (
                    <span className={`text-sm px-2 py-1 rounded ${item.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {item.status}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Container>
  )
}
