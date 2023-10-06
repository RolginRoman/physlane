import { Separator, cn } from "@physlane/ui";
import * as React from "react";
import { AuthErrorToast } from "../errors/toast";

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
          "after:text-muted-foreground relative my-4 after:absolute after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white after:p-1 after:text-sm after:content-['OR']"
        )}
      />
      <div className="flex items-center space-x-1.5">{footer}</div>
      <AuthErrorToast />
    </div>
  );
});
