'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Company from './Company'
import Contacts from './Contacts'
import Documents from './Documents'
import InfoBlock from './InfoBlock'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="relative z-[10001] bg-base-secondary mx-auto flex flex-col justify-center items-center px-4 sm:px-10 md:px-[3.4375rem] l:px-[9.6875rem] pt-8 pb-4 gap-8 w-full h-auto">
      <div className="flex flex-col gap-8 w-full max-w-full l:w-[72rem] l:max-w-[72rem] justify-between">
        <div className="flex w-full gap-8 flex-col justify-center items-center md:flex-row l:gap-28">
          <InfoBlock />
          <div className="flex w-full max-w-full md:w-[48rem] justify-between flex-col justify-center items-center md:flex-row md:w-full">
            <Company />
            <Contacts />
            <Documents />
          </div>
        </div>
        <div className="w-full text-[0.75rem] font-normal leading-[140%] text-textTheme-primary md:ml-[0.8rem] text-center md:text-left">
          <span>{t('footer_copyright')}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
