'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

import { StorageHelper } from '@/helpers/StorageHelper';
import { useContentApi } from '@hooks/useContentApi';
import { getImagePath } from '@/helpers/getImagePath';
import { COOKIE_CONSENT_ACCEPTED_EVENT } from '@/components/analytics/GoogleAnalytics';
import type { SkipCookieState } from './interfaces/SkipCookieState';

const INITIAL_STATE: SkipCookieState = { mounted: false, isVisible: false };

const SkipCookie: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const [state, setState] = useState<SkipCookieState>(INITIAL_STATE);

  useEffect(() => {
    const cookieValue = StorageHelper.getItem('cookie');
    const isVisible = cookieValue !== '1';
    const id = setTimeout(() => {
      setState({ mounted: true, isVisible });
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const handleAccept = () => {
    setState((prev) => ({ ...prev, isVisible: false }));
    StorageHelper.setItem('cookie', '1');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_ACCEPTED_EVENT));
    }
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, isVisible: false }));
  };

  if (!state.mounted || !state.isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-toast max-sm:z-[10002] px-4 max-sm:px-[5%] sm:px-6 md:px-8">
      <div className="flex justify-between items-center gap-4 rounded-[11px] bg-[rgb(53,55,63)] py-4 px-4 w-full min-h-[80px] max-sm:flex-col max-sm:min-h-0 max-sm:w-[max(320px,min(350px,89.74vw))] max-sm:min-h-[223px] max-sm:py-5 max-sm:px-5 max-sm:pb-5 xs:max-w-[350px] sm:max-w-[600px] sm:min-h-[90px] sm:py-5 sm:px-6 md:max-w-[750px] md:min-h-[100px] md:px-6 lg:w-[850px] lg:max-w-[850px] lg:h-[111px] lg:py-6 lg:px-8 max-sm:gap-3">
        {/* 1. Mobile: X + cookie in same row. Desktop/tablet: cookie only (X is near I accept). */}
        <div className="flex shrink-0 max-sm:w-full max-sm:flex-row max-sm:items-start max-sm:justify-between sm:flex-row sm:items-start sm:justify-start sm:gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 w-8 h-8 p-0 border-0 bg-transparent cursor-pointer flex items-center justify-center sm:hidden"
            aria-label="Close cookie notice"
          >
            <Image
              src={getImagePath(getContent, 'close_icon', '/static/x.svg')}
              width={32}
              height={32}
              alt=""
              aria-hidden
              className="w-8 h-8 object-contain"
            />
          </button>
          <div className="relative shrink-0 w-[52px] h-[52px]">
            <Image
              src={getImagePath(getContent, 'cookie_icon', '/static/cookie.svg')}
              fill
              className="object-contain"
              alt=""
              sizes="52px"
            />
          </div>
          <div className="w-8 shrink-0 sm:hidden" aria-hidden />
        </div>
        {/* 2. Text. Same order after X and cookie. */}
        <div className="flex flex-col gap-1 min-w-0 flex-1 py-2 max-w-[439px] max-sm:text-center sm:text-left sm:rtl:text-right max-sm:py-0 max-sm:max-w-none max-sm:flex-1 max-sm:min-h-0">
          <span className="text-cookie leading-cookie text-base-white">
            {getContent('shared_component_cookie_message')}
          </span>
          <a
            href="/cookie"
            className="text-cookie leading-cookie text-accent-forgotPasswordLink hover:text-accent-forgotPasswordLink/90 cursor-pointer underline mt-1"
          >
            {getContent('shared_component_cookie_learn_more_link')}
          </a>
        </div>
        {/* 3. I accept; desktop/tablet: I accept + X (X always near I accept). */}
        <div className="flex items-center gap-4 w-[238px] shrink-0 max-sm:w-full max-sm:justify-center max-sm:h-10 max-sm:gap-0">
          <button
            type="button"
            className="btn-primary-md shrink-0 flex-1 h-full min-w-0 max-sm:flex-none max-sm:w-full max-sm:h-full sm:h-10"
            onClick={handleAccept}
          >
            {getContent('shared_component_cookie_accept_button')}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="hidden sm:flex shrink-0 w-8 h-8 p-0 border-0 bg-transparent cursor-pointer items-center justify-center"
            aria-label="Close cookie notice"
          >
            <Image
              src={getImagePath(getContent, 'close_icon', '/static/x.svg')}
              width={32}
              height={32}
              alt=""
              aria-hidden
              className="w-8 h-8 object-contain"
            />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SkipCookie;
