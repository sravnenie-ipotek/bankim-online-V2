'use client'

import React from 'react'
import type { FormCaptionProps } from './interfaces/FormCaptionProps'

const FormCaption: React.FC<FormCaptionProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="not-italic font-semibold leading-normal text-textTheme-primary text-[clamp(1.25rem,1.2rem+0.4vw,1.5rem)]">
        {title}
      </h2>
      {subtitle && (
        <p className="not-italic font-normal leading-[140%] text-textTheme-secondary text-[clamp(0.875rem,0.9rem+0.2vw,1rem)]">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default FormCaption
