import { Input, Button, Link } from '@physlane/ui';

export function SignUp() {
  return (
    <>
      <form
        className="w-full max-w-prose"
        action="/api/auth/register"
        method="POST"
      >
        <Input name="name" placeholder="Name"></Input>
        <Input name="email" placeholder="email"></Input>
        <Input name="password" placeholder="password" type="password"></Input>
        <Button>Create an account</Button>
      </form>
      <Link href="/signin" className="block">
        Sign in
      </Link>
    </>
  );
}
