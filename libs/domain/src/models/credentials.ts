import { z } from 'zod';

export const UserBaseCredentials = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.toLocaleLowerCase()),
  password: z.string().min(3),
});

export const NewUser = z
  .object({
    name: z.string().min(1).max(250),
  })
  .merge(UserBaseCredentials);
