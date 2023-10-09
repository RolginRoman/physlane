import "@radix-ui/themes/styles.css";
import "./global.css";

import { fontSans } from "@physlane/fonts";
import { Toaster, cn } from "@physlane/ui";
import { Theme } from "@radix-ui/themes";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { Footer } from "./components/footer";
import Header from "./components/header";
import Providers from "./providers";
import getQueryClient from "./query-client";
import { queryKeys } from "./query-keys";
import { loadUserSettings } from "./user/loader";

export const metadata = {
  description: "One of the kind",
  title: "Welcome to physlane",
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren<void>) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryFn: () => loadUserSettings({ headers: headers() }),
    queryKey: queryKeys.userSettings,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Theme className="flex min-h-screen flex-col overflow-hidden">
          <Providers>
            <Hydrate state={dehydratedState}>
              <Header />
              {children}
              <Footer />
            </Hydrate>
          </Providers>
          <Toaster />
        </Theme>
      </body>
    </html>
  );
}
