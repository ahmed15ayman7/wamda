import { create } from 'zustand';

// Language Store with localStorage
interface LanguageState {
  language: "ar"|"en";
  setLanguage: (lang: "ar"|"en") => void;
  getLang: () => "ar"|"en"; 
  initLanguage: () => void;
}

const useStore = create<LanguageState>((set) => ({
  language: 'ar',
  setLanguage: (lang: "ar"|"en") => {
    if (typeof window !== 'undefined') { 
      localStorage.setItem('language', lang);
    }
    set({ language: lang?lang:"en" });
  },
  //@ts-ignore
  getLang: ()  => {
    if (typeof window !== 'undefined') { // تحقق من البيئة
      return localStorage.getItem('language')?localStorage.getItem('language'):"en" as "ar"|"en"; // استرجاع اللغة من localStorage
    }
    return "en" as "ar"|"en";
  } ,
  
  // Initialize the state from localStorage
  initLanguage: () => {
    if (typeof window !== 'undefined') { // تحقق من البيئة
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        set({ language: savedLanguage as "ar"|"en" });
      }
    }
  },
}));

// Initialize language from localStorage on store creation
useStore.getState().initLanguage();

export default useStore;
