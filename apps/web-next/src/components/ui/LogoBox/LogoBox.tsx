'use client'

import React from 'react'
import Link from 'next/link'
import type { LogoBoxProps } from './interfaces/LogoBoxProps'

const LOGO_BOX_WIDTH = 150
const LOGO_BOX_HEIGHT = 42

const LogoBox: React.FC<LogoBoxProps> = ({ src, alt, href }) => {
  const img = (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain"
      width={LOGO_BOX_WIDTH}
      height={LOGO_BOX_HEIGHT}
    />
  )

  const box = (
    <span
      className="flex items-center justify-center shrink-0 overflow-hidden"
      style={{ width: LOGO_BOX_WIDTH, height: LOGO_BOX_HEIGHT }}
    >
      {img}
    </span>
  )

  if (href) {
    return (
      <Link href={href} className="cursor-pointer flex items-center">
        {box}
      </Link>
    )
  }

  return box
}

export default LogoBox
