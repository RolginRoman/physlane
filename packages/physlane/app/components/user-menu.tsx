import { getUser } from "@physlane/auth/core";
import { SignOut } from "@physlane/auth/ui";
import { Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import {
  Icons,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Link,
} from "@physlane/ui";
import { Settings } from "./settings/settings";

export default async function UserMenu() {
  const currentUser = await getUser();

  if (currentUser) {
    return <UserMenuDropdown user={currentUser}></UserMenuDropdown>;
  }

  return (
    <Link href={"/signin"} className="text-slate-800">
      <Icons.Login></Icons.Login>
    </Link>
  );
}

function UserMenuDropdown({ user }: { user: Session["user"] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Icons.User className="mx-auto h-6 w-6 cursor-pointer text-slate-800" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="me-4 w-56">
        <DropdownMenuLabel>
          <Text className="cursor-default">{user?.name}</Text>
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
