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
            title: 'Message in a bottle',
            text1: "{{name}}, did you know that studies show that couples who share positive memories have happier, more resilient relationships?",
            text2: "No doubt, these current times have been a stressful time for many.",
            text3: "Have a look — what is one positive memory that you will have of your partner from these pandemic times so far?",   
            button: "Write my memory",
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
            title: "Life might throw some curveballs",
            text: "...like having kids! Gilly helps the “lovers” in your relationship thrive through it all",
            button: "Next"
          },
          About3:{
            title: "A treat at a time",
            text: "With just one, less than 15 mins, exercise a day — you can cultivate intimacy & pleasure in your relationship",
            button: "Get Started"
          },
          About4:{
            supertitle: "Before we begin",
            title: "Are you in a relationship?",
            text: "This information is not saved until you've finished creating an account",
            disclaimer: "Please note that Gilly is primarily meant for couples, but you can still enjoy our treats",
            button: "Next"
          },
          Memory:{
            title: "Fill in the blanks",
            text1: "“{{who}}, years from now when we look back on this time, I will always remember how you {{what}}. Thank you.“",
            text2: "Thank you", 
            button: "Looks good, what's next?",
            name: "You partner's name",
            suggestion: "E.g., took over meal planning and cooking so that I wasn't overwhelmed with trying to balance the kids and work. "
          },
          ShareMessage:{
            title: "Share your message",
            text1: "This is how the magic happens — small, doable, regular acts of connection. And there is lots more to come!",
            text2 : "{{who}}, years from now when we look back on this time, I will always remember how you {{what}}. Thank you.",
            button: "Send to {{who}}",
            button2: "I don't want to send it to {{who}} now"
          }

        },
       
    },
    
  });
export default i18n;
