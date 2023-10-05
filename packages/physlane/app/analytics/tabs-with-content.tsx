"use client";

import { Measures } from "@physlane/domain";
import { Tabs, TabsList, TabsTrigger, TabsContent, Link } from "@physlane/ui";
import { Report } from "@physlane/domain";
import { ErrorBoundary } from "react-error-boundary";
import { z } from "zod";
import { useRelativeQueryParams } from "../navigation";
import { useSearchParamsModel, Modes, useAdaptiveMeasureReport } from "./hooks";
import { WeightTable } from "./weight-table/weight-table";
import { LineChart } from "../components/linechart";

export const Filters = ({ data }: { data: z.infer<typeof Report> }) => {
  const relativeWith = useRelativeQueryParams();
  const { measure } = useSearchParamsModel();
  const isLbs = measure === "lb";
  const query: { m: Measures } = { m: isLbs ? "kg" : "lb" };

  return <div className="flex"></div>;
};

export const TabsWithContent = ({
  data,
  mode,
}: {
  data: z.infer<typeof Report>;
  mode: Modes;
}) => {
  const relativeWith = useRelativeQueryParams();
  const measuredData = useAdaptiveMeasureReport(data);

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
          <WeightTable data={measuredData.weightEntries}></WeightTable>
        </ErrorBoundary>
      </TabsContent>
      <TabsContent value="graph">
        <LineChart
          className="-ml-4 lg:-ml-2"
          data={measuredData.weightEntries}
          xDataKey="measureDate"
          yDataKey="weight"
        ></LineChart>
      </TabsContent>
    </Tabs>
  );
};
