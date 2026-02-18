'use client'

import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { sendSmsCode, authLoadingSelector } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store'

const PhoneLoginForm: React.FC = () => {
  const { t } = useTranslation()
  const dispatch: AppDispatch = useAppDispatch()
  const isLoading = useAppSelector(authLoadingSelector)
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!phone.trim()) return
    void dispatch(sendSmsCode(phone.trim()))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        fullWidth
        label={t('enter_phone_number')}
        placeholder="05X-XXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="tel"
        autoFocus
        margin="normal"
        dir="ltr"
        slotProps={{ htmlInput: { inputMode: 'tel' } }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!phone.trim() || isLoading}
        sx={{ mt: 2, py: 1.5 }}
      >
        {isLoading ? t('auth_modal_processing') : t('auth_modal_continue')}
      </Button>
    </form>
  )
}

export default PhoneLoginForm
