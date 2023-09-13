import { Session, getServerSession } from 'next-auth';
import { authOptions } from './options';

export async function getUser(): Promise<Session['user'] & { id: string }> {
  return await getServerSession(authOptions).then((session) => session?.user);
}
