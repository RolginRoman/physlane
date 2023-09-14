import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@physlane/db";
import { UserBaseCredentials } from "@physlane/domain";
import { Account, User as DbUser } from "@prisma/client";
import { compareSync } from "bcryptjs";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

const isSameUser = (
  user: (DbUser & { accounts: Account[] }) | null,
  credentials: z.infer<typeof UserBaseCredentials>
): boolean => {
  const credentialsAccount = user?.accounts?.[0];
  if (!user || !credentialsAccount) {
    return false;
  }
  return compareSync(credentials.password, credentialsAccount.password);
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token["id"] = user.id;
        }
        return token;
      }

      return {
        email: dbUser.email,
        id: dbUser.id,
        name: dbUser.name,
        picture: dbUser.image,
      };
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = session.user ?? {};
        // @ts-expect-error missed typeRoots merge
        session.user.id = token["id"];
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
  pages: {
    error: "/signin",
    newUser: "/welcome",
    signIn: "/signin",
    signOut: "/",
    verifyRequest: "/",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const userCredentials =
          UserBaseCredentials.passthrough().safeParse(credentials);
        if (!userCredentials.success) {
          console.log("Failed parsing schema");
          return null;
        }

        const { email } = userCredentials.data;

        const user = await db.user.findUnique({
          include: {
            accounts: {
              where: {
                provider: "internal",
                providerAccountId: email,
              },
            },
          },
          where: {
            email,
          },
        });

        const compare = isSameUser(user, userCredentials.data);

        if (user && compare) {
          return {
            email: user.email,
            id: user.id,
            name: user.name,
          };
        } else {
          return null;
        }
      },
      credentials: {
        password: { label: "Password", type: "password" },
        username: {
          label: "Username",
          type: "text",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
