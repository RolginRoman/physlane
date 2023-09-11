import { isNotAuthorized } from '@physlane/auth/core';
import { SignIn } from '@physlane/auth/ui';
import { Link } from '@physlane/ui';
import { Text } from '@radix-ui/themes';
import { Metadata } from 'next';
import { getCsrfToken, getProviders } from 'next-auth/react';

export const metadata: Metadata = {
  description: 'Sign in to your account',
  title: 'Sign in',
};

async function SignInPage() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return (
    <SignIn
      className="col-start-2 px-4"
      providers={providers}
      csrfToken={csrfToken}
    >
      <Text size={'2'} weight={'medium'} className="text-muted-foreground">
        Don&apos;t have an account?
      </Text>
      <Text size={'2'} weight={'medium'}>
        <Link href="/signup" className="block">
          Sign up
        </Link>
      </Text>
    </SignIn>
  );
}

export default isNotAuthorized(SignInPage, '/');
