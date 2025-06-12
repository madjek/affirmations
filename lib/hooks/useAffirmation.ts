import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Affirmation,
  AffirmationIdList,
  CreateAffirmation,
} from '../interfaces/affirmation.interface';
import axiosInstance from '../utils/axiosWithAuth';

export const useCreateAffirmationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAffirmation) =>
      axiosInstance
        .post<Affirmation>('/affirmations', data)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my'],
      });
    },
  });
};

export const usePublicAffirmationsQuery = (language: string) => {
  return useQuery<Affirmation[]>({
    queryKey: ['public', language],
    queryFn: () =>
      axiosInstance
        .get<Affirmation[]>(`/affirmations/public/${language}`)
        .then((res) => res.data),
  });
};

export const useMyAffirmationsQuery = () => {
  return useQuery<Affirmation[]>({
    queryKey: ['my'],
    queryFn: () =>
      axiosInstance
        .get<Affirmation[]>('/affirmations/my')
        .then((res) => res.data),
    staleTime: Infinity,
  });
};

export const useSharedByMeAffirmationsQuery = () => {
  return useQuery<AffirmationIdList[]>({
    queryKey: ['sharedByMe'],
    queryFn: () =>
      axiosInstance
        .get<AffirmationIdList[]>('/affirmations/shared-by-me')
        .then((res) => res.data),
  });
};

export const useShareAffirmationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axiosInstance
        .post<string>(`/affirmations/share/${id}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sharedByMe'],
      });
    },
  });
};

export const useSaveAffirmationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axiosInstance
        .post<string>(`/affirmations/save/${id}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my'],
      });
    },
  });
};

export const useUnsaveAffirmationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axiosInstance
        .post<string>(`/affirmations/unsave/${id}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my'],
      });
    },
  });
};
