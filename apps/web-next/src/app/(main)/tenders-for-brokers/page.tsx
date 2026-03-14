'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import Container from '@/components/ui/Container/Container';
import TendersHeroMap from '@/components/ui/TendersHeroMap/TendersHeroMap';
import { BulletsSection } from '@/components/ui/BulletsSection';
import { CompanyBanner } from '@/components/ui/CompanyBanner';
import { ExpandableListWithImageBlock } from '@/components/ui/ExpandableListWithImageBlock';
import { trackClick } from '@/helpers/analytics';
import { ProfitContainer } from './components/ProfitContainer';
import { FranchiseCostBlock } from './components/FranchiseCostBlock';
import { FormCtaBanner } from '@/components/ui/FormCtaBanner';
import type { ExpandableIconListItem } from '@/components/ui/ExpandableIconList';
import type { ExpandableIconListGroupSection } from '@/components/ui/ExpandableIconListGroup';
import PartnersSwiper from '@/components/ui/PartnersSwiper/PartnersSwiper';
import { HowItWorksSection } from '../cooperation/components/HowItWorksSection';

const TENDERS_PERCENTAGE_ICON_SRC = '/static/tenders/percentage-blackandwhite.svg';
const TENDERS_LOGO_SRC = '/static/partnerships/bankimonline-mortgage-logo.svg';
const TENDERS_CIRCLE_IMAGE_SRC = '/static/mortgage-loans.jpg';
const DARK_BULLET_ICON_SRC = '/static/partnerships/dark-dot.svg';
const TURNKEY_OFFICE_ICON_SRC = '/static/tenders/office.svg';
const TURNKEY_TRAINING_ICON_SRC = '/static/tenders/training.svg';
const TURNKEY_RIGHTS_FOR_BRAND_ICON_SRC = '/static/tenders/rights-for-brand.svg';
const TURNKEY_SPEAKER_ICON_SRC = '/static/tenders/speaker.svg';
const TURNKEY_TEAM_ICON_SRC = '/static/tenders/percentage-blackandwhite.svg';
const TURNKEY_BRAND_ICON_SRC = '/static/partnerships/percent-icon.svg';
const TURNKEY_MARKETING_ICON_SRC = '/static/partnerships/dark-dot.svg';
const OFFICEVIEW_ICON_SRC = '/static/tenders/office-window-bank.svg';
const WINDOW_SVG_SRC = '/static/tenders/window.svg';
const LOGIN_SVG_SRC = '/static/tenders/login.svg';
const HOUSE_ICON_SRC = '/static/tenders/house.svg';
const COOPERATION_ICON_SRC = '/static/tenders/cooperation.svg';
const STACK_ICON_SRC = '/static/tenders/stack.svg';
const EARPHONES_ICON_SRC = '/static/tenders/earphones.svg';
const TURNKEY_ZOOM_ICON_SRC = '/static/tenders/zoom.svg';
const TURNKEY_COMMUNICATION_ICON_SRC = '/static/tenders/communication.svg';
const TURNKEY_CREDIT_ICON_SRC = '/static/tenders/credit.svg';
const MORTGAGE_LOANS_ICON_SRC = '/static/mortgage-loans.svg';

const TURNKEY_SECTION_ONE_TITLE_CLASS = 'max-md:text-tenders-brokers-list-mobile md:text-tenders-brokers-list-title';
const TURNKEY_SECTION_ONE_ITEM_TEXT_CLASS = 'max-md:text-tenders-brokers-list-mobile md:text-tenders-brokers-bullets';
/** List container and list styling — all sent from outside (no built-in broker styling in component). */
const BROKERS_LIST_CONTAINER_CLASS = 'w-full max-w-full min-w-0';
const BROKERS_LIST_BACKGROUND_CLASS = 'bg-base-sidebarBg';
const BROKERS_LIST_TITLE_COLOR_CLASS = 'text-tenders-brokers-list-title';
const BROKERS_LIST_ITEM_TEXT_COLOR_CLASS = 'text-tenders-brokers-bullets';
const BROKERS_LIST_BADGE_BACKGROUND_CLASS = 'bg-white/10';
/** List item icon: 36×36 on mobile; clamp from md; larger on xl. */
const BROKERS_LIST_ICON_SIZE_CLASS =
  'w-[36px] h-[36px] md:w-[clamp(36px,3.333vw,48px)] md:h-[clamp(36px,3.333vw,48px)] xl:w-[clamp(48px,3.333vw,56px)] xl:h-[clamp(48px,3.333vw,56px)]';
