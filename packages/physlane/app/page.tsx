import { Landing } from '@physlane/ui';
import { getUser } from '@physlane/auth/core';

export default async function Index() {
  const session = await getUser();
  return (
    <>
      <main className="mx-auto max-w-prose pt-8">
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <Landing></Landing>
      </main>
    </>
  );
}
