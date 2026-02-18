import React from 'react'

interface ShieldCheckIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

const ShieldCheckIcon: React.FC<ShieldCheckIconProps> = ({
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
      d="M16 3L4 8V15C4 22.18 9.11 28.86 16 30C22.89 28.86 28 22.18 28 15V8L16 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16L15 19L21 13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ShieldCheckIcon
