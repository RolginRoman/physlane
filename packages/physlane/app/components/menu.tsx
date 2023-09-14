"use client";
import { Link } from "@physlane/ui";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

const menuItems = [
  { href: "/", name: "home" },
  { href: "/analytics", name: "analytics" },
];

export default function Menu(props: HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  return (
    <nav {...props}>
      <ul className="flex space-x-4">
        {menuItems.map((item) => {
          return (
            <li
              key={item.href}
              data-current={pathName === item.href}
              className="flex text-lg capitalize"
            >
              <Link
                theme={{
                  underline: pathName === item.href ? "always" : "auto",
                }}
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
