'use client';

import React from 'react';

import { TextWithIcon } from '@/components/ui/TextWithIcon';
import type { PercentContentBlockProps } from './interfaces/PercentContentBlockProps';

const DEFAULT_ICON_SRC = '/static/partnerships/percent-icon.svg';

/** @deprecated Use TextWithIcon from @/components/ui/TextWithIcon. Kept for backward compatibility. */
const PercentContentBlock: React.FC<PercentContentBlockProps> = (props) => {
  return (
    <TextWithIcon
      {...props}
      iconSrc={props.iconSrc ?? DEFAULT_ICON_SRC}
      backgroundClassName={props.backgroundClassName}
    />
  );
};

export default PercentContentBlock;
