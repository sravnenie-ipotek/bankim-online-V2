'use client'

import React from 'react'
import type { FormRowProps } from './interfaces/FormRowProps'

const FormRow: React.FC<FormRowProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`flex flex-row gap-8 w-full max-[1200px]:flex-col max-[1200px]:gap-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default FormRow
