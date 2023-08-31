import { LinkProps, default as NextLink } from 'next/link';
import { Link as ThemedLink } from '@radix-ui/themes';

export default function Link({
  children,
  href,
  ...props
}: LinkProps & {
  children?: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <ThemedLink asChild>
      <NextLink {...props} href={href}>
        {children}
      </NextLink>
    </ThemedLink>
  );
}
