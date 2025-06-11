import { api } from './api';

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post('/login', data);
  return res.data;
};

export const register = async (data: {
  email: string;
  password: string;
  name?: string;
}) => {
  const res = await api.post('/register', data);
  return res.data;
};

export const logout = async (accessToken: string) => {
  const res = await api.post(
    '/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};

export const refreshToken = async (refreshToken: string) => {
  const res = await api.post('/refresh', { refreshToken });
  return res.data;
};
