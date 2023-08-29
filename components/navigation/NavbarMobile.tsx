import React, { useState, useEffect, useRef } from "react";
import { Background } from "../background/Background";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarMobile = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    setToggleMenu((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggleMenu(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div ref={menuRef}>
      <div>
        <i
          onClick={handleToggleMenu}
          className={
            toggleMenu
              ? "bi bi-x-circle-fill font-bold text-white text-2xl ease-in duration-300"
              : "bi bi-list text-2xl text-white font-bold ease-in duration-300"
          }
        ></i>
      </div>
      {toggleMenu && (
        <div className="block absolute top-20 right-0 z-10 mt-1 rounded-lg py-3 w-1/2 h-3/4 ease-in duration-300">
          <Background
            color="bg-gray-100"
            bgImg
            imgUrl='url("/background4.jpeg")'
            pd="p-6"
          >
            <div className="flex flex-col space-y-3 w-full">
              <>
                <div
                  onClick={() => {
                    router.push("/login");
                    setToggleMenu(false);
                  }}
                  className="bg-pink-500 border:none text-center rounded-lg p-3 ease-in duration-300 text-white font-medium"
                >
                  Login
                </div>
                <div
                  onClick={() => {
                    router.push("/register");
                    setToggleMenu(false);
                  }}
                  className="bg-gray-950 border:none text-center rounded-lg p-3 ease-in duration-300 text-white"
                >
                  Register
                </div>
              </>
            </div>
          </Background>
        </div>
      )}
    </div>
  );
};

export { NavbarMobile };
