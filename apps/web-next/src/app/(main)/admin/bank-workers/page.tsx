'use client';

import React, { useEffect, useState } from 'react';

import Container from '@/components/ui/Container/Container';
import FormField from '@/components/ui/FormField/FormField';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  fetchBankWorkerData,
  sendBankWorkerInvitation,
  approveBankWorker,
  rejectBankWorker,
  selectBankWorkerInvitations,
  selectBankWorkerApprovals,
  selectBankWorkerLoading,
} from '@/store/slices/adminSlice';

type TabType = 'invitations' | 'approvals';

/**
 * Admin bank workers page: invitations and approval queue via RTK; send invite, approve/reject.
 */
const BankWorkerManagement: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<TabType>('invitations');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteBank, setInviteBank] = useState('');
  const [sending, setSending] = useState(false);

  const invitations = useAppSelector(selectBankWorkerInvitations);
  const approvals = useAppSelector(selectBankWorkerApprovals);
  const loading = useAppSelector(selectBankWorkerLoading);

  useEffect(() => {
    dispatch(fetchBankWorkerData());
  }, [dispatch]);

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const result = await dispatch(
        sendBankWorkerInvitation({ email: inviteEmail, bank: inviteBank })
      );
      if (sendBankWorkerInvitation.fulfilled.match(result)) {
        setInviteEmail('');
        setInviteBank('');
      }
    } finally {
      setSending(false);
    }
  };

  const handleApprove = (id: string): void => {
    dispatch(approveBankWorker(id));
  };

  const handleReject = (id: string): void => {
    dispatch(rejectBankWorker(id));
  };

  return (
    <Container>
      <div className="page-stack">
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent('bank_worker_management')}
        </h1>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('invitations')}
            className={`tab-btn ${activeTab === 'invitations' ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            {getContent('invitations')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('approvals')}
            className={`tab-btn ${activeTab === 'approvals' ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            {getContent('approval_queue')}
          </button>
        </div>

        {activeTab === 'invitations' && (
          <div className="flex flex-col gap-6">
            <form onSubmit={handleSendInvitation} className="flex gap-4 items-end flex-wrap">
              <FormField id="admin-invite-email" label={getContent('email')}>
                <input
                  id="admin-invite-email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  type="email"
                  placeholder={getContent('email')}
                  required
                  className="input-base"
                />
              </FormField>
              <FormField id="admin-invite-bank" label={getContent('bank_name')}>
                <input
                  id="admin-invite-bank"
                  value={inviteBank}
                  onChange={(e) => setInviteBank(e.target.value)}
                  placeholder={getContent('bank_name')}
                  required
                  className="input-base"
                />
              </FormField>
              <button type="submit" disabled={sending} className="btn-primary-md">
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
                  <div key={inv.id} className="surface-card flex justify-between items-center p-4">
                    <div>
                      <span className="text-textTheme-primary">{inv.email}</span>
                      <span className="text-textTheme-secondary text-sm ml-4">{inv.bank}</span>
                    </div>
                    <span
                      className={`text-sm px-2 py-1 rounded ${inv.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}
                    >
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
                <div key={item.id} className="surface-card flex justify-between items-center p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-textTheme-primary font-medium">{item.name}</span>
                    <span className="text-textTheme-secondary text-sm">
                      {item.email} - {item.bank} - {item.position}
                    </span>
                  </div>
                  {item.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                      >
                        {getContent('approve')}
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                      >
                        {getContent('reject')}
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-sm px-2 py-1 rounded ${item.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                    >
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
  );
};

export default BankWorkerManagement;
