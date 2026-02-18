'use client'

import { useTranslation } from 'react-i18next'
import { MenuItem } from './types'

export const useMenuItems = (): MenuItem[] => {
  const { t } = useTranslation()

  return [
    { title: t('sidebar_company_1', 'Services'), path: '/services' },
    { title: t('sidebar_company_2', 'About us'), path: '/about' },
    { title: t('sidebar_company_5', 'Real Estate'), path: '/Real-Estate-Brokerage' },
    { title: t('sidebar_company_3', 'Vacancies'), path: '/vacancies' },
    { title: t('sidebar_company_4', 'Contacts'), path: '/contacts' },
  ]
}

export const useBusinessMenuItems = (): MenuItem[] => {
  const { t } = useTranslation()

  return [
    { title: t('sidebar_business_1', 'Home'), path: '/' },
    { title: t('sidebar_business_2', 'Cooperation'), path: '/cooperation' },
    { title: t('sidebar_business_3', 'Tenders for brokers'), path: '/tenders-for-brokers' },
    { title: t('sidebar_company_6', 'Real Estate'), path: '/Real-Estate-Brokerage' },
    { title: t('sidebar_business_4', 'Tenders for lawyers'), path: '/tenders-for-lawyers' },
  ]
}

export const useSubMenuItems = (): MenuItem[] => {
  const { t } = useTranslation()

  return [
    { title: t('sidebar_sub_calculate_mortgage', 'Calculate mortgage'), path: '/services/calculate-mortgage/1' },
    { title: t('sidebar_sub_refinance_mortgage', 'Refinance mortgage'), path: '/services/refinance-mortgage/1' },
    { title: t('sidebar_sub_calculate_credit', 'Calculate credit'), path: '/services/calculate-credit/1' },
    { title: t('sidebar_sub_refinance_credit', 'Refinance credit'), path: '/services/refinance-credit/1' },
  ]
}

export const useBusinessSubMenuItems = (): MenuItem[] => {
  const { t } = useTranslation()

  return [
    { title: t('sidebar_sub_bank_apoalim', 'Bank Hapoalim'), path: '/banks/apoalim' },
    { title: t('sidebar_sub_bank_discount', 'Bank Discount'), path: '/banks/discount' },
    { title: t('sidebar_sub_bank_leumi', 'Bank Leumi'), path: '/banks/leumi' },
    { title: t('sidebar_sub_bank_beinleumi', 'First International'), path: '/banks/beinleumi' },
    { title: t('sidebar_sub_bank_mercantile_discount', 'Mercantile Discount'), path: '/banks/mercantile-discount' },
    { title: t('sidebar_sub_bank_jerusalem', 'Bank of Jerusalem'), path: '/banks/jerusalem' },
  ]
}
