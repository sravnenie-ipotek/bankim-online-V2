'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'

import { useContentApi } from '@hooks/useContentApi'
import { getImagePath } from '@/helpers/getImagePath'
import { COOKIE_CONSENT_ACCEPTED_EVENT } from '@/components/analytics/GoogleAnalytics'
import type { SkipCookieState } from './interfaces/SkipCookieState'

const INITIAL_STATE: SkipCookieState = { mounted: false, isVisible: false }

const SkipCookie: React.FC = () => {
  const { getContent } = useContentApi('global_components')
  const [state, setState] = useState<SkipCookieState>(INITIAL_STATE)

  useEffect(() => {
    const cookieValue = typeof window !== 'undefined' ? localStorage.getItem('cookie') : null
    const isVisible = cookieValue !== '1'
    const id = setTimeout(() => {
      setState({ mounted: true, isVisible })
    }, 0)
    return () => clearTimeout(id)
  }, [])

  const handleAccept = () => {
    setState((prev) => ({ ...prev, isVisible: false }))
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie', '1')
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_ACCEPTED_EVENT))
    }
  }

  const handleClose = () => {
    setState((prev) => ({ ...prev, isVisible: false }))
  }

  if (!state.mounted || !state.isVisible) return null

  return createPortal(
    <div className="fixed flex justify-center items-center w-full h-32 text-[14px] bottom-[100px] z-[9999] max-[931px]:bottom-[20px] max-[931px]:px-4 left-0 right-0">
      <div className="relative flex justify-between p-8 items-center w-[850px] max-w-[calc(100vw-2rem)] h-[111px] rounded-[11px] text-[14px] bg-[rgb(53,55,63)] max-[931px]:flex-col max-[931px]:h-fit max-[931px]:p-6">
        <Image src={getImagePath(getContent, 'cookie_icon', '/static/cookie.svg')} width={52} height={52} alt="" />
        <div className="w-full py-6 text-white max-w-[439px] flex flex-col gap-1 max-[931px]:text-center max-[931px]:text-[12px]">
          <span>{getContent('shared_component_cookie_message')}</span>
          <span className="!text-[#F5D547] cursor-pointer underline text-[14px] mt-1 max-[931px]:text-[12px]">
            {getContent('shared_component_cookie_learn_more_link')}
          </span>
        </div>
        <button
          className="w-[182px] h-[46px] font-medium text-[16px] bg-accent-primary text-base-primary rounded-lg hover:bg-accent-primaryActiveButton transition-colors max-[931px]:w-full"
          onClick={handleAccept}
        >
          {getContent('shared_component_cookie_accept_button')}
        </button>
        <Image
          src={getImagePath(getContent, 'close_icon', '/static/x.svg')}
          width={32}
          height={32}
          className="absolute top-10 right-4 max-[931px]:top-4 rtl:left-4 rtl:right-auto cursor-pointer"
          onClick={handleClose}
          alt=""
        />
      </div>
    </div>,
    document.body
  )
}

export default SkipCookie
