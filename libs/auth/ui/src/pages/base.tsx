import { Separator, cn } from '@physlane/ui';
import * as React from 'react';
import { AuthErrorToast } from '../errors/toast';

export const Layout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    footer: React.ReactNode;
  }
>(({ children, className, footer, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {children}

      <Separator
        className={cn(
          "relative my-4 after:content-['OR'] after:text-sm after:p-1 after:text-muted-foreground after:bg-white after:absolute after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
        )}
      />
      <div className="flex items-center space-x-1.5">{footer}</div>
      <AuthErrorToast></AuthErrorToast>
    </div>
  );
});
