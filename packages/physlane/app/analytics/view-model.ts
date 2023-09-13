import { z } from 'zod';

export const modes = ['graph', 'table'] as const;
export type Modes = (typeof modes)[number];
export const Params = z.object({
  mode: z.enum(modes).optional().default('graph'),
});
