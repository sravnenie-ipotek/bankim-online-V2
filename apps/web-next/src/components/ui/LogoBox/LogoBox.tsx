'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { LogoBoxProps } from './interfaces/LogoBoxProps';

/** Match primary logo SVG aspect ratio (104×48) to avoid letterboxing. Default 91×42; overridable via className. */
const LOGO_BOX_WIDTH = 91; // 42 * (104/48)
const LOGO_BOX_HEIGHT = 42;

const LogoBox: React.FC<LogoBoxProps> = ({ src, alt, href, className }) => {
  const img = (
    <Image
      src={src}
      alt={alt}
      className="w-full h-full object-contain"
      width={LOGO_BOX_WIDTH}
      height={LOGO_BOX_HEIGHT}
    />
  );

  const box = (
    <span
      className={`flex items-center justify-center shrink-0 overflow-hidden w-[91px] h-[42px] ${className ?? ''}`.trim()}
    >
      {img}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="cursor-pointer flex items-center rtl:justify-end">
        {box}
      </Link>
    );
  }

  return box;
};

export default LogoBox;
