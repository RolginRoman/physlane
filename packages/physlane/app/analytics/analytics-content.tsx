"use client";

import { Spinner } from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import { Modes } from "./hooks";
import { useReport } from "./loader";
import { PostMeasure } from "./post-measure/post-measure";
import { TabsWithContent } from "./tabs-with-content";

export function AnalyticsContent({ mode }: { mode: Modes }) {
  const { data, isFetching, isError } = useReport();

  const lastMeasure = data?.weightEntries[data.weightEntries.length - 1];

  return (
    <main className="max-w-screen-lg px-4 pb-12 lg:mx-auto lg:min-w-[912px] lg:px-0 lg:pb-16 lg:pt-4">
      <div className="flex py-2">
        <PostMeasure lastMeasure={lastMeasure}></PostMeasure>
        {isError && <Text size="3">Error</Text>}
        {isFetching && <Spinner className="h-[1em] w-[1em]" />}
      </div>
      {data && <TabsWithContent data={data} mode={mode} />}
    </main>
  );
}
