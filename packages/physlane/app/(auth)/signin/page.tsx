import { SignIn } from '@physlane/auth/ui';
import { Metadata } from 'next';
import { getCsrfToken, getProviders } from 'next-auth/react';

export const metadata: Metadata = {
  description: 'Sign in to your account',
  title: 'Sign in',
};

export default async function SignInPage() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return <SignIn providers={providers} csrfToken={csrfToken}></SignIn>;
}
