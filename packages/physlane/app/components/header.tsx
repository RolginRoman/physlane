import { Link } from "@physlane/ui";
import { Logo } from "./logo/logo";
import Menu from "./menu";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="z-[1] flex justify-between p-4">
      <div className="flex items-center">
        <Link href={"/"} aria-labelledby="Return to home page">
          <Logo width={124} full />
        </Link>
        <Menu className="flex h-full items-end pl-6" />
      </div>
      <div className="flex items-center">
        <UserMenu />
      </div>
    </header>
  );
}
