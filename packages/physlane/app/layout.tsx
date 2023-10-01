import "@radix-ui/themes/styles.css";
import "./global.css";

import { fontSans } from "@physlane/fonts";
import { Toaster, cn } from "@physlane/ui";
import { Theme } from "@radix-ui/themes";
import Header from "./components/header";
import Providers from "./providers";
import getQueryClient from "./query-client";
import { loadUserSettings } from "./user/loader";
import { queryKeys } from "./query-keys";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";

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
        <Providers>
          <Hydrate state={dehydratedState}>
            <Theme className="flex min-h-screen flex-col">
              <Header></Header>
              {children}
            </Theme>
          </Hydrate>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
