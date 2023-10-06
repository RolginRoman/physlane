import type { User } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
    };
  }
  interface DefaultSession {
    user: User & {
      id: UserId;
    };
  }
}
