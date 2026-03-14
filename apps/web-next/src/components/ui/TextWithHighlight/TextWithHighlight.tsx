'use client';

import React from 'react';

import type { TextWithHighlightProps } from './interfaces/TextWithHighlightProps';

const TextWithHighlight: React.FC<TextWithHighlightProps> = ({
  text,
  highlightPart,
  highlightClassName = '',
  className = '',
  fontSizeClassName = '',
  highlightColorClassName = '',
  highlightFontSizeClassName = '',
}) => {
  const part = highlightPart != null ? highlightPart.trim() : '';
  const segments: Array<{ text: string; isHighlight: boolean }> = [];
  if (text === '' || part === '' || !text.includes(part)) {
    segments.push({ text, isHighlight: false });
  } else {
    const pieces = text.split(part);
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i] !== '') segments.push({ text: pieces[i], isHighlight: false });
      if (i < pieces.length - 1) segments.push({ text: part, isHighlight: true });
    }
  }
  const rootClasses = [className, fontSizeClassName].filter(Boolean).join(' ');
  const highlightClasses = [highlightClassName, highlightColorClassName, highlightFontSizeClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={rootClasses || undefined}>
      {segments.map((segment, i) =>
        segment.isHighlight ? (
          <span key={i} className={highlightClasses || undefined}>
            {segment.text}
          </span>
        ) : (
          <React.Fragment key={i}>{segment.text}</React.Fragment>
        )
      )}
    </p>
  );
};

export default TextWithHighlight;
