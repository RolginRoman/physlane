import { getUser } from '@physlane/auth/core';
import { SignOut } from '@physlane/auth/ui';
import { Text } from '@radix-ui/themes';
import { Session } from 'next-auth';
import {
  Icons,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Link,
} from '@physlane/ui';
import { Settings } from './settings';

export default async function UserMenu() {
  const currentUser = await getUser();

  if (currentUser) {
    return <UserMenuDropdown user={currentUser}></UserMenuDropdown>;
  }

  return (
    <Link href={'/signin'} className='text-slate-800'>
      <Icons.Login></Icons.Login>
    </Link>
  );
}

function UserMenuDropdown({ user }: { user: Session['user'] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Icons.User className='text-slate-800 mx-auto h-6 w-6 cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 me-4'>
        <DropdownMenuLabel>
          <Text className='cursor-default'>{user?.name}</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <Settings></Settings>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <SignOut></SignOut>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
