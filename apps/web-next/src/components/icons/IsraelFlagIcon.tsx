import React from 'react';

export interface IsraelFlagIconProps extends React.SVGProps<SVGSVGElement> {
  circle?: boolean;
  transparentBackground?: boolean;
}

const IsraelFlagIcon: React.FC<IsraelFlagIconProps> = ({
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
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 9.6H22V11.7333H0V9.6ZM0 0H22V2.13333H0V0ZM10.3452 7.46667H8.38095L9.36362 5.86667L8.38095 4.26667H10.3452L11 3.2L11.6548 4.26667H13.619L12.6364 5.86667L13.619 7.46667H11.6548L11 8.53333L10.3452 7.46667ZM9.95238 5.86667L11 4.8L12.0476 5.86667L11 6.93333L9.95238 5.86667Z"
          fill="#1A47B8"
        />
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
      <path
        fill={bgFill}
        d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Z"
      />
      <path
        fill="#0052B4"
        d="M27.531 15.652h-5.02L20 11.305l-2.51 4.348H12.47L14.98 20l-2.51 4.348h5.02L20 28.696l2.51-4.348h5.021L25.021 20l2.51-4.348ZM23.084 20l-1.541 2.671h-3.084l-1.543-2.67 1.543-2.672h3.084L23.084 20ZM20 14.658l.574.994h-1.147l.573-.994Zm-4.626 2.671h1.148l-.574.994-.574-.994Zm0 5.342.574-.994.574.994h-1.148ZM20 25.342l-.573-.994h1.147l-.574.994Zm4.627-2.67h-1.148l.574-.995.573.994Zm-1.148-5.343h1.148l-.574.994-.574-.994ZM32.45 4.348H7.55a20.101 20.101 0 0 0-4.614 5.217h34.129a20.105 20.105 0 0 0-4.615-5.217ZM7.55 35.652h24.9a20.102 20.102 0 0 0 4.614-5.217H2.937a20.106 20.106 0 0 0 4.614 5.217Z"
      />
    </svg>
  );
};

export default IsraelFlagIcon;
