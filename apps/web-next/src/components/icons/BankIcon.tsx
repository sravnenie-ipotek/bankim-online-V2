import React from 'react';

interface BankIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const BankIcon: React.FC<BankIconProps> = ({ size = 32, color = '#F5D547', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 2L3 10V12H29V10L16 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 12V24" stroke={color} strokeWidth="2" />
    <path d="M11 12V24" stroke={color} strokeWidth="2" />
    <path d="M17 12V24" stroke={color} strokeWidth="2" />
    <path d="M23 12V24" stroke={color} strokeWidth="2" />
    <path
      d="M3 24H29V28H3V24Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BankIcon;
