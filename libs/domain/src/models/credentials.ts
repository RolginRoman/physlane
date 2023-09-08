import { z } from 'zod';

export const UserBaseCredentials = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.toLocaleLowerCase()),
  password: z.string().min(3),
});

export type UserBaseCredentialsType = z.infer<typeof UserBaseCredentials>;

export const NewUser = z
  .object({
    name: z.string().min(1).max(250),
  })
  .merge(UserBaseCredentials);

export type NewUserType = z.infer<typeof NewUser>;
