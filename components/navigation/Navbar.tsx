import Link from "next/link";
import type { ReactNode } from "react";

type INavbarProps = {
  logo: ReactNode;
  children: ReactNode;
  xsMenu: ReactNode;
};

const Navbar = (props: INavbarProps) => (
  <div
    style={{
      backgroundImage: 'url("background2.jpg")',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "100%",
      paddingLeft: "12px",
      paddingRight: "12px",
      transition: 'height 0.3s ease',
      backdropFilter: 'saturate(180% blur(20px)',
    }}
    id="navbar"
    className="flex w-full justify-between h-24 items-center fixed z-20 right-0 left-0 top-0"
  >
    <div>
      <Link href={"/"}>{props.logo}</Link>
    </div>
    <nav className="sm:hidden block">{props.xsMenu}</nav>
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
