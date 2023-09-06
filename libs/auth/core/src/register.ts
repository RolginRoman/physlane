import { db } from '@physlane/db';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { resolveInternalProviderName } from './credentials-provider.helper';

const Payload = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.toLocaleLowerCase()),
  name: z.string(),
  password: z.string().min(3),
});

export async function register(payload: z.infer<typeof Payload>) {
  const parsed = Payload.safeParse(payload);
  if (!parsed.success) {
    throw new Error(`Invalid payload format: ${JSON.stringify(payload)}`);
  }

  const { email, name, password } = parsed.data;

  const hashed_password = await hash(password, 12);

  const user = await db.user.create({
    data: {
      accounts: {
        create: [
          {
            password: hashed_password,
            provider: resolveInternalProviderName(email),
            providerAccountId: 'internal',
            type: 'credentials',
          },
        ],
      },
      email,
      name,
    },
  });

  return {
    email: user.email,
    name: user.name,
  };
}
