import { Logo } from '../logo/logo';
import { Menu } from '../menu/menu';
import UserMenu from '../user-menu/user-menu';

export function Header() {
  return (
    <header className="flex p-4 sticky justify-between">
      <div className="flex items-center">
        <Logo height={24} width={124} full></Logo>
        <Menu className="pl-6 flex items-center"></Menu>
      </div>
      <div className="flex items-center">
        <UserMenu></UserMenu>
      </div>
    </header>
  );
}
export default Header;
