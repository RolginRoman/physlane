import { db } from "@physlane/db";
import { hash } from "bcryptjs";
import { z } from "zod";
import { NewUser } from "@physlane/domain";

export async function register(payload: z.infer<typeof NewUser>) {
  const parsed = NewUser.safeParse(payload);
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
            provider: "internal",
            providerAccountId: email,
            type: "credentials",
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
