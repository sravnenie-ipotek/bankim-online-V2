import React from 'react'

interface HandCoinsIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

const HandCoinsIcon: React.FC<HandCoinsIconProps> = ({
  size = 32,
  color = '#F5D547',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="20" cy="10" r="5" stroke={color} strokeWidth="2" />
    <path
      d="M4 26C4 26 4 20 10 20H16C22 20 22 26 22 26"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M18 8H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export default HandCoinsIcon
