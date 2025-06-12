import { create } from 'zustand';

export enum Language {
  EN = 'en',
  RU = 'ru',
  ES = 'es',
}

type SetingsState = {
  language: Language;
};

export const useSettingsStore = create<SetingsState>((set) => ({
  language: Language.EN,

  setLanguage: (language: string) => {
    if (!Object.values(Language).includes(language as Language)) {
      language = Language.EN;
    }
    set({ language: language as Language });
  },
}));
