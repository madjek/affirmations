import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Language {
  EN = 'en',
  RU = 'ru',
  ES = 'es',
}

type SettingsState = {
  language: Language;
  setLanguage: (language: string) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: Language.EN,

      setLanguage: (language: string) => {
        if (!Object.values(Language).includes(language as Language)) {
          language = Language.EN;
        }
        set({ language: language as Language });
      },
    }),
    {
      name: 'settings-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
