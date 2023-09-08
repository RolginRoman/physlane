import { isNotAuthorized } from '@physlane/auth/core';
import { SignUp } from '@physlane/auth/ui';
import { Link } from '@physlane/ui';
import { Text } from '@radix-ui/themes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Create an account with Physlane',
  title: 'Create an account',
};

async function SignUnPage() {
  return (
    <SignUp className="col-start-2 px-4">
      <Text size={'2'} weight={'medium'} className="text-muted-foreground">
        Already have an account?
      </Text>
      <Text size={'2'} weight={'medium'}>
        <Link href="/signin" className="block">
          Sign in
        </Link>
      </Text>
    </SignUp>
  );
}

export default isNotAuthorized(SignUnPage, '/');
