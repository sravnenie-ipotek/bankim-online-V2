'use client'

import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  verifySmsCode,
  pendingPhoneSelector,
  authLoadingSelector,
  setLoginStep,
} from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store'

const SmsVerifyForm: React.FC = () => {
  const { t } = useTranslation()
  const dispatch: AppDispatch = useAppDispatch()
  const isLoading = useAppSelector(authLoadingSelector)
  const pendingPhone = useAppSelector(pendingPhoneSelector)
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!code.trim() || !pendingPhone) return
    void dispatch(verifySmsCode({ code: code.trim(), mobile_number: pendingPhone }))
  }

  const handleBack = (): void => {
    dispatch(setLoginStep('form'))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {t('confirm_phone_number_login')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }} dir="ltr">
        {pendingPhone}
      </Typography>
      <TextField
        fullWidth
        label={t('enter_code', 'Enter code')}
        placeholder="1234"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
        type="text"
        autoFocus
        margin="normal"
        dir="ltr"
        slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 4 } }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={code.length < 4 || isLoading}
        sx={{ mt: 2, py: 1.5 }}
      >
        {isLoading ? t('auth_modal_processing') : t('auth_modal_continue')}
      </Button>
      <Button
        fullWidth
        variant="text"
        onClick={handleBack}
        sx={{ mt: 1 }}
      >
        {t('back', 'Back')}
      </Button>
    </form>
  )
}

export default SmsVerifyForm
