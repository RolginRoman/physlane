"use client";

import { Button, Spinner } from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import { Modes } from "./hooks";
import { useCreateWeightEntry, useReport } from "./loader";
import { PostMeasure } from "./post-measure/post-measure";
import { TabsWithContent } from "./tabs-with-content";
import { CreateWeight } from "@physlane/domain";
import { z } from "zod";
import addDays from "date-fns/addDays";

export function AnalyticsContent({ mode }: { mode: Modes }) {
  const { data, isFetching, isError } = useReport();
  const { mutateAsync: createEntryAsync } = useCreateWeightEntry();

  const lastMeasure = data?.weightEntries[data.weightEntries.length - 1];

  const addStableNewEntry = async () => {
    const values: z.infer<typeof CreateWeight> = {
      weight: 100 + Math.floor(Math.random() * 100),
      measure: "kg",
      measureDate: addDays(
        new Date("2023-04-01T00:00:00Z"),
        90 + Math.random() * 90
      ),
      createdAt: new Date(),
    };
    await createEntryAsync(values);
  };

  return (
    <main className="max-w-screen-lg px-4 pb-12 lg:mx-auto lg:min-w-[912px] lg:px-0 lg:pb-16 lg:pt-4">
      <Button onClick={() => addStableNewEntry()}>Create entry</Button>
      <div className="flex pb-2">
        <PostMeasure lastMeasure={lastMeasure}></PostMeasure>
        {isError && <Text size="3">Error</Text>}
        {isFetching && <Spinner className="h-[1em] w-[1em]" />}
      </div>
      {data && <TabsWithContent data={data} mode={mode} />}
    </main>
  );
}
