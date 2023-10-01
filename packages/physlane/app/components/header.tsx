import { Logo } from "./logo/logo";
import Menu from "./menu";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="sticky flex justify-between p-4">
      <div className="flex items-center">
        <Logo width={124} full></Logo>
        <Menu className="flex h-full items-end pl-6"></Menu>
      </div>
      <div className="flex items-center">
        <UserMenu></UserMenu>
      </div>
    </header>
  );
}
