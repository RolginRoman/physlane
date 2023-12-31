import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import * as React from "react";
import { match } from "ts-pattern";
import { getUser } from "./user";

type FallbackHandler = string;
type Predicate = "authorized" | "unauthorized";
type ComponentType<T = any> = React.ComponentType<T>;
// type ComponentType<T = any> = JSX.Element;

const Auth = <C extends ComponentType>(
  Component: C,
  handler: FallbackHandler = "/",
  predicate: Predicate
) => {
  // const initialPathName = usePathname();

  return async (props: React.ComponentPropsWithRef<C>) => {
    const user = await getUser();
    const guard = match(predicate)
      .with("authorized", () => () => !!user)
      .with("unauthorized", () => () => !user)
      .exhaustive();

    if (guard()) {
      return <Component {...props} />;
    } else {
      // TODO resolve callback URL to continue flow after registration
      const redirectTo = "/";
      redirect(
        `${handler}?redirectUrl=${encodeURIComponent(redirectTo)}`,
        RedirectType.replace
      );
    }
  };
};

export const isAuthorized = <C extends ComponentType>(
  component: C,
  handler?: FallbackHandler
) => Auth(component, handler, "authorized");

export const isNotAuthorized = <C extends ComponentType>(
  component: C,
  handler?: FallbackHandler
) => Auth(component, handler, "unauthorized");
