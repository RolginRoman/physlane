import { LinkProps as NextLinkProps, default as NextLink } from 'next/link';
import { Link as ThemedLink } from '@radix-ui/themes';

export function Link({
  children,
  href,
  theme = {},
  ...props
}: React.PropsWithChildren<
  NextLinkProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      theme?: React.ComponentProps<typeof ThemedLink>;
    }
>) {
  return (
    <ThemedLink asChild {...theme}>
      <NextLink {...props} href={href}>
        {children}
      </NextLink>
    </ThemedLink>
  );
}

export default Link;
