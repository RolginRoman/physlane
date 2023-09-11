import { isAuthorized } from '@physlane/auth/core';
import { Report } from '@physlane/domain';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@physlane/ui';
import ky from 'ky-universal';
import { headers } from 'next/headers';
import { ErrorBoundary } from 'react-error-boundary';
import { LineChart } from '../components/linechart';
import { LogMeasure } from './log-measure';
import { WeightTable } from './weight-table';
import { columns } from './weight-table-columns';
import _groupBy from 'lodash/groupBy';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';
import { api } from '@physlane/api';

const modes = ['graph', 'table'] as const;
const Params = z.object({
  mode: z.enum(modes),
});
async function Analytics({ params }: { params: z.infer<typeof Params> }) {
  params.mode = 'graph';
  // const parse = Params.safeParse(params);
  // if (!parse.success) {

  //   // redirect('graph', RedirectType.replace);
  // }
  // TODO show grouped by date ( average? ) only for graph
  const result = await api
    .get(`analytics/weight?from=${new Date().toISOString()}`, {
      headers: headers(),
    })
    .json()
    .then(Report.parse)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return (
    <main className=" max-w-screen-lg pt-8 p-4 lg:p-0">
      <LogMeasure></LogMeasure>
      {result && (
        <Tabs defaultValue={params.mode}>
          <TabsList>
            <TabsTrigger value="graph">Graph</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <ErrorBoundary fallback={<div>something went wrong</div>}>
              <WeightTable
                columns={columns}
                data={result.weightEntries}
              ></WeightTable>
            </ErrorBoundary>
          </TabsContent>
          <TabsContent value="graph">
            <LineChart
              data={result.weightEntries}
              xDataKey="createdAt"
              yDataKey="weight"
            ></LineChart>
          </TabsContent>
        </Tabs>
      )}
    </main>
  );
}

export default isAuthorized(Analytics, '/signin');
