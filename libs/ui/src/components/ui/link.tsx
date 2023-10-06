import { Link as ThemedLink } from "@radix-ui/themes";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  NextLinkProps & { theme?: React.ComponentProps<typeof ThemedLink> };

export const Link = React.forwardRef<
  React.ElementRef<typeof ThemedLink>,
  React.PropsWithChildren<LinkProps>
>(({ theme = {}, ...props }: React.PropsWithChildren<LinkProps>, ref) => {
  return (
    <ThemedLink ref={ref} asChild {...theme}>
      <NextLink {...props} />
    </ThemedLink>
  );
});
export default Link;
