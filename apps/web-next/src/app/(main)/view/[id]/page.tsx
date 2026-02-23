'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import type { UserData } from './interfaces/UserData';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { fetchView, selectViewEntry, selectViewLoading } from '@/store/slices/viewSlice';

/**
 * View user details by id. Uses RTK view slice (fetchView thunk) for data.
 */
const ViewPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const entry = useAppSelector(selectViewEntry(id));
  const loading = useAppSelector(selectViewLoading(id));

  const user: UserData | null = entry?.data ?? null;
  const error = entry?.error ?? null;

  useEffect(() => {
    if (!id) return;
    dispatch(fetchView(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary" />
        </div>
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-16">
          <p className="text-red-400">User not found</p>
          <Link href="/" className="btn-primary-sm">
            Go Back
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-6 w-full my-8">
        <div className="surface-card-p6">
          <h2 className="text-2xl font-semibold text-textTheme-primary mb-4">User Details</h2>
          {Object.entries(user).map(([key, value], index) => (
            <div key={key || `field-${index}`} className="flex gap-4 py-2 border-b border-base-stroke last:border-b-0">
              <span className="text-sm font-medium text-textTheme-secondary capitalize w-32">
                {key}
              </span>
              <span className="text-sm text-textTheme-primary">{value || '-'}</span>
            </div>
          ))}
        </div>
        <Link href="/" className="btn-primary-sm w-fit inline-flex">
          Go Back
        </Link>
      </div>
    </Container>
  );
};

export default ViewPage;
