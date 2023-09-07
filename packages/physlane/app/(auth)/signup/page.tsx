import { isNotAuthorized } from '@physlane/auth/core';
import { SignUp } from '@physlane/auth/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Create an account with Physlane',
  title: 'Create an account',
};

async function SignUnPage() {
  return <SignUp></SignUp>;
}

export default isNotAuthorized(SignUnPage, '/');
