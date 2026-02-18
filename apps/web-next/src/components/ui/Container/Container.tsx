'use client'

import React from 'react'

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <div
      className="max-w-[70.63rem] mx-auto px-4 sm:px-5 max-[890px]:pb-[calc(120px+env(safe-area-inset-bottom,0))]"
      {...rest}
    >
      {children}
    </div>
  )
}

export default Container
