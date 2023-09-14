"use client";

import { Spinner } from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import { Filters, TabsWithContent } from "./analytics-content-body";
import { Modes } from "./hooks";
import { useReport } from "./loader";
import { PostMeasure } from "./post-measure/post-measure";

export function AnalyticsContent({ mode }: { mode: Modes }) {
  const { data, isFetching: isLoading, isError } = useReport();

  return (
    <main className="max-w-screen-lg px-4 pb-12 lg:px-0 lg:pb-16 lg:pt-4 lg:min-w-[912px] lg:mx-auto">
      <div className="flex py-2">
        <PostMeasure></PostMeasure>
        {isError && <Text size="3">Error</Text>}
        {isLoading && <Spinner />}
        {data && <Filters data={data}></Filters>}
      </div>
      {data && <TabsWithContent data={data} mode={mode}></TabsWithContent>}
    </main>
  );
}
