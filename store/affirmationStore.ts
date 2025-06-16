import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const STORAGE_KEY = 'affirmation_ids';

type AffirmationIdsStore = {
  affirmationIds: string[];
  addAffirmationId: (id: string) => Promise<void>;
  removeAffirmationId: (id: string) => Promise<void>;
  clearAffirmationIds: () => Promise<void>;
  hasAffirmationId: (id: string) => boolean;
  loadAffirmationIds: () => Promise<void>;
};

export const useAffirmationIdsStore = create<AffirmationIdsStore>(
  (set, get) => ({
    affirmationIds: [],

    addAffirmationId: async (id) => {
      const current = get().affirmationIds;
      if (!current.includes(id)) {
        const updated = [...current, id];
        set({ affirmationIds: updated });
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    },

    removeAffirmationId: async (id) => {
      const current = get().affirmationIds;
      const updated = current.filter((storedId) => storedId !== id);
      set({ affirmationIds: updated });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },

    clearAffirmationIds: async () => {
      set({ affirmationIds: [] });
      await AsyncStorage.removeItem(STORAGE_KEY);
    },

    hasAffirmationId: (id) => {
      return get().affirmationIds.includes(id);
    },

    loadAffirmationIds: async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: string[] = JSON.parse(stored);
          set({ affirmationIds: parsed });
        }
      } catch (e) {
        console.error('Failed to load affirmation IDs from storage', e);
      }
    },
  }),
);
