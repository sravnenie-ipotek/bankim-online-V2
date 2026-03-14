'use client';

import React from 'react';
import { BulletItem } from '@/components/ui/BulletItem';
import type { BulletsSectionProps } from './interfaces/BulletsSectionProps';

const GAP_CLASS = 'gap-[clamp(8px,1.111vw,21px)]';
const WRAPPER_BASE = 'mt-[clamp(12px,1.667vw,24px)] w-full md:w-[clamp(320px,31.667vw,601px)]';

function getFirstWordOfSegment(segment: string): string {
  const firstLine = segment.split('\n')[0]?.trim() ?? '';
  const match = firstLine.match(/\S+/);
  return match ? match[0] : '';
}

function removeFirstWordFromSegment(segment: string, word: string): string {
  if (!word) return segment;
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return segment.replace(new RegExp(`^\\s*${escaped}(\\s|\\n)`, 'u'), '$1');
}

function renderTitleWithHighlight(
  title: string,
  highlightWord: string,
  highlightClassName: string | undefined,
  highlightColor: string | undefined
): React.ReactNode {
  const hasHighlightWord = highlightWord != null && highlightWord.trim() !== '';
  const effectiveWord =
    hasHighlightWord && title.includes(highlightWord) ? highlightWord.trim() : '';
  if (!effectiveWord) {
    return title.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < title.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  }
  const parts = title.split(effectiveWord);
  const nodes: React.ReactNode[] = [];
  parts.forEach((segment, i) => {
    const firstWordAfter =
      i < parts.length - 1 ? getFirstWordOfSegment(parts[i + 1]) : '';
    const segmentToRender =
      i > 0 ? removeFirstWordFromSegment(segment, getFirstWordOfSegment(parts[i])) : segment;
    const lines = segmentToRender.split('\n');
    lines.forEach((line, j) => {
      nodes.push(
        <React.Fragment key={`${i}-${j}`}>
          {line}
          {j < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
    if (i < parts.length - 1) {
      const highlightSpan = highlightClassName ? (
        <span className={highlightClassName}>{effectiveWord}</span>
      ) : (
        <span style={highlightColor ? { color: highlightColor } : undefined}>{effectiveWord}</span>
      );
      nodes.push(
        <span key={`highlight-${i}`}>
          {highlightSpan}
          {firstWordAfter ? ` ${firstWordAfter}` : ''}
        </span>
      );
    }
  });
  return <>{nodes}</>;
}

const BulletsSection: React.FC<BulletsSectionProps> = ({
  direction,
  layout,
  containerClassName = '',
  title,
  titleClassName = '',
  titleHighlightWord,
  titleHighlightClassName,
  titleHighlightColor,
  description,
  descriptionClassName = '',
  bulletsText,
  bulletsClassName = '',
  bulletDescriptionClassName,
  bulletIconSrc,
  buttonLabel,
  showButton = true,
  onButtonClick,
}) => {
  const isHorizontal = layout === 'horizontal';
  const containerClass = containerClassName.trim();
  const bulletsWrapperClass = `${GAP_CLASS} ${bulletsClassName}`.trim();
  const hasHighlightStyle =
    (titleHighlightClassName != null && titleHighlightClassName.trim() !== '') ||
    (titleHighlightColor != null && titleHighlightColor !== '');
  const showHighlight =
    title != null &&
    title !== '' &&
    titleHighlightWord != null &&
    titleHighlightWord !== '' &&
    hasHighlightStyle;

  return (
    <div
      className={
        isHorizontal
          ? `flex flex-col gap-[clamp(8px,1.111vw,21px)] ${WRAPPER_BASE} ${containerClass}`
          : `flex flex-col ${GAP_CLASS} ${WRAPPER_BASE} ${containerClass}`
      }
    >
      {title != null && title !== '' && (
        <h2 className={titleClassName.trim() || undefined}>
          {showHighlight
            ? renderTitleWithHighlight(title, titleHighlightWord!, titleHighlightClassName?.trim(), titleHighlightColor)
            : title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
        </h2>
      )}
      {description != null && description !== '' && (
        <p className={descriptionClassName.trim() || undefined}>{description}</p>
      )}
      {bulletsText.length > 0 && (
        <div
          className={
            isHorizontal
              ? `flex flex-row flex-wrap items-start gap-x-[clamp(12px,2vw,38px)] ${bulletsWrapperClass}`
              : `flex flex-col ${bulletsWrapperClass}`
          }
        >
          {isHorizontal ? (
            <>
              <div className={`flex flex-col ${GAP_CLASS}`}>
                {bulletsText.slice(0, 2).map((text, i) => (
                  <BulletItem
                    key={i}
                    description={text}
                    direction={direction}
                    iconSrc={bulletIconSrc}
                    descriptionClassName={bulletDescriptionClassName}
                  />
                ))}
              </div>
              <div className={`flex flex-col ${GAP_CLASS}`}>
                {bulletsText.slice(2, 4).map((text, i) => (
                  <BulletItem
                    key={i + 2}
                    description={text}
                    direction={direction}
                    iconSrc={bulletIconSrc}
                    descriptionClassName={bulletDescriptionClassName}
                  />
                ))}
              </div>
            </>
          ) : (
            bulletsText.map((text, i) => (
              <BulletItem
                key={i}
                description={text}
                direction={direction}
                iconSrc={bulletIconSrc}
                descriptionClassName={bulletDescriptionClassName}
              />
            ))
          )}
        </div>
      )}
      {showButton && buttonLabel != null && buttonLabel !== '' && (
        <button
          type="button"
          onClick={onButtonClick}
          className="btn-primary-lg w-fit mt-4"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default BulletsSection;
