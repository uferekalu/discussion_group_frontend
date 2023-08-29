import Link from "next/link";
import type { ReactNode } from "react";

type INavbarProps = {
  logo: ReactNode;
  children: ReactNode;
  xsMenu: ReactNode
};

const Navbar = (props: INavbarProps) => (
  <div className="flex flex-wrap items-center justify-between">
    <div>
      <Link href={"/"}>{props.logo}</Link>
    </div>
    {/* <div>{props.horizontalAnimation}</div> */}
    <nav className="sm:hidden block">
      {props.xsMenu}
    </nav>
    <nav className="sm:block hidden">
      <ul className="navbar flex items-center text-md space-x-2 font-medium text-gray-800">
        {props.children}
      </ul>
    </nav>
    <style jsx>
      {`
        .navbar :global(li:not(:first-child)) {
          @apply mt-0;
        }
        .navbar :global(li:not(:last-child)) {
          @apply mr-5;
        }
      `}
    </style>
  </div>
);

export { Navbar };
