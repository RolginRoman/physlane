import { getUser } from '@physlane/auth/core';
import { Icons } from '../../ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import Link from '../link/link';
import { Session } from 'next-auth';
import { Text } from '@radix-ui/themes';

export default async function UserMenu() {
  const currentUser = await getUser();

  if (currentUser) {
    return <UserMenuDropdown user={currentUser}></UserMenuDropdown>;
  }

  return <Link href={'/signin'}>Sign in</Link>;
}

function UserMenuDropdown({ user }: { user: Session['user'] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Icons.user className="mx-auto h-6 w-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuLabel>
          <Text className="cursor-default">{user?.name}</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <Link className="w-full flex" href={'api/auth/signout'}>
            Sign out
          </Link>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
