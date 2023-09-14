import NextAuth from "next-auth";
import { authOptions } from "@physlane/auth/core";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
