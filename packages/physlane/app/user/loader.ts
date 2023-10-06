import { Options, api } from "@physlane/api";
import { Measure, UserSettings } from "@physlane/domain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { z } from "zod";
import { queryKeys } from "../query-keys";

export const loadUserSettings = async (options?: Options) => {
  return api
    .get(`user/settings`, options)
    .json()
    .then((data) => UserSettings.parse(data));
};

export const updateUserSettings = (values: z.infer<typeof UserSettings>) => {
  return api
    .patch("user/settings", {
      json: values,
    })
    .json();
};

export const useUserSettings = () => {
  return useQuery({
    queryKey: queryKeys.userSettings,
    queryFn: loadUserSettings,
    keepPreviousData: true,
    staleTime: Infinity,
  });
};

const WellKnownSettings = z.object({
  measure: Measure.default("kg"),
});

export const useWellKnownSettings = () => {
  const settings = useUserSettings();
  return useMemo(() => {
    const result = WellKnownSettings.safeParse(settings.data);
    if (result.success) {
      return result.data;
    } else {
      return {} as z.infer<typeof WellKnownSettings>; // TODO default settings?
    }
  }, [settings.data]);
};

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: z.infer<typeof UserSettings>) =>
      updateUserSettings(values),
    onMutate: (values) => {
      queryClient.setQueryData<z.infer<typeof UserSettings>>(
        queryKeys.userSettings,
        (old) => ({ ...old, ...values })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.userSettings);
    },
  });
};
