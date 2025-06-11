import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useAuthStore } from '~/store/authStore';

const queryClient = new QueryClient();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const loadTokens = useAuthStore((s) => s.loadTokensFromStorage);

  useEffect(() => {
    loadTokens();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
