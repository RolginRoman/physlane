import { Options, api } from "@physlane/api";
import { CreateWeight, Report, Weight } from "@physlane/domain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { queryKeys } from "../query-keys";

export const loadReport = async (options?: Options) => {
  return api
    .get(`analytics/weight`, options)
    .json()
    .then((data) => Report.parse(data));
};

export const useReport = () => {
  return useQuery({
    queryFn: loadReport,
    queryKey: queryKeys.report,
    keepPreviousData: true,
    staleTime: 60000,
  });
};

export const deleteWeightEntry = async (
  id: z.infer<typeof Weight>["id"],
  options?: Options
) => {
  return api.delete(`analytics/weight/${id}`, options).json();
};

export const useDeleteEntry = (entryId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteWeightEntry(entryId),
    retry: 0,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.report });
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.report });
    },
  });
};

export const createWeightEntry = async (
  values: z.infer<typeof CreateWeight>,
  options?: Options
) => {
  return api
    .post("analytics/weight", {
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
      await queryClient.cancelQueries({ queryKey: queryKeys.report });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.report });
    },
  });
};
