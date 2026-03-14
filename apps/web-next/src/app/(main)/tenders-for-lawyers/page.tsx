'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import Container from '@/components/ui/Container/Container';
import { CompanyBanner } from '@/components/ui/CompanyBanner';
import { TextWithBigPicture } from '@/components/ui/TextWithBigPicture';
import { ProfitContainer } from '../tenders-for-brokers/components/ProfitContainer';
import { HowItWorksSection } from '../cooperation/components/HowItWorksSection';
import { FormCtaBanner } from '@/components/ui/FormCtaBanner';
import { ExpandableListWithImageBlock } from '@/components/ui/ExpandableListWithImageBlock';
import type { ExpandableIconListItem } from '@/components/ui/ExpandableIconList';
import type { ExpandableIconListGroupSection } from '@/components/ui/ExpandableIconListGroup';

const LAWYERS_HERO_IMAGE_LTR_SRC = '/static/lawyers/lawyer.svg';
const LAWYERS_EARN_ICON_SRC = '/static/lawyers/money.svg';
const LAWYERS_BANNER_LOGO_SRC = '/static/techrealt.svg';
const LAWYERS_BANNER_IMAGE_SRC = '/static/mortgage-loans.jpg';
const LAWYERS_HERO_IMAGE_RTL_SRC = '/static/lawyers/lawyers_heb.svg';
const LAWYERS_BADGE_ICON_SRC = '/static/lawyers/partnership.svg';
const LAWYERS_BADGE_ICON_GROUP_SRC = '/static/lawyers/group.svg';
/** First badge on picture (bottom-left) */
const LAWYERS_IMAGE_BADGE_1_ICON = '/static/picture.svg';
/** Second badge on picture (top) */
const LAWYERS_IMAGE_BADGE_2_ICON = '/static/computer.svg';
const LAWYERS_TEXT_COLOR_CLASS = 'text-black';
const LAWYERS_HIGHLIGHT_COLOR_CLASS = 'text-techrealt-red';
const LAWYERS_FONT_SIZE_CLASS = 'text-[clamp(18px,2.71vw,39px)]';
const LAWYERS_BUTTON_BG_CLASS = 'bg-techrealt-red hover:bg-techrealt-red/90';
const LAWYERS_BUTTON_TEXT_CLASS = 'text-white';
/** List container 571×282 px at 1440 viewport (clamp); max-w-full to avoid exceeding layout */
const LAWYERS_LIST_CONTAINER_CLASS =
  'w-full max-w-[clamp(280px,39.65vw,571px)] min-h-[clamp(140px,19.58vw,282px)] min-w-0';
/** List item icon: 36×36 on mobile; clamp from md; larger clamp on xl (desktop). */
const LAWYERS_LIST_ICON_SIZE_CLASS =
  'w-[36px] h-[36px] md:w-[clamp(36px,3.333vw,48px)] md:h-[clamp(36px,3.333vw,48px)] xl:w-[clamp(48px,3.333vw,56px)] xl:h-[clamp(48px,3.333vw,56px)]';

