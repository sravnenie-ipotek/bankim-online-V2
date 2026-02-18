'use client'

import React from 'react'
import type { FormCaptionProps } from './interfaces/FormCaptionProps'

const FormCaption: React.FC<FormCaptionProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[1.5rem] not-italic font-semibold leading-normal text-textTheme-primary max-[768px]:text-[1.25rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[1rem] not-italic font-normal leading-[140%] text-textTheme-secondary">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default FormCaption
