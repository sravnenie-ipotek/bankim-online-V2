'use client';

import React from 'react';

import type { BannerShapeDecorationProps } from './interfaces/BannerShapeDecorationProps';

/** LTR path data (shapes on the right); from about-banner-shapes.svg */
const LTR_PATH_1 =
  'M1328.76 -104.45L935.496 229.744L877.997 229.745L1144.94 -104.452L1328.76 -104.45Z';
const LTR_PATH_2 =
  'M1370.34 7.78879L1045.15 213.402L995.803 213.402L1415.02 -132.557L1370.34 7.78879Z';
/** RTL path data (shapes on the left); from about-banner-shapes-he.svg */
const RTL_PATH_1 =
  'M-198.758 -104.45L194.504 229.744L252.003 229.745L-14.9409 -104.452L-198.758 -104.45Z';
const RTL_PATH_2 =
  'M-240.345 7.78879L84.8502 213.402L134.197 213.402L-285.016 -132.557L-240.345 7.78879Z';

const VIEWBOX = '0 0 1130 130';

const BannerShapeDecoration: React.FC<BannerShapeDecorationProps> = ({
  fill,
  direction,
}) => {
  const [path1, path2] =
    direction === 'rtl' ? [RTL_PATH_1, RTL_PATH_2] : [LTR_PATH_1, LTR_PATH_2];

  const alignRight = direction === 'ltr';
  const preserveAspectRatio = alignRight
    ? 'xMaxYMid slice'
    : 'xMinYMid slice';

  return (
    <svg
      viewBox={VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={preserveAspectRatio}
      className="absolute inset-0 w-full h-full pointer-events-none max-sm:hidden object-cover"
      aria-hidden
    >
      <path d={path1} fill={fill} />
      <path d={path2} fill={fill} />
    </svg>
  );
};

export default BannerShapeDecoration;
