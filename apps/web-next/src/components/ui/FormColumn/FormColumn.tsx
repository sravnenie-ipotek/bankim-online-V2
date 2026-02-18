'use client'

import React from 'react'
import type { FormColumnProps } from './interfaces/FormColumnProps'

const FormColumn: React.FC<FormColumnProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`flex flex-col gap-2 w-[20.3125rem] max-[1200px]:w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default FormColumn
