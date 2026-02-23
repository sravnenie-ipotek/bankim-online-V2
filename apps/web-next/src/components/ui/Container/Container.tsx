'use client';

import React from 'react';

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Page content wrapper: max-width, horizontal padding, and optional safe-area bottom padding on mobile.
 * @param props.children - Page content to wrap.
 * @param props - Rest passed to the underlying div (e.g. className, style).
 */
const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <div
      className="w-full max-[1280px]:px-5 lg:max-w-[1130px] xl:max-w-[1507px] mx-auto max-[890px]:pb-[calc(120px+env(safe-area-inset-bottom,0))]"
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;
