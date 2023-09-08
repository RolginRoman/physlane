import { LinkProps, default as NextLink } from 'next/link';
import { Link as ThemedLink } from '@radix-ui/themes';

export function Link({
  children,
  href,
  ...props
}: React.PropsWithChildren<
  LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>) {
  return (
    <ThemedLink asChild>
      <NextLink {...props} href={href}>
        {children}
      </NextLink>
    </ThemedLink>
  );
}

export default Link;
