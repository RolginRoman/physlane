import { isAuthorized } from "@physlane/auth/core";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { z } from "zod";
import { AnalyticsContent } from "./analytics-content";
import { loadReport } from "./loader";
import { Params } from "./hooks";
import { queryKeys } from "../query-keys";
import getQueryClient from "../query-client";

export const metadata = {
  description: "Physlane. Analytics Page",
  title: "Analytics - Physlane",
};

async function Analytics({
  searchParams,
}: {
  searchParams: z.infer<typeof Params>;
}) {
  searchParams = Params.passthrough().parse(searchParams);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryFn: () => loadReport({ headers: headers() }),
    queryKey: queryKeys.report,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <AnalyticsContent mode={searchParams.mode}></AnalyticsContent>
    </Hydrate>
  );
}

export default isAuthorized(Analytics, "/signin");
