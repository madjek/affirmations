import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '~/store/authStore';
import axiosInstance from '~/utils/axiosWithAuth';

export const useRegisterMutation = () => {
  const { setTokens } = useAuthStore();
  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      name: string;
    }) => {
      const res = await axiosInstance.post('/auth/register', data);
      return res.data;
    },
    onSuccess: async ({ accessToken, refreshToken }) => {
      await setTokens(accessToken, refreshToken);
    },
  });
};

export const useLoginMutation = () => {
  const { setTokens } = useAuthStore();
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axiosInstance.post('/auth/login', data);
      return res.data;
    },
    onSuccess: async ({ accessToken, refreshToken }) => {
      await setTokens(accessToken, refreshToken);
    },
  });
};

export const useLogoutMutation = () => {
  const { clearTokens } = useAuthStore();
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post('/auth/logout');
    },
    onSuccess: async () => {
      await clearTokens();
    },
  });
};
