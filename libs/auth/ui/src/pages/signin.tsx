'use client';
import { Button, Input, Link } from '@physlane/ui';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { match } from 'ts-pattern';

export function SignIn({
  csrfToken,
  providers,
}: {
  csrfToken: string | undefined;
  providers: Record<string, { name: string; id: string; type: string }> | null;
}) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) =>
          match(provider)
            .with({ type: 'credentials' }, (provider) => (
              <CredentialsForm
                key={provider.type}
                csrfToken={csrfToken}
              ></CredentialsForm>
            ))
            .otherwise((provider) => (
              <div key={provider.type}>
                <Button
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                >
                  Sign in with {provider.name}
                </Button>
              </div>
            ))
        )}

      <Link href="/signup" className="block">
        Sign up
      </Link>
    </>
  );
}

const CredentialsForm = ({ csrfToken }: { csrfToken: string | undefined }) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        callbackUrl: '/',
        email: formValues.email,
        password: formValues.password,
        redirect: true, // TODO is it possible to refresh server side session after login? https://github.com/nextauthjs/next-auth/issues/8254
      });
      if (res && res.url && !res.error) {
        router.push(res.url);
      } else {
        throw new Error('invalid email or password');
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Input placeholder="email" name="email" onChange={handleChange}></Input>
      <Input
        name="password"
        placeholder="password"
        onChange={handleChange}
      ></Input>
      <Button type="submit">Login</Button>
    </form>
  );
};
