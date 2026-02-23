import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Per-page translation namespaces (merged into single "translation" for backward compatibility)
import enCommon from '../../public/locales/en/common.json';
import enMainPage from '../../public/locales/en/main_page.json';
import enAbout from '../../public/locales/en/about.json';
import enContacts from '../../public/locales/en/contacts.json';
import enCooperation from '../../public/locales/en/cooperation.json';
import enVacancies from '../../public/locales/en/vacancies.json';
import enTendersBrokers from '../../public/locales/en/tenders_brokers.json';
import enTendersLawyers from '../../public/locales/en/tenders_lawyers.json';
import enLegal from '../../public/locales/en/legal.json';

import heCommon from '../../public/locales/he/common.json';
import heMainPage from '../../public/locales/he/main_page.json';
import heAbout from '../../public/locales/he/about.json';
import heContacts from '../../public/locales/he/contacts.json';
import heCooperation from '../../public/locales/he/cooperation.json';
import heVacancies from '../../public/locales/he/vacancies.json';
import heTendersBrokers from '../../public/locales/he/tenders_brokers.json';
import heTendersLawyers from '../../public/locales/he/tenders_lawyers.json';
import heLegal from '../../public/locales/he/legal.json';

import ruCommon from '../../public/locales/ru/common.json';
import ruMainPage from '../../public/locales/ru/main_page.json';
import ruAbout from '../../public/locales/ru/about.json';
import ruContacts from '../../public/locales/ru/contacts.json';
import ruCooperation from '../../public/locales/ru/cooperation.json';
import ruVacancies from '../../public/locales/ru/vacancies.json';
import ruTendersBrokers from '../../public/locales/ru/tenders_brokers.json';
import ruTendersLawyers from '../../public/locales/ru/tenders_lawyers.json';
import ruLegal from '../../public/locales/ru/legal.json';

const enTranslation = {
  ...enCommon,
  ...enMainPage,
  ...enAbout,
  ...enContacts,
  ...enCooperation,
  ...enVacancies,
  ...enTendersBrokers,
  ...enTendersLawyers,
  ...enLegal,
} as Record<string, unknown>;

const heTranslation = {
  ...heCommon,
  ...heMainPage,
  ...heAbout,
  ...heContacts,
  ...heCooperation,
  ...heVacancies,
  ...heTendersBrokers,
  ...heTendersLawyers,
  ...heLegal,
} as Record<string, unknown>;

const ruTranslation = {
  ...ruCommon,
  ...ruMainPage,
  ...ruAbout,
  ...ruContacts,
  ...ruCooperation,
  ...ruVacancies,
  ...ruTendersBrokers,
  ...ruTendersLawyers,
  ...ruLegal,
} as Record<string, unknown>;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      he: { translation: heTranslation },
      ru: { translation: ruTranslation },
    },
    fallbackLng: 'he',
    load: 'languageOnly',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },

    initImmediate: false,
  });

export default i18n;
