import {
  Measure,
  Measures,
  Report,
  Weight,
  convertWeightEntryKgToLb,
  convertWeightEntryLbToKg,
} from "@physlane/domain";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { z } from "zod";
import { match } from "ts-pattern";
import { useUserSettings, useWellKnownSettings } from "../user/loader";

export const modes = ["graph", "table"] as const;
export type Modes = (typeof modes)[number];
export const Params = z.object({
  mode: z.enum(modes).optional().default("graph"),
});

export const useSearchParamsModel = () => {
  const searchParams = useSearchParams();
  return useMemo(() => {
    // TODO resolve possible params here. One place to parse query params
    const optionalMeasure = searchParams.get("m");
    const measure = Measure.optional()
      .nullable()
      .default("kg")
      .safeParse(optionalMeasure);

    const activatedMeasure: Measures =
      measure.success && measure.data ? measure.data : "kg";
    return { measure: activatedMeasure };
  }, [searchParams]);
};

export const useAdaptiveMeasureReport = (data: z.infer<typeof Report>) => {
  const { measure } = useWellKnownSettings();

  return useMemo(() => {
    return {
      ...data,
      weightEntries: data.weightEntries.map((entry) =>
        convertWeight(entry, measure)
      ),
    };
  }, [data, measure]);
};

export const convertWeight = (
  entry: z.infer<typeof Weight>,
  currentMeasure: Measures
) => {
  return match(currentMeasure)
    .with("kg", (value) => {
      return entry.measure !== value ? convertWeightEntryLbToKg(entry) : entry;
    })
    .with("lb", (value) => {
      return entry.measure !== value ? convertWeightEntryKgToLb(entry) : entry;
    })
    .exhaustive();
};
