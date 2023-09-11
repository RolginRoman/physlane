import '@radix-ui/themes/styles.css';
import './global.css';

import { fontSans } from '@physlane/fonts';
import { Toaster, cn } from '@physlane/ui';
import { Theme } from '@radix-ui/themes';
import Header from './components/header';

export const metadata = {
  description: 'One of the kind',
  title: 'Welcome to physlane',
};

export default function RootLayout({
  children,
}: React.PropsWithChildren<void>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Theme className="flex flex-col min-h-screen">
          <Header></Header>

          {children}
        </Theme>
        <Toaster />
      </body>
    </html>
  );
}
