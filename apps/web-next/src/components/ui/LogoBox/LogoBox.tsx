'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { LogoBoxProps } from './interfaces/LogoBoxProps';

/** Match primary logo SVG aspect ratio (104×48) to avoid letterboxing. Default 91×42; overridable via className. */
const LOGO_BOX_WIDTH = 91; // 42 * (104/48)
const LOGO_BOX_HEIGHT = 42;

const PRIMARY_LOGO_SRC = '/static/primary-logo05-1.svg';

const LogoBox: React.FC<LogoBoxProps> = ({ src, alt, href, className, loading }) => {
  const effectiveLoading = loading ?? (src === PRIMARY_LOGO_SRC ? 'eager' : undefined);
  const img = (
    <Image
      src={src}
      alt={alt}
      loading={effectiveLoading}
      className="w-full h-full object-contain"
      width={LOGO_BOX_WIDTH}
      height={LOGO_BOX_HEIGHT}
      style={{ width: 'auto', height: 'auto' }}
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
