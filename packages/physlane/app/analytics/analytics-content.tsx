'use client';

import {
  Link,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@physlane/ui';
import { ErrorBoundary } from 'react-error-boundary';
import LineChart from '../components/linechart';
import { useReport } from './data';
import { Report } from '@physlane/domain';
import { LogMeasure } from './log-measure';
import { Modes } from './view-model';
import { WeightTable } from './weight-table';
import { columns } from './weight-table-columns';
import { useRelativeQueryParams } from '../navigation';
import { Text } from '@radix-ui/themes';
import { z } from 'zod';

export function AnalyticsContent({ mode }: { mode: Modes }) {
  const { data, isFetching: isLoading, isError } = useReport();

  return (
    <main className='max-w-screen-lg p-4 lg:p-2 lg:min-w-[912px] lg:mx-auto'>
      <div className='flex py-2'>
        <LogMeasure></LogMeasure>
        {isError && <Text size='3'>Error</Text>}
        {isLoading && <Spinner />}
        {data && <Filters data={data}></Filters>}
      </div>
      {data && <TabsWithContent data={data} mode={mode}></TabsWithContent>}
    </main>
  );
}

const Filters = ({ data }: { data: z.infer<typeof Report> }) => {
  return <div></div>;
};

const TabsWithContent = ({
  data,
  mode,
}: {
  data: z.infer<typeof Report>;
  mode: Modes;
}) => {
  const relativeWith = useRelativeQueryParams();

  return (
    <Tabs value={mode}>
      <TabsList>
        <TabsTrigger asChild value='graph'>
          <Link
            theme={{
              underline: 'hover',
              color: 'gray',
            }}
            href={{ query: relativeWith({ mode: 'graph' }) }}
          >
            Graph
          </Link>
        </TabsTrigger>
        <TabsTrigger asChild value='table'>
          <Link
            theme={{
              underline: 'hover',
              color: 'gray',
            }}
            href={{ query: relativeWith({ mode: 'table' }) }}
          >
            Table
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='table'>
        <ErrorBoundary fallback={<div>something went wrong</div>}>
          <WeightTable
            columns={columns}
            data={data.weightEntries}
          ></WeightTable>
        </ErrorBoundary>
      </TabsContent>
      <TabsContent value='graph'>
        <LineChart
          className='lg:-ml-2 -ml-1'
          data={data.weightEntries}
          xDataKey='createdAt'
          yDataKey='weight'
        ></LineChart>
      </TabsContent>
    </Tabs>
  );
};
