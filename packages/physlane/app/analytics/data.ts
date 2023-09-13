import { Options, api } from '@physlane/api';
import { Report, Weight, CreateWeight } from '@physlane/domain';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const loadReport = (options?: Options) => {
  return api
    .get(`analytics/weight?from=${new Date().toISOString()}`, options)
    .json()
    .then((data) => Report.parse(data));
};

export const useReport = () => {
  return useQuery({
    queryFn: loadReport,
    queryKey: ['report'],
    keepPreviousData: true,
  });
};

export const deleteWeightEntry = async (
  id: z.infer<typeof Weight>['id'],
  options?: Options
) => {
  api.delete(`analytics/weight/${id}`, options).json();
};

export const useDeleteEntry = (entryId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteWeightEntry(entryId),
    retry: 0,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['report'] });
    },
    onSettled: async () => {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['report'] });
          resolve();
        }, 1000);
      });
    },
  });
};

export const createWeightEntry = async (
  values: z.infer<typeof CreateWeight>,
  options?: Options
) => {
  return api
    .post('analytics/weight', {
      ...options,
      json: values,
    })
    .json();
};

export const useCreateWeightEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: z.infer<typeof CreateWeight>) =>
      createWeightEntry(values, { signal: undefined }),
    retry: 0,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['report'] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['report'] });
    },
  });
};
