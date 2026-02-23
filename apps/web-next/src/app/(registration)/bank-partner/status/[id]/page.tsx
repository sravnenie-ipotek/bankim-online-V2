'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  fetchBankWorkerStatus,
  selectBankWorkerStatusEntry,
  selectBankWorkerStatusLoading,
} from '@/store/slices/bankWorkerSlice';

/**
 * Bank partner status page: fetches status via RTK (fetchBankWorkerStatus), displays status and link to personal cabinet.
 */
const BankPartnerStatus: React.FC = () => {
  useContentFetch('common');
  const { getContent } = useContentApi('common');
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const entry = useAppSelector(selectBankWorkerStatusEntry(id));
  const loading = useAppSelector(selectBankWorkerStatusLoading(id));
  const statusData = entry?.data ?? null;

  useEffect(() => {
    if (!id) return;
    dispatch(fetchBankWorkerStatus(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    approved: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-authMd surface-card-p8">
        <h1 className="text-2xl font-medium text-textTheme-primary text-center mb-6">
          {getContent('registration_status')}
        </h1>

        {statusData ? (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-textTheme-secondary">{getContent('status')}</span>
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${statusColors[statusData.status] || 'bg-base-base800 text-textTheme-secondary'}`}
              >
                {statusData.status}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-textTheme-secondary">{getContent('name')}</span>
                <span className="text-textTheme-primary">{statusData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textTheme-secondary">{getContent('bank')}</span>
                <span className="text-textTheme-primary">{statusData.bank}</span>
              </div>
            </div>

            {statusData.message && (
              <p className="text-textTheme-secondary text-sm bg-base-base800 p-4 rounded-lg">
                {statusData.message}
              </p>
            )}

            {statusData.status === 'approved' && (
              <button onClick={() => router.push('/personal-cabinet')} className="btn-primary-full">
                {getContent('go_to_personal_cabinet')}
              </button>
            )}
          </div>
        ) : (
          <p className="text-textTheme-secondary text-center">{getContent('status_not_found')}</p>
        )}
      </div>
    </div>
  );
};

export default BankPartnerStatus;
