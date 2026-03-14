/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindcssRtl from 'tailwindcss-rtl';
import type { Config } from 'tailwindcss';

const themeExtend: NonNullable<NonNullable<Config['theme']>['extend']> = {
  colors: {
    accent: {
      primary: 'hsla(52, 96%, 64%,1)',
      secondary: 'hsla(45, 92%, 70%, 1)',
      primaryActiveButton: 'hsla(52, 100%, 50%, 1 )',
      tertiary: 'hsla(46, 93%, 95%, 1)',
      loginButton: '#f8E54d',
      forgotPasswordLink: '#FBE54D',
      /** Yellow for file upload badge / highlighted UI (#FBE54D) */
      fileBadge: '#FBE54D',
      /** Yellow for cooperation hero highlight (500₪) – #FBE54D */
      cooperationHighlight: '#FBE54D',
      /** Icon tint for banner (e.g. IconBanner) – #FB5E4D */
      bannerIcon: '#FB5E4D',
    },
    base: {
      border: '#161616',
      sidebarBg: '#242529',
      stroke: '#333535',
      primary: 'hsla(0, 0%, 9%, 1)',
      base800: 'hsla(228, 9%, 23%, 1)',
      primaryDisabledButton: 'hsl(0, 0%, 18%, 1)',
      secondary: 'hsla(228, 6%, 15%, 1)',
      secondaryDefaultButton: 'hsla(180, 2%, 20%, 1)',
      secondaryHoveredButton: 'hsla(220,15%,16%, 1)',
      secondaryActiveButton: 'hsl(219, 10%, 27%, 1)',
      secondaryDisabledButton: 'hsl(180, 2%, 20%, 1)',
      inputs: 'hsla(220, 10%, 27%, 1)',
      disabled: 'hsla(220, 10%, 27%, 1)',
      primaryIcon: 'hsla(0, 0%, 9%, 1)',
      disabledIcon: 'hsla(0, 0%, 52%, 1)',
      secondaryIcon: 'hsla(0,0%,100%, 1)',
      bellIcon: 'hsla(0,0%,78%, 1)',
      warning: 'hsla(228, 9%, 23%, 1)',
      scroll: 'hsla(219,10%,27%, 1)',
      white: 'hsla(0, 0%, 100%, 1)',
      warningBaseStrokeAlternative: 'hsla(180, 2%, 38%, 1)',
      base900: 'hsla(231, 8%, 18%, 1)',
      tertiaryDisabledButton: 'hsla(231, 9%, 28%, 1)',
      /** Vacancy tag background – #3F444D */
      tagBg: '#3F444D',
      /** Success card background (e.g. application received) – #2A2B31 */
      successCard: '#2A2B31',
      /** Mortgage loans banner background – #41434E */
      bannerBg: '#41434E',
      /** Tenders map offices banner background – #414344 */
      tendersOfficesBanner: '#414344',
      /** Wizard frame submit button background – #84848484 (with alpha) */
      wizardSubmitButton: '#84848484',
      /** Icon badge / banner background (e.g. TextWithBigPicture) – #F5F5F5 */
      badgeBg: '#F5F5F5',
    },
    textTheme: {
      primary: 'hsla(0, 0%, 100%, 1)',
      secondary: 'hsla(0,0%,82%, 1)',
      disabled: 'hsla(0, 0%, 52%, 1)',
      secondaryIcons: 'hsla(0, 0%, 78%, 1)',
      darkPrimary: 'hsla(0, 0%, 9%, 1)',
      muted: 'hsla(0, 0%, 82%, 1)',
      /** File size text (e.g. upload badge) – 12px Inter, #848484 */
      fileSize: '#848484',
    },
    warning: {
      success100: 'hsla(169, 39%, 45%, 1)',
      success500: 'hsla(180, 18%, 21%, 1)',
      warning100: 'hsla(26, 68%, 52%, 1)',
      warning500: 'hsla(24, 26%, 22%, 1)',
      error100: 'hsla(0, 68%, 52%, 1)',
      error500: 'hsla(0, 26%, 22%, 1)',
      validation: 'hsla(11, 77%, 58%, 1)',
    },
    /** Form validation error (border, text, icon) – #E76143 */
    error: {
      validation: '#E76143',
    },
    /** Techrealt theme tokens (tenders-for-lawyers: highlight, button, banner background, containers, text) */
    techrealt: {
      red: '#FF4B49',
      bg: '#f9fafb',
      containers: '#f5f5f5',
      /** Earnings block title text color – #2E2E2E */
      titleText: '#2E2E2E',
      /** Earnings block description text color – #565656 */
      descriptionText: '#565656',
      /** Button text color (e.g. CTA on white background) – white */
      buttonFontColor: '#ffffff',
      /** Button border color (e.g. FormCtaBanner CTA) – #161616 */
      buttonBorder: '#161616',
    },
  },
  /** Filter for tinting icon to techrealt red (#FF4B49) */
  filter: {
    'techrealt-red-icon':
      'invert(32%) sepia(98%) saturate(5000%) hue-rotate(347deg) brightness(100%) contrast(101%)',
  },
  screens: {
    xs: '375px',
    sm: '768px',
    md: '1024px',
    lg: '1440px',
    xl: '1920px',
    sidebar: '1241px',
  },
  fontSize: {
    '3xs': '0.75rem',
    '2xs': '0.9rem',
    xs: '1rem',
    sm: '1.2rem',
    base: '0.75rem',
    cookie: '14px',
    xl: '1.6rem',
    '2xl': '1.8rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.1rem',
    '6xl': '4.8rem',
    hero: '4rem',
    'hero-subtitle': '31px',
    form: '16px',
    formLabel: 'clamp(12px, 2.5vw, 16px)',
    /** Tenders-for-brokers page: hero title; 25px min, 39px at 1440 (lg), clamp for xl */
    'tenders-brokers-title': 'clamp(25px, 2.708vw, 39px)',
    /** Tenders-for-brokers page: description text, 16px clamp till lg */
    'tenders-brokers-description': 'clamp(16px, 1.03vw, 18px)',
    /** Tenders-for-brokers page: bullet description, 16px clamp till lg */
    'tenders-brokers-bullets': 'clamp(16px, 4.103vw, 20px)',
    /** Tenders-for-brokers page: list box titles; 20px on desktop (1440), clamp for xl */
    'tenders-brokers-list-title': 'clamp(18px, 1.389vw, 20px)',
    /** Tenders-for-brokers page: list fonts – 16px on mobile (350px), clamp till md */
    'tenders-brokers-list-mobile': 'clamp(16px, 4.571vw, 16px)',
    /** Broker questionnaire: page and section titles – 31px at 390px viewport, clamp till md */
    'broker-questionnaire-title': 'clamp(31px, 7.95vw, 48px)',
    /** Broker questionnaire: field labels – 18px at 390px viewport, clamp till md */
    /** Broker questionnaire: field labels – 16px at 390px viewport, clamp till md */
    'broker-questionnaire-label': 'clamp(16px, 4.1vw, 20px)',
    /** Broker questionnaire: field values (input/select/textarea text) – 16px at 390px viewport, clamp till md */
    'broker-questionnaire-field': 'clamp(16px, 4.1vw, 18px)',
    /** Tenders-for-lawyers: desktop title – fixed 25px */
    'techrealt-title': '25px',
    /** Tenders-for-lawyers: earnings block description */
    'techrealt-description': '16px',
    /** Techrealt mobile font size: 16px max, clamp up to md */
    'techrealt-mobile-font': 'clamp(12px, 3.5vw, 16px)',
    /** Techrealt mobile title: 20px – use as base, override with md:text-techrealt-title */
    'techrealt-mobile-title': '20px',
  },
  lineHeight: {
    cookie: '140%',
  },
  fontWeight: {
    hairline: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    'extra-bold': '800',
    black: '900',
  },
  fontFamily: {
    ru: ['var(--font-roboto)', 'Roboto', 'sans-serif'],
    he: ['var(--font-arimo)', 'Arimo', 'sans-serif'],
    /** Inter: step numbers (StepCard), UI labels; use with class font-inter */
    inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
  },
  zIndex: {
    dropdown: '200',
    overlay: '300',
    modal: '400',
    toast: '500',
  },
  maxWidth: {
    page: '1900px',
    content: '1440px',
    authSm: '400px',
    authMd: '500px',
    authLg: '600px',
    formLg: '700px',
  },
  spacing: {
    fluid: 'clamp(16px, 12vw, 230px)',
    /** Broker questionnaire: gap between field title and input – 12px at 350px viewport, clamp till md */
    'broker-questionnaire-label-gap': 'clamp(12px, 3.43vw, 16px)',
    /** Vertical space between red banner and next section – 96px at xl (1920) */
    'techrealt-section-gap': 'clamp(48px, 5vw, 96px)',
  },
  width: {
    'sidebar-closed': '46px',
    'sidebar-closed-sm': '35px',
    'sidebar-fluid': 'var(--sidebar-width-fluid)',
    'cookie-banner': '850px',
    'cookie-button': '182px',
    'cookie-close': '32px',
    'cookie-icon': '52px',
  },
  height: {
    'cookie-banner': '111px',
    'cookie-button': '40px',
    'cookie-close': '32px',
    'cookie-icon': '52px',
  },
  margin: {
    'center-vw': 'max(0px, calc((100vw - 1440px) / 2))',
    'center-vw-sidebar': 'max(0px, calc((100vw - 46px - 1440px) / 2))',
    'center-vw-sidebar-sm': 'max(0px, calc((100vw - 35px - 1440px) / 2))',
  },
};

