import React from 'react'

interface HandPointingIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

const HandPointingIcon: React.FC<HandPointingIconProps> = ({
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
    <path
      d="M16 8V4M16 4C14.5 4 13 5.5 13 7V14L10 11C9 10 7 10.5 7 12C7 13.5 13 20 13 20V26H23V20L25 14C25 12 23 11 22 12L19 15V7C19 5.5 17.5 4 16 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default HandPointingIcon
