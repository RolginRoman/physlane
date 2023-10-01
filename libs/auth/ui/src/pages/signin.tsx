"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserBaseCredentials } from "@physlane/domain";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@physlane/ui";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { z } from "zod";
import { Layout } from "./base";

export function SignIn({
  children,
  className,
  csrfToken,
  providers,
}: React.HTMLAttributes<HTMLDivElement> & {
  csrfToken: string | undefined;
  providers: Record<string, { name: string; id: string; type: string }> | null;
}) {
  return (
    <Layout className={className} footer={children}>
      {providers &&
        Object.values(providers).map((provider) =>
          match(provider)
            .with({ type: "credentials" }, (provider) => (
              <CredentialsForm
                key={provider.type}
                csrfToken={csrfToken}
              ></CredentialsForm>
            ))
            .otherwise((provider) => (
              <OAuthProvider provider={provider}></OAuthProvider>
            ))
        )}
    </Layout>
  );
}

const OAuthProvider = ({
  provider,
}: {
  provider: { name: string; id: string; type: string };
}) => (
  <div key={provider.type}>
    <Button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
      Sign in with {provider.name}
    </Button>
  </div>
);

const CredentialsForm = ({ csrfToken }: { csrfToken: string | undefined }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof UserBaseCredentials>>({
    defaultValues: {
      email: "",
      password: "",
    },
    // @ts-expect-error https://github.com/colinhacks/zod/issues/2663
    resolver: zodResolver(UserBaseCredentials, {
      errorMap: (error, ctx) => {
        return { message: ctx.defaultError };
      },
    }),
  });

  async function onFormSubmit({
    email,
    password,
  }: z.infer<typeof UserBaseCredentials>) {
    try {
      const redirectUrl = searchParams.get("redirectUrl") ?? undefined;
      const res = await signIn("credentials", {
        callbackUrl: redirectUrl,
        email,
        password,
        redirect: true, // TODO is it possible to refresh server side session after login? https://github.com/nextauthjs/next-auth/issues/8254
      });
      if (res && res.url && !res.error) {
        router.push(res.url);
      } else {
        form.setError("root", {
          message: "invalid email or password",
          type: "validate",
        });
        throw new Error("invalid email or password");
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="w-full space-y-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="fancy@mail.com" {...field}></Input>
              </FormControl>
              {fieldState.error ? (
                <FormMessage className="text-xs"></FormMessage>
              ) : (
                <FormDescription className="text-xs">
                  Email you've used at sign up
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  autoComplete="current-password"
                  type="password"
                  {...field}
                ></Input>
              </FormControl>
              {fieldState.error ? (
                <FormMessage className="text-xs"></FormMessage>
              ) : (
                <FormDescription className="text-xs">
                  Use strong password and don't write it down on a sticky{" "}
                  <span role="img" aria-label="eyes on you">
                    note&nbsp;👀
                  </span>
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
};