const BROKERS_IMAGE_BADGE_BACKGROUND_CLASS = 'bg-base-sidebarBg';
const BROKERS_IMAGE_BADGE_TEXT_COLOR_CLASS = 'text-tenders-brokers-title';
const BROKERS_IMAGE_BADGE_ICON_FILTER_CLASS = 'filter-techrealt-red-icon';

const TendersForBrokers: React.FC = () => {
  useContentFetch('tenders_brokers');
  const { getContent } = useContentApi('tenders_brokers');
  const { i18n } = useTranslation();
  const direction: 'ltr' | 'rtl' =
    i18n.language?.startsWith('he') || i18n.language === 'iw' ? 'rtl' : 'ltr';
  const router = useRouter();
  const turnkeyItemsSectionOne: ExpandableIconListItem[] = [
    {
      iconSrc: TURNKEY_OFFICE_ICON_SRC,
      translation: getContent('tenders_turnkey_bullet_1'),
    },
    {
      iconSrc: TURNKEY_TRAINING_ICON_SRC,
      translation: getContent('tenders_turnkey_bullet_2'),
    },
    {
      iconSrc: TURNKEY_RIGHTS_FOR_BRAND_ICON_SRC,
      translation: getContent('tenders_turnkey_bullet_3'),
    },
    {
      iconSrc: TURNKEY_SPEAKER_ICON_SRC,
      translation: getContent('tenders_turnkey_bullet_4'),
    },
  ];
  const turnkeyItemsSectionTwo: ExpandableIconListItem[] = [
    {
      iconSrc: TURNKEY_ZOOM_ICON_SRC,
      translation: getContent('tenders_turnkey_2_bullet_1'),
    },
    {
      iconSrc: TURNKEY_COMMUNICATION_ICON_SRC,
      translation: getContent('tenders_turnkey_2_bullet_2'),
    },
    {
      iconSrc: TURNKEY_CREDIT_ICON_SRC,
      translation: getContent('tenders_turnkey_2_bullet_3'),
    },
  ];
  const turnkeyItemsSectionThree: ExpandableIconListItem[] = [
    {
      iconSrc: EARPHONES_ICON_SRC,
      translation: getContent('tenders_turnkey_3_badge_2'),
    },
    {
      iconSrc: STACK_ICON_SRC,
      translation: getContent('tenders_turnkey_3_badge_1'),
    },
  ];
  const turnkeySections: ExpandableIconListGroupSection[] = [
    {
      title: getContent('tenders_turnkey_title'),
      items: turnkeyItemsSectionOne,
      defaultExpanded: true,
      titleClassName: TURNKEY_SECTION_ONE_TITLE_CLASS,
      itemTextClassName: TURNKEY_SECTION_ONE_ITEM_TEXT_CLASS,
      sideContent: {
        imageFrontSrc: '',
        imageBackSrc: OFFICEVIEW_ICON_SRC,
        badges: [
          { iconSrc: TURNKEY_OFFICE_ICON_SRC, text: getContent('tenders_office_badge_text') },
          { iconSrc: TURNKEY_OFFICE_ICON_SRC, text: getContent('tenders_brand_badge_text') },
        ],
      },
    },
    {
      title: getContent('tenders_turnkey_2_title'),
      items: turnkeyItemsSectionTwo,
      defaultExpanded: false,
      titleClassName: TURNKEY_SECTION_ONE_TITLE_CLASS,
      itemTextClassName: TURNKEY_SECTION_ONE_ITEM_TEXT_CLASS,
      sideContent: {
        imageFrontSrc: MORTGAGE_LOANS_ICON_SRC,
        imageBackSrc: HOUSE_ICON_SRC,
        badges: [
          { iconSrc: TURNKEY_OFFICE_ICON_SRC, text: getContent('tenders_brand_badge_text') },
          { iconSrc: TURNKEY_OFFICE_ICON_SRC, text: getContent('tenders_turnkey_2_badge_text') },
        ],
      },
    },
    {
      title: getContent('tenders_turnkey_3_title'),
      items: turnkeyItemsSectionThree,
      defaultExpanded: false,
      titleClassName: TURNKEY_SECTION_ONE_TITLE_CLASS,
      itemTextClassName: TURNKEY_SECTION_ONE_ITEM_TEXT_CLASS,
      sideContent: {
        imageFrontSrc: COOPERATION_ICON_SRC,
        imageBackSrc: '',
        badges: [
          { iconSrc: EARPHONES_ICON_SRC, text: getContent('tenders_turnkey_3_badge_2') },
          { iconSrc: STACK_ICON_SRC, text: getContent('tenders_turnkey_3_badge_1') },
        ],
      },
    },
  ];

  return (
    <Container
      className="max-[1240px]:px-0 min-[768px]:max-w-[var(--content-width-fluid)] relative w-full min-w-0 mt-[clamp(24px,4vw,32px)] lg:mt-[clamp(40px,4.444vw,84px)]"
      dir={direction}
    >
      <div className="pb-0 md:pb-[clamp(40px,5.556vw,72px)]">
        <div className="hidden lg:block w-full">
          <TendersHeroMap
            direction={direction}
            className="rounded-lg overflow-hidden w-full"
            officesBannerText={getContent('tenders_map_offices_banner')}
          />
        </div>
        <div className="relative w-full px-4 py-6 lg:absolute lg:top-[clamp(48px,4.444vw,84px)] lg:start-[clamp(32px,2.778vw,53px)] lg:z-10 lg:w-[clamp(280px,40.69vw,781px)] lg:h-[clamp(180px,26.6vw,510px)] lg:p-0 flex flex-col overflow-hidden">
        <BulletsSection
            title={getContent('tenders_map_hero_title')}
            titleClassName="text-tenders-brokers-title font-medium text-white leading-tight break-words min-w-0"
            titleHighlightWord={getContent('tenders_map_hero_title_brand')}
            titleHighlightClassName="text-accent-cooperationHighlight"
            bulletsText={[
              getContent('tenders_map_hero_bullet_1'),
              getContent('tenders_map_hero_bullet_2'),
              getContent('tenders_map_hero_bullet_3'),
            ]}
            bulletsClassName="text-white"
            bulletDescriptionClassName="text-tenders-brokers-bullets leading-relaxed min-w-0"
            direction={direction}
            layout="vertical"
            containerClassName="!mt-0 w-full max-w-full min-w-0 min-h-0 gap-[clamp(16px,2.5vw,24px)] lg:gap-[clamp(8px,1.111vw,21px)] h-auto lg:h-full"
            buttonLabel={getContent('brokers_register_button')}
            onButtonClick={() => {
              trackClick('brokers_register', '/broker-questionnaire');
              router.push('/broker-questionnaire');
            }}
        />
        </div>
        <div className="mt-[clamp(56px,14.36vw,80px)] lg:mt-[clamp(104px,7.22vw,139px)]">
          <CompanyBanner
            direction={direction}
            backgroundClassName="bg-accent-cooperationHighlight"
            title={getContent('tenders_yellow_title')}
            titleClassName="text-tenders-brokers-title font-medium leading-tight text-base-border"
            description={getContent('tenders_yellow_description')}
            descriptionClassName="text-tenders-brokers-description leading-relaxed text-base-border"
            bullets={[
              getContent('tenders_yellow_bullet_1'),
              getContent('tenders_yellow_bullet_2'),
              getContent('tenders_yellow_bullet_3'),
              getContent('tenders_yellow_bullet_4'),
            ]}
            bulletIconSrc={DARK_BULLET_ICON_SRC}
            bulletsClassName="text-base-border w-[clamp(280px,39.306vw,747px)] min-h-[clamp(48px,4.167vw,79px)]"
            bulletDescriptionClassName="text-tenders-brokers-bullets leading-relaxed"
            logoSrc={TENDERS_LOGO_SRC}
            imageSrc={TENDERS_CIRCLE_IMAGE_SRC}
            imageAlt={getContent('tenders_map_hero_title_brand') || 'Bankimonline'}
            logoSizeVariant="tenders"
          />
        </div>
        <div className="mt-techrealt-section-gap">
          <ProfitContainer
            direction={direction}
            label={getContent('tenders_profit_how_you_earn')}
            title={getContent('tenders_profit_title')}
            description={getContent('tenders_profit_description')}
            showButton={false}
            buttonLabel=""
            iconSrc={TENDERS_PERCENTAGE_ICON_SRC}
            blockBackgroundClassName="bg-base-sidebarBg rounded-[clamp(8px,1.111vw,16px)] px-[clamp(16px,2.083vw,30px)] py-[clamp(14px,1.667vw,24px)] h-full"
            labelClassName="text-tenders-brokers-title font-semibold text-white text-left rtl:text-right"
            titleClassName="font-inter whitespace-pre-line font-[600] text-tenders-brokers-title"
            descriptionClassName="text-tenders-brokers-description"
          />
        </div>
        <div className="mt-techrealt-section-gap max-w-full min-w-0 overflow-x-hidden">
          <ExpandableListWithImageBlock
            title={getContent('tenders_franchise_includes_title')}
            titleBaseClassName="text-tenders-brokers-title font-medium leading-tight text-start"
            titleClassName="text-tenders-brokers-title"
            sections={turnkeySections}
            direction={direction}
            wrapperClassName="!mt-0"
            listContainerClassName={BROKERS_LIST_CONTAINER_CLASS}
            listBackgroundClassName={BROKERS_LIST_BACKGROUND_CLASS}
            listTitleColorClassName={BROKERS_LIST_TITLE_COLOR_CLASS}
            listItemTextColorClassName={BROKERS_LIST_ITEM_TEXT_COLOR_CLASS}
            listBadgeBackgroundClassName={BROKERS_LIST_BADGE_BACKGROUND_CLASS}
            listHideBorder={false}
            listItemIconWrapperSizeClassName={BROKERS_LIST_ICON_SIZE_CLASS}
            imageBadgeBackgroundClassName={BROKERS_IMAGE_BADGE_BACKGROUND_CLASS}
            imageBadgeTextColorClassName={BROKERS_IMAGE_BADGE_TEXT_COLOR_CLASS}
            imageBadgeIconFilterClassName={BROKERS_IMAGE_BADGE_ICON_FILTER_CLASS}
            buttonLabel={getContent('tenders_consultation_button')}
            onButtonClick={() => {
              trackClick('brokers_consultation', '/broker-questionnaire');
              router.push('/broker-questionnaire');
            }}
            getImageWithBadgesProps={(selectedIndex, sideContent) => {
              if (selectedIndex === 1) {
                const section = turnkeySections[1];
                const badges = section?.sideContent?.badges ?? [];
                return {
                  imageSrc: WINDOW_SVG_SRC,
                  badges: badges.map((b) => ({ iconSrc: b.iconSrc, text: b.text })),
                  direction,
                  optionalImageSrc: LOGIN_SVG_SRC,
                  optionalImagePosition: {
                    left: 'clamp(22px, 2.37vw, 45.06px)',
                    top: 'clamp(88px, 9.21vw, 175px)',
                    width: 'clamp(82px, 8.579vw, 163px)',
                    height: 'clamp(66px, 6.966vw, 132.36px)',
                  },
                };
              }
              const imageSrc =
                (sideContent?.imageFrontSrc != null && sideContent.imageFrontSrc !== ''
                  ? sideContent.imageFrontSrc
                  : sideContent?.imageBackSrc) ?? '';
              const badges = sideContent?.badges?.map((b) => ({ iconSrc: b.iconSrc, text: b.text })) ?? [];
              const optionalImageSrc =
                sideContent?.imageBackSrc != null &&
                sideContent.imageBackSrc !== '' &&
                sideContent?.imageFrontSrc != null &&
                sideContent.imageFrontSrc !== ''
                  ? sideContent.imageBackSrc
                  : undefined;
              return {
                imageSrc,
                badges,
                direction,
                optionalImageSrc,
              };
            }}
          />
        </div>
        <div className="relative w-full min-h-[200px] lg:h-[clamp(266px,18.472vw,351px)] mt-techrealt-section-gap py-[clamp(24px,2vw,0px)] lg:py-0">
          <div
            className="absolute inset-y-0 bg-base-sidebarBg"
            style={{
              left: 'calc(-50vw + 50%)',
              right: 'calc(-50vw + 50%)',
            }}
            aria-hidden
          />
          <div className="relative z-10 w-full h-full flex items-center">
            <PartnersSwiper
              getContent={getContent}
              titleKey="tenders_partners_title"
              width="100%"
              titleClassName="text-tenders-brokers-title"
            />
          </div>
        </div>
        <div className="mt-techrealt-section-gap">
          <HowItWorksSection
            getContent={getContent}
            direction={direction}
            titleKey="brokers_steps_title"
            titleClassName="text-[clamp(24px,2.031vw,39px)]"
            stepsConfig={[
              { titleKey: 'brokers_step_1', descKey: 'brokers_step_1_desc' },
              { titleKey: 'brokers_step_2', descKey: 'brokers_step_2_desc' },
              { titleKey: 'brokers_step_3', descKey: 'brokers_step_3_desc' },
              { titleKey: 'brokers_step_4', descKey: 'brokers_step_4_desc' },
              { titleKey: 'brokers_step_5', descKey: 'brokers_step_5_desc' },
            ]}
            stepTextContainerWidthClassName="max-w-[clamp(300px,90%,1200px)]"
            stepCardWidthClassName="w-[clamp(280px,91vw,350px)] lg:w-[clamp(260px,25.278vw,480px)]"
            stepCardHeightClassName="h-[clamp(330px,calc(59vw+130px),361px)] md:h-[clamp(200px,23.611vw,450px)]"
            stepTitleClassName="text-tenders-brokers-list-title"
            stepDescriptionClassName="text-tenders-brokers-description"
            sectionPaddingClassName="py-[clamp(24px,3.333vw,48px)]"
            titleMarginBottomClassName="mb-[clamp(16px,2.222vw,32px)]"
            buttonMarginTopClassName="mt-[clamp(16px,2.222vw,32px)]"
            buttonLabel={getContent('tenders_consultation_button')}
            onButtonClick={() => {
              trackClick('brokers_consultation', '/broker-questionnaire');
              router.push('/broker-questionnaire');
            }}
          />
        </div>
        <div className="mt-techrealt-section-gap">
          <FranchiseCostBlock
            getContent={getContent}
            direction={direction}
            onButtonClick={() => {
              trackClick('franchise_form', '/broker-questionnaire');
              router.push('/broker-questionnaire');
            }}
          />
        </div>
        <div className="mt-techrealt-section-gap">
          <FormCtaBanner
            title={getContent('tenders_form_cta_title')}
            buttonLabel={getContent('tenders_form_cta_button')}
            buttonHref="/broker-questionnaire"
            direction={direction}
            onButtonClick={() => trackClick('brokers_register', '/broker-questionnaire')}
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

export default TendersForBrokers;
