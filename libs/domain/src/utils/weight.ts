import { z } from "zod";
import { Weight } from "../models/weight";

const kgToLbsRatio = 2.20462262185;
const lbsToKgRatio = 1 / kgToLbsRatio;

export const convertKgToLb = (weight: number): number => {
  return weight * kgToLbsRatio;
};

export const convertLbToKg = (weight: number): number => {
  return weight * lbsToKgRatio;
};

export const convertWeightEntryKgToLb = (
  entry: z.infer<typeof Weight>
): z.infer<typeof Weight> => {
  return {
    ...entry,
    measure: "lb",
    weight: convertKgToLb(entry.weight),
  };
};

export const convertWeightEntryLbToKg = (
  entry: z.infer<typeof Weight>
): z.infer<typeof Weight> => {
  return {
    ...entry,
    measure: "kg",
    weight: convertLbToKg(entry.weight),
  };
};
