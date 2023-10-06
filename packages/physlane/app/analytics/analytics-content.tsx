"use client";

import { CreateWeight } from "@physlane/domain";
import { Button, Spinner } from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import addDays from "date-fns/addDays";
import { z } from "zod";
import { Modes } from "./hooks";
import { useCreateWeightEntry, useReport } from "./loader";
import { PostMeasure } from "./post-measure/post-measure";
import { TabsWithContent } from "./tabs-with-content";

export function AnalyticsContent({ mode }: { mode: Modes }) {
  const { data, isFetching, isError } = useReport();

  const lastMeasure = data?.weightEntries[data.weightEntries.length - 1];

  return (
    <main className="max-w-screen-lg px-4 pb-12 lg:mx-auto lg:min-w-[912px] lg:px-0 lg:pb-16 lg:pt-4">
      <ImplicitRandomCreateEntry />
      <div className="flex items-center pb-2">
        <PostMeasure lastMeasure={lastMeasure} />
        {isError && (
          <Text className="mx-4 inline-block" size="3">
            Error
          </Text>
        )}
        {isFetching && (
          <Spinner className="mx-4 inline-block h-[1em] w-[1em]" />
        )}
      </div>
      {data && <TabsWithContent data={data} mode={mode} />}
    </main>
  );
}

const ImplicitRandomCreateEntry = () => {
  const { mutateAsync: createEntryAsync } = useCreateWeightEntry();

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
    <Button variant={"link"} onClick={() => addStableNewEntry()}>
      Create entry
    </Button>
  );
};
