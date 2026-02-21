'use client'

import React from 'react'

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <div
      className="w-full max-[1280px]:px-5 lg:max-w-[1130px] xl:max-w-[1507px] mx-auto max-[890px]:pb-[calc(120px+env(safe-area-inset-bottom,0))]"
      {...rest}
    >
      {children}
    </div>
  )
}

export default Container
