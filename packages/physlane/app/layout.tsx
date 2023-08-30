import './global.css';

import { cn } from '@physlane/ui';
import { fontSans } from '@physlane/fonts';

export const metadata = {
  title: 'Welcome to physlane',
  description: 'One of the kind',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
