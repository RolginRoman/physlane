import { isAuthorized } from '@physlane/auth/core';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { z } from 'zod';
import getQueryClient from '../query-client';
import { loadReport } from './data';
import { Params } from './view-model';
import { AnalyticsContent } from './content';

async function Analytics({ params }: { params: z.infer<typeof Params> }) {
  params.mode = 'graph';

  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryFn: () => {
      console.log('prefetched report');
      return loadReport({ headers: headers() });
    },
    queryKey: ['report'],
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <AnalyticsContent mode={params.mode}></AnalyticsContent>
    </Hydrate>
  );
}

export default isAuthorized(Analytics, '/signin');
