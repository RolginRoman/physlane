"use client";

import { Measures, Report } from "@physlane/domain";
import {
  Link,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
} from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import { z } from "zod";
import { LineChart } from "../components/linechart";
import { useRelativeQueryParams } from "../navigation";
import { useReport } from "./data";
import { LogMeasure } from "./log-measure";
import { Modes, useMeasure, useSearchParamsModel } from "./view-model";
import { WeightTable } from "./weight-table";
import { columns } from "./weight-table-columns";

const Filters = ({ data }: { data: z.infer<typeof Report> }) => {
  const relativeWith = useRelativeQueryParams();
  const { measure } = useSearchParamsModel();
  const isLbs = measure === "lb";
  const query: { m: Measures } = { m: isLbs ? "kg" : "lb" };

  return <div className="flex"></div>;
};

const TabsWithContent = ({
  data,
  mode,
}: {
  data: z.infer<typeof Report>;
  mode: Modes;
}) => {
  const relativeWith = useRelativeQueryParams();
  const measuredData = useMeasure(data);

  return (
    <Tabs value={mode}>
      <TabsList>
        <TabsTrigger asChild value="graph">
          <Link
            theme={{
              underline: "hover",
              color: "gray",
            }}
            prefetch
            href={{ query: relativeWith({ mode: "graph" }) }}
          >
            Graph
          </Link>
        </TabsTrigger>
        <TabsTrigger asChild value="table">
          <Link
            theme={{
              underline: "hover",
              color: "gray",
            }}
            prefetch
            href={{ query: relativeWith({ mode: "table" }) }}
          >
            Table
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <ErrorBoundary fallback={<div>something went wrong</div>}>
          <WeightTable
            columns={columns}
            data={measuredData.weightEntries}
          ></WeightTable>
        </ErrorBoundary>
      </TabsContent>
      <TabsContent value="graph">
        <LineChart
          className="lg:-ml-2 -ml-1"
          data={measuredData.weightEntries}
          xDataKey="createdAt"
          yDataKey="weight"
        ></LineChart>
      </TabsContent>
    </Tabs>
  );
};

export function AnalyticsContent({ mode }: { mode: Modes }) {
  const { data, isFetching: isLoading, isError } = useReport();

  return (
    <main className="max-w-screen-lg px-4 pb-12 lg:px-0 lg:pb-16 lg:pt-4 lg:min-w-[912px] lg:mx-auto">
      <div className="flex py-2">
        <LogMeasure></LogMeasure>
        {isError && <Text size="3">Error</Text>}
        {isLoading && <Spinner />}
        {data && <Filters data={data}></Filters>}
      </div>
      {data && <TabsWithContent data={data} mode={mode}></TabsWithContent>}
    </main>
  );
}
