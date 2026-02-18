'use client'

import React from 'react'
import Link from 'next/link'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  closeLoginDialog,
  setActiveTab,
  isLoginDialogOpenSelector,
  loginStepSelector,
  activeTabSelector,
  authErrorSelector,
  clearAuthError,
} from '@/store/slices/authSlice'
import type { Tab as AuthTab } from '@/store/slices/authSlice'
import PhoneLoginForm from './PhoneLoginForm'
import EmailLoginForm from './EmailLoginForm'
import SmsVerifyForm from './SmsVerifyForm'

const LoginDialog: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(isLoginDialogOpenSelector)
  const loginStep = useAppSelector(loginStepSelector)
  const activeTab = useAppSelector(activeTabSelector)
  const error = useAppSelector(authErrorSelector)

  const handleClose = (): void => {
    dispatch(closeLoginDialog())
  }

  const handleTabChange = (_: React.SyntheticEvent, value: string): void => {
    dispatch(setActiveTab(value as AuthTab))
    dispatch(clearAuthError())
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {t('login')}
        <IconButton onClick={handleClose} size="small" aria-label="close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearAuthError())}>
            {error}
          </Alert>
        )}

        {loginStep === 'form' && (
          <>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ mb: 1 }}
            >
              <Tab value="phone" label={t('contact_form_phone', 'Phone')} />
              <Tab value="email" label={t('enter_email', 'Email')} />
            </Tabs>

            {activeTab === 'phone' && <PhoneLoginForm />}
            {activeTab === 'email' && <EmailLoginForm />}

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" color="text.secondary" textAlign="center">
              {t('register_description', "Don't have an account?")}{' '}
              <Link
                href="/registration"
                onClick={handleClose}
                style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}
              >
                {t('register_here', 'Register here')}
              </Link>
            </Typography>
          </>
        )}

        {loginStep === 'sms-verify' && <SmsVerifyForm />}
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
