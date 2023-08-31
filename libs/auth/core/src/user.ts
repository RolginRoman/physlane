import { getServerSession } from 'next-auth';
import { authOptions } from './options';

export async function getUser() {
  return await getServerSession(authOptions).then((session) => session?.user);
}
