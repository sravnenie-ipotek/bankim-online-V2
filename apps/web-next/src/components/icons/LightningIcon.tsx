import React from 'react';

interface LightningIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const LightningIcon: React.FC<LightningIconProps> = ({
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
      d="M18 3L6 18H16L14 29L26 14H16L18 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LightningIcon;
