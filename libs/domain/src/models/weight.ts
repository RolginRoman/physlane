import { z } from 'zod';

export const ALL_MEASURES = ['kg', 'lb'] as const;
export type Measures = (typeof ALL_MEASURES)[number];
export const Measure = z.enum(ALL_MEASURES);

export const Weight = z.object({
  createdAt: z.coerce.date(),
  id: z.string(),
  measure: Measure,
  measureDate: z.coerce.date(),
  weight: z.coerce.number().min(1),
});

export const CreateWeight = Weight.merge(
  Weight.pick({id: true, createdAt: true}).deepPartial()
);
