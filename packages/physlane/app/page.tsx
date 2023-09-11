import Landing from './components/landing';

export const metadata = {
  description: 'One of the kind',
  title: 'Welcome to Physlane. Fitness Analytics Hub',
};

export default async function Index() {
  return (
    <>
      <main className="mx-auto max-w-screen-lg pt-8 p-4 lg:p-0">
        <Landing></Landing>
        <div className="grid grid-cols-3"></div>
      </main>
    </>
  );
}
