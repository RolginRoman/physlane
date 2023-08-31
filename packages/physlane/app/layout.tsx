import '@radix-ui/themes/styles.css';
import './global.css';

import { fontSans } from '@physlane/fonts';
import { Header, cn } from '@physlane/ui';
import { Theme } from '@radix-ui/themes';

export const metadata = {
  description: 'One of the kind',
  title: 'Welcome to physlane',
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
        <Theme>
          <Header></Header>
          {children}
        </Theme>
      </body>
    </html>
  );
}
