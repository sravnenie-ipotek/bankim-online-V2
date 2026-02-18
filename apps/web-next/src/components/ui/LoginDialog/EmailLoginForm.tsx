'use client'

import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { emailLogin, authLoadingSelector } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store'

const EmailLoginForm: React.FC = () => {
  const { t } = useTranslation()
  const dispatch: AppDispatch = useAppDispatch()
  const isLoading = useAppSelector(authLoadingSelector)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!email.trim() || !password) return
    void dispatch(emailLogin({ email: email.trim(), password }))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        fullWidth
        label={t('enter_email')}
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        autoFocus
        margin="normal"
        dir="ltr"
      />
      <TextField
        fullWidth
        label={t('enter_password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        margin="normal"
        dir="ltr"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!email.trim() || !password || isLoading}
        sx={{ mt: 2, py: 1.5 }}
      >
        {isLoading ? t('auth_modal_processing') : t('login')}
      </Button>
    </form>
  )
}

export default EmailLoginForm
