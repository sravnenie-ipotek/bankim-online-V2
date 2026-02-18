import React from 'react'

const USFlagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
          fill="#F0F0F0"
          d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Z"
        />

        <rect fill="#D80027" x="0" y="0" width="40" height="3.077" />
        <rect fill="#D80027" x="0" y="6.154" width="40" height="3.077" />
        <rect fill="#D80027" x="0" y="12.308" width="40" height="3.077" />
        <rect fill="#D80027" x="0" y="18.462" width="40" height="3.077" />
        <rect fill="#D80027" x="0" y="24.615" width="40" height="3.077" />
        <rect fill="#D80027" x="0" y="30.769" width="40" height="3.077" />
        <rect fill="#D80027" x="0" y="36.923" width="40" height="3.077" />

        <rect fill="#0052B4" x="0" y="0" width="16" height="20" />

        <g fill="#F0F0F0">
          <circle cx="2" cy="2" r="0.6" />
          <circle cx="5.2" cy="2" r="0.6" />
          <circle cx="8.4" cy="2" r="0.6" />
          <circle cx="11.6" cy="2" r="0.6" />
          <circle cx="14.8" cy="2" r="0.6" />

          <circle cx="3.6" cy="4.4" r="0.6" />
          <circle cx="6.8" cy="4.4" r="0.6" />
          <circle cx="10" cy="4.4" r="0.6" />
          <circle cx="13.2" cy="4.4" r="0.6" />

          <circle cx="2" cy="6.8" r="0.6" />
          <circle cx="5.2" cy="6.8" r="0.6" />
          <circle cx="8.4" cy="6.8" r="0.6" />
          <circle cx="11.6" cy="6.8" r="0.6" />
          <circle cx="14.8" cy="6.8" r="0.6" />

          <circle cx="3.6" cy="9.2" r="0.6" />
          <circle cx="6.8" cy="9.2" r="0.6" />
          <circle cx="10" cy="9.2" r="0.6" />
          <circle cx="13.2" cy="9.2" r="0.6" />

          <circle cx="2" cy="11.6" r="0.6" />
          <circle cx="5.2" cy="11.6" r="0.6" />
          <circle cx="8.4" cy="11.6" r="0.6" />
          <circle cx="11.6" cy="11.6" r="0.6" />
          <circle cx="14.8" cy="11.6" r="0.6" />

          <circle cx="3.6" cy="14" r="0.6" />
          <circle cx="6.8" cy="14" r="0.6" />
          <circle cx="10" cy="14" r="0.6" />
          <circle cx="13.2" cy="14" r="0.6" />

          <circle cx="2" cy="16.4" r="0.6" />
          <circle cx="5.2" cy="16.4" r="0.6" />
          <circle cx="8.4" cy="16.4" r="0.6" />
          <circle cx="11.6" cy="16.4" r="0.6" />
          <circle cx="14.8" cy="16.4" r="0.6" />

          <circle cx="3.6" cy="18.8" r="0.6" />
          <circle cx="6.8" cy="18.8" r="0.6" />
          <circle cx="10" cy="18.8" r="0.6" />
          <circle cx="13.2" cy="18.8" r="0.6" />
        </g>
      </g>
    </svg>
  )
}

export default USFlagIcon
