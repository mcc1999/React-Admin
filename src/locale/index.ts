import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en";
import zhHansTranslation from "./zh-Hans";
import zhHantTranslation from "./zh-Hant";
import arTranslation from "./ar";
import { SETTING } from "@/common/localStorage-key";

const resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
  "zh-Hans": {
    translation: zhHansTranslation,
  },
  "zh-Hant": {
    translation: zhHantTranslation,
  },
};

const persistSetting = JSON.parse(localStorage.getItem(SETTING) || "{}");

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: persistSetting.state?.language || "zh-Hans",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
