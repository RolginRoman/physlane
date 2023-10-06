import { getUser } from "@physlane/auth/core";
import { SignOut } from "@physlane/auth/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  Link,
  WithTooltip,
} from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import { Settings } from "./settings";

export default async function UserMenu() {
  const currentUser = await getUser();

  if (currentUser) {
    return <UserMenuDropdown user={currentUser} />;
  }

  return (
    <WithTooltip content={"Sign in & sign up"}>
      <Link
        href={"/signin"}
        className="text-slate-800"
        aria-label="Sign in & sign up"
      >
        <Icons.Login />
      </Link>
    </WithTooltip>
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
          <Settings />
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <SignOut />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
