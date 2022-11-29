import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from './lang/en/translationEn.json'
import translationFa from './lang/fa/translationFa.json';
// the translations
const resources = {
fa: {
    translation: translationFa
},
en: {
    translation: translationEn
},
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fa",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
export default i18n;