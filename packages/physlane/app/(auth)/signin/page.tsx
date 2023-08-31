import { SignIn } from '@physlane/auth/ui';
import { Metadata } from 'next';
import { getCsrfToken, getProviders } from 'next-auth/react';
// import { CtxOrReq } from 'next-auth/client';

export const metadata: Metadata = {
  description: 'Sign in to your account',
  title: 'Sign in',
};

export default async function SignInPage({ context }: { context: any }) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context as any);

  return <SignIn providers={providers} csrfToken={csrfToken}></SignIn>;
}
