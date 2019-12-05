import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './assets/locales/en/translation.json';
import translationCN from './assets/locales/ch/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    ch: {
        translation: translationCN
    }
}

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        resources,
        fallbackLng: "ch",
        debug: false,
        interpolation: {
            escapeValue: false,
        }
    });


export default i18n;