'use client';

import React, { useState } from 'react';

import { ExpandableIconListGroup } from '@/components/ui/ExpandableIconListGroup';
import { ImageWithIconBadges } from '@/components/ui/ImageWithIconBadges';
import type { ExpandableListWithImageBlockProps } from './interfaces/ExpandableListWithImageBlockProps';

const DEFAULT_WRAPPER_CLASS =
  'mt-[clamp(40px,5.556vw,72px)] flex flex-col sm:flex-row sm:items-start gap-[clamp(24px,5.053vw,96px)] w-full max-w-full min-w-0 overflow-x-hidden';
const DEFAULT_LEFT_COLUMN_CLASS =
  'flex-1 min-w-0 max-w-full flex flex-col gap-[clamp(16px,2.222vw,24px)]';
const DEFAULT_RIGHT_COLUMN_CLASS =
  'hidden sm:flex shrink-0 sm:ms-auto w-full max-w-full min-w-0 sm:w-[clamp(260px,36.806vw,699px)] min-h-[clamp(283px,40vw,760px)] flex-col items-center justify-start';

const DEFAULT_TITLE_BASE_CLASS = 'text-tenders-brokers-title font-medium leading-tight text-start';

const ExpandableListWithImageBlock: React.FC<ExpandableListWithImageBlockProps> = ({
  title,
  titleBaseClassName,
  titleClassName = '',
  sections,
  direction,
  onSectionPress,
  buttonLabel,
  onButtonClick,
  buttonClassName = 'btn-primary-lg w-fit',
  buttonWrapperClassName = '',
  renderButtonOutside = false,
  wrapperClassName = '',
  transparentBackground = false,
  leftColumnClassName = '',
  listContainerClassName = '',
  listBackgroundClassName = '',
  listTitleColorClassName = '',
  listItemTextColorClassName = '',
  listBadgeBackgroundClassName = '',
  listHideBorder = false,
  listItemIconWrapperSizeClassName = '',
  listItemIconFilterClassName = '',
  imageBadgeBackgroundClassName = '',
  imageBadgeTextColorClassName = '',
  imageBadgeIconFilterClassName = '',
  rightColumnClassName = '',
  expandable = true,
  getImageWithBadgesProps,
}) => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const selectedSection = sections[selectedSectionIndex] ?? sections[0];
  const selectedSideContent = selectedSection?.sideContent;

  const handleSectionPress = (section: typeof selectedSection, index: number): void => {
    setSelectedSectionIndex(index);
    onSectionPress?.(section, index);
  };

  const imageProps = getImageWithBadgesProps
    ? getImageWithBadgesProps(selectedSectionIndex, selectedSideContent)
    : {
        imageSrc:
          selectedSideContent?.imageFrontSrc ||
          selectedSideContent?.imageBackSrc ||
          '',
        badges:
          selectedSideContent?.badges?.map((b) => ({
            iconSrc: b.iconSrc,
            text: b.text,
          })) ?? [],
        direction,
      };

  const wrapperBgClass = transparentBackground ? 'bg-transparent' : '';
  const titleBaseClass = titleBaseClassName?.trim() ?? DEFAULT_TITLE_BASE_CLASS;
  return (
    <div
      className={`${DEFAULT_WRAPPER_CLASS} ${wrapperBgClass} ${wrapperClassName}`.trim()}
      dir={direction}
    >
      <div
        className={`${DEFAULT_LEFT_COLUMN_CLASS} ${leftColumnClassName}`.trim()}
      >
        <h2
          className={`${titleBaseClass} ${titleClassName}`.trim()}
        >
          {title}
        </h2>
        <ExpandableIconListGroup
          sections={sections}
          direction={direction}
          onSectionPress={handleSectionPress}
          expandable={expandable}
          className={listContainerClassName}
          listBackgroundClassName={listBackgroundClassName}
          listTitleColorClassName={listTitleColorClassName}
          listItemTextColorClassName={listItemTextColorClassName}
          listBadgeBackgroundClassName={listBadgeBackgroundClassName}
          listHideBorder={listHideBorder}
          listItemIconWrapperSizeClassName={listItemIconWrapperSizeClassName}
          listItemIconFilterClassName={listItemIconFilterClassName}
        />
        {!renderButtonOutside &&
          buttonLabel != null &&
          buttonLabel !== '' &&
          onButtonClick != null && (
            <div
              className={
                buttonWrapperClassName.trim()
                  ? `flex w-full ${buttonWrapperClassName}`.trim()
                  : 'flex justify-start w-full'
              }
            >
              <button
                type="button"
                onClick={onButtonClick}
                className={buttonClassName}
              >
                {buttonLabel}
              </button>
            </div>
          )}
      </div>
      <div
        className={`${DEFAULT_RIGHT_COLUMN_CLASS} ${rightColumnClassName}`.trim()}
      >
        <ImageWithIconBadges
          {...imageProps}
          badgeBackgroundClassName={imageBadgeBackgroundClassName}
          badgeTextColorClassName={imageBadgeTextColorClassName}
          badgeIconFilterClassName={imageBadgeIconFilterClassName}
        />
      </div>
    </div>
  );
};

export default ExpandableListWithImageBlock;
