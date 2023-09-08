import Landing from '../src/components/landing';
import LineChart from './_test/linechart';

export const metadata = {
  description: 'One of the kind',
  title: 'Welcome to Physlane. Fitness Analytics Hub',
};

export default async function Index() {
  return (
    <>
      <main className="mx-auto max-w-screen-lg pt-8 p-4 lg:p-0">
        <Landing></Landing>
        <div className="grid grid-cols-3">
          <LineChart className="w-auto" animationStartMs={0}></LineChart>
          <LineChart className="w-auto" animationStartMs={200}></LineChart>
          <LineChart className="w-auto" animationStartMs={400}></LineChart>
        </div>
      </main>
    </>
  );
}
