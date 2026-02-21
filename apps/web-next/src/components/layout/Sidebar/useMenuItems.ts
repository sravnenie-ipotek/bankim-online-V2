'use client'

import { useContentApi } from '@hooks/useContentApi'
import { MenuItem } from './types'

export const useMenuItems = (): MenuItem[] => {
  const { getContent } = useContentApi('global_components')

  return [
    { title: getContent('sidebar_company_1'), path: '/services' },
    { title: getContent('sidebar_company_2'), path: '/about' },
    { title: getContent('sidebar_company_5'), path: '/Real-Estate-Brokerage' },
    { title: getContent('sidebar_company_3'), path: '/vacancies' },
    { title: getContent('sidebar_company_4'), path: '/contacts' },
  ]
}

export const useBusinessMenuItems = (): MenuItem[] => {
  const { getContent } = useContentApi('global_components')

  return [
    { title: getContent('sidebar_business_1'), path: '/' },
    { title: getContent('sidebar_business_2'), path: '/cooperation' },
    { title: getContent('sidebar_business_3'), path: '/tenders-for-brokers' },
    { title: getContent('sidebar_company_6'), path: '/Real-Estate-Brokerage' },
    { title: getContent('sidebar_business_4'), path: '/tenders-for-lawyers' },
  ]
}

export const useSubMenuItems = (): MenuItem[] => {
  const { getContent } = useContentApi('global_components')

  return [
    { title: getContent('sidebar_sub_calculate_mortgage'), path: '/services/calculate-mortgage/1' },
    { title: getContent('sidebar_sub_refinance_mortgage'), path: '/services/refinance-mortgage/1' },
    { title: getContent('sidebar_sub_calculate_credit'), path: '/services/calculate-credit/1' },
    { title: getContent('sidebar_sub_refinance_credit'), path: '/services/refinance-credit/1' },
  ]
}

export const useBusinessSubMenuItems = (): MenuItem[] => {
  const { getContent } = useContentApi('global_components')

  return [
    { title: getContent('sidebar_sub_bank_apoalim'), path: '/banks/apoalim' },
    { title: getContent('sidebar_sub_bank_discount'), path: '/banks/discount' },
    { title: getContent('sidebar_sub_bank_leumi'), path: '/banks/leumi' },
    { title: getContent('sidebar_sub_bank_beinleumi'), path: '/banks/beinleumi' },
    { title: getContent('sidebar_sub_bank_mercantile_discount'), path: '/banks/mercantile-discount' },
    { title: getContent('sidebar_sub_bank_jerusalem'), path: '/banks/jerusalem' },
  ]
}
