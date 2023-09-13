'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Spinner,
} from '@physlane/ui';
import { ErrorBoundary } from 'react-error-boundary';
import LineChart from '../components/linechart';
import { useReport } from './data';
import { LogMeasure } from './log-measure';
import { modes } from './view-model';
import { WeightTable } from './weight-table';
import { columns } from './weight-table-columns';

export function AnalyticsContent({ mode }: { mode: (typeof modes)[number] }) {
  const { data, isFetching: isLoading } = useReport();

  return (
    <main className=" max-w-screen-lg p-4 lg:p-0">
      <LogMeasure></LogMeasure>
      {isLoading && <Spinner />}
      {data && (
        <Tabs defaultValue={mode}>
          <TabsList>
            <TabsTrigger value="graph">Graph</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <ErrorBoundary fallback={<div>something went wrong</div>}>
              <WeightTable
                columns={columns}
                data={data.weightEntries}
              ></WeightTable>
            </ErrorBoundary>
          </TabsContent>
          <TabsContent value="graph">
            <LineChart
              className="lg:-ml-2"
              data={data.weightEntries}
              xDataKey="createdAt"
              yDataKey="weight"
            ></LineChart>
          </TabsContent>
        </Tabs>
      )}
    </main>
  );
}
