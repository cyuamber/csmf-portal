import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationCN from './locales/ch/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    ch: {
        translation: translationCN
    }
}

i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(reactI18nextModule)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources,
        fallbackLng: 'en',
        lng: "en",
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;