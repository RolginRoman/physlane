import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const fakeUser: User = {
  email: '',
  id: '1',
  name: 'fakeU',
};

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      // const dbUser = await db.user.findFirst({
      //   where: {
      //     email: token.email,
      //   },
      // });

      // if (!dbUser) {
      if (user) {
        token['id'] = user?.id;
        return token;
      }
      // }

      return Promise.resolve(fakeUser as any);
      // return {
      //   email: dbUser.email,
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   picture: dbUser.image,
      // };
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user ?? {};
        // @ts-expect-error unexpected id attr
        session.user.id = token['id'];
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
  pages: {
    signIn: 'signin',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        return fakeUser;

        const authResponse = await fetch('/users/login', {
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return user;
      },
      credentials: {},
    }),
  ],
  secret: '1',
  session: {
    strategy: 'jwt',
  },
};
