'use client'

import React from 'react'
import type { FormContainerProps } from './interfaces/FormContainerProps'

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-8 py-8 w-full">
      {children}
    </div>
  )
}

export default FormContainer