const TendersForLawyers: React.FC = () => {
  useContentFetch('tenders_lawyers');
  const { getContent } = useContentApi('tenders_lawyers');
  const { i18n } = useTranslation();
  const router = useRouter();
  const direction: 'ltr' | 'rtl' =
    i18n.language?.startsWith('he') || i18n.language === 'iw' ? 'rtl' : 'ltr';

  const iconBadgeItems = [
    { iconSrc: LAWYERS_BADGE_ICON_SRC, text: getContent('tenders_badge_1') },
    { iconSrc: LAWYERS_BADGE_ICON_GROUP_SRC, text: getContent('tenders_badge_2') },
    { iconSrc: LAWYERS_BADGE_ICON_SRC, text: getContent('tenders_badge_3') },
  ];

  const lawyersListItems: ExpandableIconListItem[] = [
    { iconSrc: '/static/chair.svg', translation: getContent('tenders_advantage_1') },
    { iconSrc: '/static/speaker_icon.svg', translation: getContent('tenders_advantage_2') },
    { iconSrc: '/static/yellow-picture.svg', translation: getContent('tenders_advantage_3') },
  ];
  const lawyersListSections: ExpandableIconListGroupSection[] = [
    {
      title: getContent('tenders_advantages_list_title'),
      items: lawyersListItems,
      defaultExpanded: true,
      titleClassName: 'text-techrealt-title text-techrealt-titleText font-medium',
      itemTextClassName: 'text-techrealt-description text-techrealt-descriptionText',
      sideContent: {
        imageFrontSrc: '',
        imageBackSrc: '/static/office-window-only.svg',
        badges: [
          { iconSrc: LAWYERS_IMAGE_BADGE_1_ICON, text: getContent('tenders_advantage_1') },
          { iconSrc: LAWYERS_IMAGE_BADGE_2_ICON, text: getContent('tenders_advantage_2') },
        ],
      },
    },
  ];

  return (
    <Container className="bg-white min-h-screen relative">
      <div className="pt-[clamp(12px,3vw,20px)] md:pt-0 px-[clamp(16px,2.78vw,40px)] md:px-0">
        <Image
          src="/static/menu/techRealt.png"
          alt="TechRealt Logo"
          width={160}
          height={33}
          className="object-contain relative md:absolute md:top-0 md:start-[clamp(16px,4vw,33.34px)] z-10"
        />
      </div>
      <div className="pt-[clamp(24px,5vw,40px)] md:pt-[clamp(80px,12vw,120px)] px-[clamp(16px,2.78vw,40px)] pb-[clamp(24px,3vw,48px)]">
        <div className="flex flex-col w-full">
          <TextWithBigPicture
          text={getContent('tenders_about_text')}
          highlightPart={getContent('tenders_about_red')}
          highlightColorClassName={LAWYERS_HIGHLIGHT_COLOR_CLASS}
          fontSizeClassName={LAWYERS_FONT_SIZE_CLASS}
          textColorClassName={LAWYERS_TEXT_COLOR_CLASS}
          pictureSrc={direction === 'ltr' ? LAWYERS_HERO_IMAGE_LTR_SRC : LAWYERS_HERO_IMAGE_RTL_SRC}
          pictureAlt={getContent('tenders_about_title')}
          iconBadgeItems={iconBadgeItems}
          direction={direction}
          buttonLabel={getContent('tenders_register_button')}
          buttonHref="/registration"
          buttonBackgroundClassName={LAWYERS_BUTTON_BG_CLASS}
          buttonTextClassName={LAWYERS_BUTTON_TEXT_CLASS}
          buttonClassName="max-xs:w-full"
        />
        </div>
        <div className="mt-[clamp(56px,14.36vw,80px)] lg:mt-[clamp(104px,7.22vw,139px)] pb-[clamp(40px,5.556vw,72px)]">
          <CompanyBanner
            direction={direction}
            backgroundClassName="bg-techrealt-red"
            title={getContent('tenders_for_lawyers_title')}
            titleClassName="text-white font-medium leading-tight text-tenders-brokers-title"
            description={getContent('tenders_for_lawyers_subtitle')}
            descriptionClassName="text-white font-[400] text-[clamp(14px,1.11vw,16px)] leading-relaxed"
            logoSrc={LAWYERS_BANNER_LOGO_SRC}
            imageSrc={LAWYERS_BANNER_IMAGE_SRC}
            imageAlt={getContent('tenders_about_title') || 'Lawyers'}
            logoSizeVariant="tenders"
          />
        </div>
        <div>
          <ProfitContainer
            direction={direction}
            label={getContent('tenders_earnings_title')}
            title={getContent('tenders_earnings_block_title')}
            description={getContent('tenders_earnings_block_description')}
            showButton={false}
            buttonLabel=""
            iconSrc={LAWYERS_EARN_ICON_SRC}
            iconClassName="w-[clamp(20px,1.667vw,32px)] h-[clamp(20px,1.667vw,32px)]"
            iconWrapperClassName="rounded-full bg-white w-[clamp(40px,3.54vw,68px)] h-[clamp(40px,3.54vw,68px)] flex items-center justify-center flex-shrink-0 p-[clamp(4px,0.56vw,8px)] filter filter-techrealt-red-icon"
            blockBackgroundClassName="bg-techrealt-containers rounded-[clamp(8px,1.111vw,16px)] px-[clamp(16px,2.083vw,30px)] py-[clamp(14px,1.667vw,24px)] h-full"
            labelClassName="text-tenders-brokers-title font-semibold text-black text-left rtl:text-right"
            titleClassName="font-inter whitespace-pre-line font-[600] text-techrealt-title text-techrealt-titleText"
            descriptionClassName="text-techrealt-description leading-relaxed text-techrealt-descriptionText"
          />
        </div>
        <div className="flex flex-col w-full max-w-full min-w-0 overflow-x-hidden mt-techrealt-section-gap" dir={direction}>
          <ExpandableListWithImageBlock
            title={getContent('tenders_advantages_title')}
            sections={lawyersListSections}
            direction={direction}
            expandable={false}
            transparentBackground
            wrapperClassName="!mt-0"
            listContainerClassName={LAWYERS_LIST_CONTAINER_CLASS}
            listBackgroundClassName="bg-techrealt-containers"
            listTitleColorClassName="text-techrealt-titleText"
            listItemTextColorClassName="text-techrealt-descriptionText"
            listBadgeBackgroundClassName="bg-accent-cooperationHighlight"
            listItemIconFilterClassName="brightness-0"
            listHideBorder
            listItemIconWrapperSizeClassName={LAWYERS_LIST_ICON_SIZE_CLASS}
            imageBadgeBackgroundClassName="bg-techrealt-containers"
            imageBadgeTextColorClassName="text-techrealt-titleText"
            imageBadgeIconFilterClassName="filter-techrealt-red-icon"
            buttonLabel={getContent('tenders_register_button')}
            onButtonClick={() => router.push('/registration')}
            titleBaseClassName="text-techrealt-title font-medium leading-tight text-start"
            titleClassName="text-techrealt-titleText"
            renderButtonOutside
          />
          {getContent('tenders_register_button') && (
            <div className="flex justify-center w-full mt-auto pt-[clamp(16px,2.222vw,24px)]">
              <button
                type="button"
                onClick={() => router.push('/registration')}
                className="w-[clamp(200px,20.49vw,295px)] h-[clamp(36px,2.99vw,43px)] flex items-center justify-center rounded-lg font-medium bg-techrealt-red hover:bg-techrealt-red/90 text-techrealt-buttonFontColor transition-colors"
              >
                {getContent('tenders_register_button')}
              </button>
            </div>
          )}
        </div>
        <div className="mt-techrealt-section-gap">
          <HowItWorksSection
            getContent={getContent}
            direction={direction}
            titleKey="lawyers_how_it_works_title"
            titleClassName="text-[clamp(24px,2.031vw,39px)]"
            stepsConfig={[
              { titleKey: 'lawyers_step_1', descKey: 'lawyers_step_1_desc' },
              { titleKey: 'lawyers_step_2', descKey: 'lawyers_step_2_desc' },
              { titleKey: 'lawyers_step_3', descKey: 'lawyers_step_3_desc' },
              { titleKey: 'lawyers_step_4', descKey: 'lawyers_step_4_desc' },
              { titleKey: 'lawyers_step_5', descKey: 'lawyers_step_5_desc' },
            ]}
            stepTextContainerWidthClassName="max-w-[clamp(300px,90%,1200px)]"
            stepCardWidthClassName="w-[clamp(280px,91vw,350px)] lg:w-[clamp(260px,25.278vw,480px)]"
            stepCardHeightClassName="h-[clamp(330px,calc(59vw+130px),361px)] md:h-[clamp(200px,23.611vw,450px)]"
            stepTitleClassName="text-tenders-brokers-list-title text-techrealt-titleText"
            stepDescriptionClassName="text-tenders-brokers-description text-techrealt-descriptionText"
            sectionBackgroundClassName="bg-white"
            sectionTitleColorClassName="text-techrealt-titleText"
            stepCardBackgroundClassName="bg-techrealt-containers"
            stepNumberClassName="text-techrealt-red"
            buttonWrapperClassName="flex justify-center max-xs:w-full"
            buttonSizeClassName="max-xs:w-full xs:w-[clamp(200px,12.97vw,249px)] h-[clamp(44px,2.92vw,56px)] flex items-center justify-center"
            buttonClassName="rounded-lg font-medium bg-techrealt-red hover:bg-techrealt-red/90 text-techrealt-buttonFontColor transition-colors"
            buttonLabel={getContent('tenders_register_button')}
            onButtonClick={() => router.push('/registration')}
            containedBackground
            sectionPaddingClassName="py-[clamp(24px,3.333vw,48px)]"
            titleMarginBottomClassName="mb-[clamp(16px,2.222vw,32px)]"
            buttonMarginTopClassName="mt-[clamp(16px,2.222vw,32px)]"
          />
        </div>
        <div className="mt-techrealt-section-gap">
          <FormCtaBanner
            title={getContent('tenders_cta_title')}
            buttonLabel={getContent('tenders_cta_button')}
            buttonHref="/registration"
            direction={direction}
            onButtonClick={() => router.push('/registration')}
            showBackgroundImage={false}
            alignToLayout
            buttonBorderClassName="border border-techrealt-buttonBorder"
            titleClassName="text-tenders-brokers-title"
            className="max-md:!max-w-full max-md:!min-h-[295px] max-md:!w-full max-md:!p-[24px]"
            innerContentClassName="max-md:!gap-[16px] max-md:!min-h-0 max-md:!w-full"
          />
        </div>
      </div>
    </Container>
  );
};

export default TendersForLawyers;
