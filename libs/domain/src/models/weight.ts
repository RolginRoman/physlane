import { z } from 'zod';

export const Measure = ['KG', 'LBS'] as const;

export const Weight = z.object({
  createdAt: z.coerce.date(),
  id: z.string(),
  measure: z.enum(Measure),
  weight: z.coerce.number().min(0),
});

export const CreateWeight = Weight.merge(
  z.object({ id: z.string().optional() })
);
