'use client'

import React from 'react'

const ArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
    <path d="M12 6L22 16L12 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default ArrowIcon
