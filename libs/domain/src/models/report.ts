import { z } from 'zod';
import { Weight } from './weight';

export const Report = z.object({
  createdAt: z.coerce.date(),
  weightEntries: z.array(Weight),
});

export const ReportRequest = z.object({
  filters: z.object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  }),
});