function uiComponentsPlugin(api: { addComponents: (components: Record<string, unknown>) => void }): void {
  api.addComponents({
    '.btn-primary': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton': {},
    },
    '.btn-primary:disabled': {
      '@apply opacity-50 cursor-not-allowed': {},
    },
    '.btn-primary-sm': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton px-4 py-2 text-sm': {},
    },
    '.btn-primary-md': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton px-6 py-3': {},
    },
    '.btn-primary-lg': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton px-8 py-3': {},
    },
    '.btn-primary-full': {
      '@apply rounded-lg font-medium transition-colors bg-accent-primary text-base-primary hover:bg-accent-primaryActiveButton w-full py-3': {},
    },
    '.tab-btn': {
      '@apply px-4 py-2 rounded-lg text-sm font-medium transition-colors': {},
    },
    '.tab-btn-active': {
      '@apply bg-accent-primary text-base-primary': {},
    },
    '.tab-btn-inactive': {
      '@apply bg-base-secondary text-textTheme-secondary hover:bg-base-base800': {},
    },
    '.input-base': {
      '@apply px-4 py-3 bg-base-inputs rounded-lg text-textTheme-primary placeholder-textTheme-disabled outline-none focus:ring-2 focus:ring-accent-primary w-full': {},
    },
    '.surface-card': {
      '@apply bg-base-secondary rounded-lg': {},
    },
    '.surface-card-p6': {
      '@apply bg-base-secondary rounded-lg p-6': {},
    },
    '.surface-card-p8': {
      '@apply bg-base-secondary rounded-lg p-8': {},
    },
    '.surface-card-hover': {
      '@apply bg-base-secondary rounded-lg hover:bg-base-base800 transition-colors': {},
    },
    '.page-stack': {
      '@apply flex flex-col gap-8 w-full my-8': {},
    },
    '.form-label': {
      '@apply font-medium text-textTheme-primary bg-transparent text-formLabel min-w-0 break-words text-left rtl:text-right': {},
    },
  });
}

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../web/src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    { pattern: /^font-(inter|he|ru)$/ }, // ensure font utilities are always generated
    { pattern: /^bg-techrealt-/, variants: ['hover'] }, // CompanyBanner backgroundClassName (dynamic)
    { pattern: /^text-techrealt-/ }, // highlight, etc.
    { pattern: /^border-techrealt-/ }, // FormCtaBanner button border
    { pattern: /^filter-techrealt-/ }, // icon tint (e.g. filter-techrealt-red-icon)
    { pattern: /^(mt|pt|mb|pb|gap)-techrealt-section-gap$/ }, // section spacing and gap between stacked blocks
  ],
  theme: {
    extend: themeExtend,
  },
  plugins: [
    tailwindcssRtl,
    tailwindScrollbar({ nocompatible: true }),
    uiComponentsPlugin as Config['plugins'] extends (infer P)[] ? P : never,
  ],
};

export default config;
