import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  clearTokens: () => Promise<void>;
  loadTokensFromStorage: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isLoading: true,

  setTokens: async (accessToken, refreshToken) => {
    await AsyncStorage.multiSet([
      ['accessToken', accessToken],
      ['refreshToken', refreshToken],
    ]);
    set({ accessToken, refreshToken });
  },

  clearTokens: async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    set({ accessToken: null, refreshToken: null });
  },

  loadTokensFromStorage: async () => {
    const [accessToken, refreshToken] = await AsyncStorage.multiGet([
      'accessToken',
      'refreshToken',
    ]);
    set({
      accessToken: accessToken[1],
      refreshToken: refreshToken[1],
      isLoading: false,
    });
  },
}));
