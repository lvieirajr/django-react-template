import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "@/locales/en/translation.json";
import translationES from "@/locales/es/translation.json";
import translationPT from "@/locales/pt/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      es: { translation: translationES },
      pt: { translation: translationPT },
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [
        "querystring",
        "localStorage",
        "cookie",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },
    fallbackLng: "en",
  });

export default i18n;
