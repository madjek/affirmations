import axios from 'axios';
import { useAuthStore } from '~/store/authStore';

export const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(async (config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${process.env.API_URL}/auth/refresh`,
          {
            refreshToken,
          },
        );

        const { accessToken: newAccess, refreshToken: newRefresh } =
          response.data;
        await setTokens(newAccess, newRefresh);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axios(originalRequest);
      } catch {
        await clearTokens();
      }
    }

    return Promise.reject(error);
  },
);
