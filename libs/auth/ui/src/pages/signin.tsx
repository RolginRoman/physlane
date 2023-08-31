'use client';
import { signIn } from 'next-auth/react';
import { Input, Button } from '@physlane/ui';

export function SignIn({
  csrfToken,
  providers,
}: {
  csrfToken: string | undefined;
  providers: Record<string, { name: string; id: string }> | null;
}) {
  return (
    <div className="w-full">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Input placeholder="Email (Not Setup - Please Use Github)" />
      <Button>Submit</Button>
      <hr />
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
    </div>
  );
}
