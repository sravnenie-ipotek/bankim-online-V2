import React from 'react';

interface PlusMinusIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const PlusMinusIcon: React.FC<PlusMinusIconProps> = ({
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
    <path d="M10 10V18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M6 14H14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M18 22H26" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default PlusMinusIcon;
