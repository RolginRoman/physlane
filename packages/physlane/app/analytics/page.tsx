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

const api = ky.create({
  prefixUrl: `${process.env.BASE_URL}/api`,
});

async function Analytics() {
  // TODO show grouped by date ( average? )
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
    <>
      <LogMeasure></LogMeasure>
      {result && (
        <Tabs defaultValue="graph">
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
    </>
  );
}

export default isAuthorized(Analytics, '/signin');
