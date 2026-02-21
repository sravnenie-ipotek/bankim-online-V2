'use client'

import React, { useState } from 'react'
import { useContentApi } from '@hooks/useContentApi'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { sendSmsCode, authLoadingSelector } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store'

const PhoneLoginForm: React.FC = () => {
  const { getContent } = useContentApi('global_components')
  const dispatch: AppDispatch = useAppDispatch()
  const isLoading = useAppSelector(authLoadingSelector)
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!phone.trim()) return
    void dispatch(sendSmsCode(phone.trim()))
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-textTheme-primary">{getContent('enter_phone_number')}</span>
        <input
          type="tel"
          inputMode="tel"
          placeholder="05X-XXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          dir="ltr"
          autoFocus
          className="w-full px-3 py-2.5 bg-base-inputs border border-base-secondaryDefaultButton rounded text-textTheme-primary placeholder:text-textTheme-disabled outline-none focus:border-accent-primary"
        />
      </label>
      <button
        type="submit"
        disabled={!phone.trim() || isLoading}
        className="w-full py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? getContent('auth_modal_processing') : getContent('auth_modal_continue')}
      </button>
    </form>
  )
}

export default PhoneLoginForm
