import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "app.title": "Xpedition R",
      "app.description": "We empower Indian farmers with AI tools to improve crop health using technology",
      "nav.home": "Home",
      "nav.about": "About Us",
      "nav.help": "Get Help",
      "nav.contact": "Contact",
      // Add more translations
    }
  },
  te: {
    translation: {
      "app.title": "ఎక్స్పెడిషన్ ఆర్",
      "app.description": "సాంకేతికతను ఉపయోగించి పంట ఆరోగ్యాన్ని మెరుగుపరచడానికి భారతీయ రైతులకు AI సాధనాలతో శక్తినిస్తాము",
      "nav.home": "హోమ్",
      "nav.about": "మా గురించి",
      "nav.help": "సహాయం పొందండి",
      "nav.contact": "సంప్రదించండి",
      // Add more translations
    }
  },
  // Add other language translations
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;