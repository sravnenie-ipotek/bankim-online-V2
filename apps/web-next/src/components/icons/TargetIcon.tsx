import React from 'react'

interface TargetIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

const TargetIcon: React.FC<TargetIconProps> = ({
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
    <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" />
    <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="2" />
    <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="2" />
  </svg>
)

export default TargetIcon
