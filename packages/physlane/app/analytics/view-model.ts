import { z } from 'zod';

export const modes = ['graph', 'table'] as const;
export const Params = z.object({
  mode: z.enum(modes),
});
