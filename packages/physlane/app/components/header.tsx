import { Logo } from "./logo/logo";
import Menu from "./menu";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="flex p-4 sticky justify-between">
      <div className="flex items-center">
        <Logo width={124} full></Logo>
        <Menu className="pl-6 h-full flex items-end"></Menu>
      </div>
      <div className="flex items-center">
        <UserMenu></UserMenu>
      </div>
    </header>
  );
}
