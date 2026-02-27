import React from 'react';

export interface USFlagIconProps extends React.SVGProps<SVGSVGElement> {
  circle?: boolean;
  transparentBackground?: boolean;
}

const USFlagIcon: React.FC<USFlagIconProps> = ({
  circle = true,
  transparentBackground = false,
  ...props
}) => {
  const bgFill = transparentBackground ? 'transparent' : '#F0F0F0';

  if (!circle) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={12}
        viewBox="0 0 22 12"
        fill="none"
        {...props}
      >
        <rect width={22} height={12} fill={bgFill} rx={2} />
        <rect fill="#D80027" x={0} y={0} width={22} height={0.923} />
        <rect fill="#D80027" x={0} y={1.846} width={22} height={0.923} />
        <rect fill="#D80027" x={0} y={3.692} width={22} height={0.923} />
        <rect fill="#D80027" x={0} y={5.538} width={22} height={0.923} />
        <rect fill="#D80027" x={0} y={7.385} width={22} height={0.923} />
        <rect fill="#D80027" x={0} y={9.231} width={22} height={0.923} />
        <rect fill="#D80027" x={0} y={11.077} width={22} height={0.923} />
        <rect fill="#0052B4" x={0} y={0} width={8.8} height={6.46} />
        <g fill="#F0F0F0">
          <circle cx={1.1} cy={0.8} r={0.3} />
          <circle cx={2.86} cy={0.8} r={0.3} />
          <circle cx={4.62} cy={0.8} r={0.3} />
          <circle cx={6.38} cy={0.8} r={0.3} />
          <circle cx={8.14} cy={0.8} r={0.3} />
          <circle cx={1.98} cy={1.88} r={0.3} />
          <circle cx={3.74} cy={1.88} r={0.3} />
          <circle cx={5.5} cy={1.88} r={0.3} />
          <circle cx={7.26} cy={1.88} r={0.3} />
          <circle cx={1.1} cy={2.96} r={0.3} />
          <circle cx={2.86} cy={2.96} r={0.3} />
          <circle cx={4.62} cy={2.96} r={0.3} />
          <circle cx={6.38} cy={2.96} r={0.3} />
          <circle cx={8.14} cy={2.96} r={0.3} />
          <circle cx={1.98} cy={4.04} r={0.3} />
          <circle cx={3.74} cy={4.04} r={0.3} />
          <circle cx={5.5} cy={4.04} r={0.3} />
          <circle cx={7.26} cy={4.04} r={0.3} />
          <circle cx={1.1} cy={5.12} r={0.3} />
          <circle cx={2.86} cy={5.12} r={0.3} />
          <circle cx={4.62} cy={5.12} r={0.3} />
          <circle cx={6.38} cy={5.12} r={0.3} />
          <circle cx={8.14} cy={5.12} r={0.3} />
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      fill="none"
      transform="scale(0.8)"
      {...props}
    >
      <defs>
        <clipPath id="us-circle-clip">
          <path d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#us-circle-clip)">
        <path
          fill={bgFill}
          d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Z"
        />
        <rect fill="#D80027" x={0} y={0} width={40} height={3.077} />
        <rect fill="#D80027" x={0} y={6.154} width={40} height={3.077} />
        <rect fill="#D80027" x={0} y={12.308} width={40} height={3.077} />
        <rect fill="#D80027" x={0} y={18.462} width={40} height={3.077} />
        <rect fill="#D80027" x={0} y={24.615} width={40} height={3.077} />
        <rect fill="#D80027" x={0} y={30.769} width={40} height={3.077} />
        <rect fill="#D80027" x={0} y={36.923} width={40} height={3.077} />
        <rect fill="#0052B4" x={0} y={0} width={16} height={20} />
        <g fill="#F0F0F0">
          <circle cx={2} cy={2} r={0.6} />
          <circle cx={5.2} cy={2} r={0.6} />
          <circle cx={8.4} cy={2} r={0.6} />
          <circle cx={11.6} cy={2} r={0.6} />
          <circle cx={14.8} cy={2} r={0.6} />
          <circle cx={3.6} cy={4.4} r={0.6} />
          <circle cx={6.8} cy={4.4} r={0.6} />
          <circle cx={10} cy={4.4} r={0.6} />
          <circle cx={13.2} cy={4.4} r={0.6} />
          <circle cx={2} cy={6.8} r={0.6} />
          <circle cx={5.2} cy={6.8} r={0.6} />
          <circle cx={8.4} cy={6.8} r={0.6} />
          <circle cx={11.6} cy={6.8} r={0.6} />
          <circle cx={14.8} cy={6.8} r={0.6} />
          <circle cx={3.6} cy={9.2} r={0.6} />
          <circle cx={6.8} cy={9.2} r={0.6} />
          <circle cx={10} cy={9.2} r={0.6} />
          <circle cx={13.2} cy={9.2} r={0.6} />
          <circle cx={2} cy={11.6} r={0.6} />
          <circle cx={5.2} cy={11.6} r={0.6} />
          <circle cx={8.4} cy={11.6} r={0.6} />
          <circle cx={11.6} cy={11.6} r={0.6} />
          <circle cx={14.8} cy={11.6} r={0.6} />
          <circle cx={3.6} cy={14} r={0.6} />
          <circle cx={6.8} cy={14} r={0.6} />
          <circle cx={10} cy={14} r={0.6} />
          <circle cx={13.2} cy={14} r={0.6} />
          <circle cx={2} cy={16.4} r={0.6} />
          <circle cx={5.2} cy={16.4} r={0.6} />
          <circle cx={8.4} cy={16.4} r={0.6} />
          <circle cx={11.6} cy={16.4} r={0.6} />
          <circle cx={14.8} cy={16.4} r={0.6} />
          <circle cx={3.6} cy={18.8} r={0.6} />
          <circle cx={6.8} cy={18.8} r={0.6} />
          <circle cx={10} cy={18.8} r={0.6} />
          <circle cx={13.2} cy={18.8} r={0.6} />
        </g>
      </g>
    </svg>
  );
};

export default USFlagIcon;
