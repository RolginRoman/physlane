"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewUser } from "@physlane/domain";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Layout } from "./base";

export function SignUp({
  children,
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <Layout className={className} footer={children}>
      <SignUpForm></SignUpForm>
    </Layout>
  );
}

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof NewUser>>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    // @ts-expect-error https://github.com/colinhacks/zod/issues/2663
    resolver: zodResolver(NewUser, {
      errorMap: (error, ctx) => {
        return { message: ctx.defaultError };
      },
    }),
  });

  async function onFormSubmit({
    email,
    name,
    password,
  }: z.infer<typeof NewUser>) {
    try {
      const res = await fetch("/api/auth/register", {
        body: JSON.stringify({
          email,
          name,
          password,
          redirectUrl: "/signin",
        }),
        method: "POST",
      });

      if (res.ok) {
        router.push((await res.json()).redirectUrl);
      } else {
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
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Jack Sparrow" {...field}></Input>
              </FormControl>
              {fieldState.error ? (
                <FormMessage className="text-xs"></FormMessage>
              ) : (
                <FormDescription className="text-xs">
                  Just your name
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="fancy@mail.com" {...field}></Input>
              </FormControl>
              {fieldState.error ? (
                <FormMessage className="text-xs"></FormMessage>
              ) : (
                <FormDescription className="text-xs">
                  This is your email for registration. No spam or anything.
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
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  );
};
