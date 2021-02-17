import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';


i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    initImmediate: true,
    fallbackLng: 'en-GB',
    debug: false,

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    },
    resources: {
        en: {
          FirstTreat: {
            title: 'Your first treat',
            introduction: 'Message in a bottle',
            text: "{{name}}, did you know that studies show that couples who share positive memories have happier, more resilient relationships?\
            No doubt, these current times have been a stressful time for many.",
          },
          Splash: {
            splashText: "Intimacy and sexual wellness for the very busy & modern couple",
            button: "Get started",
            signIn: "already one of us? Sign in"
          },
          About1:{
            title: "Sex & intimacy",
            text: "are key ingredients for a happy & long lasting relationship",
            button: "Next"
          },
          About2:{
            title: "And life might throw some curveballs",
            text: "...like having kids! Gilly helps the “lovers” in your relationship thrive through it all",
            button: "Next"
          },
          About3:{
            title: "A daily treat",
            text: "With just one, less than 15 mins, exercise a day — you can cultivate intimacy & pleasure in your relationship",
            button: "Get Started"
          },
          About4:{
            supertitle: "Before we begin",
            title: "Are you in a relationship?",
            text: "Don’t worry, this information is not saved until you've finished creating an account",
            disclaimer: "Please note that Gilly is primarily meant for couples, but you can still learn a lot in a solo journey",
            button: "Next"
          }
        },
       
    },
    
  });
export default i18n;
