import { Link } from '@physlane/ui';
import { HTMLAttributes } from 'react';

const menuItems = [{ href: '/', name: 'home' }];

export default function Menu(props: HTMLAttributes<HTMLElement>) {
  return (
    <nav {...props}>
      <ul className="flex space-x-2">
        {menuItems.map((item) => {
          return (
            <li key={item.href} className="flex text-lg capitalize">
              <Link href={item.href}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
