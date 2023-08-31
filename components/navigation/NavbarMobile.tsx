import React, { useState, useEffect, useRef } from "react";
import { Background } from "../background/Background";
import { useRouter } from "next/router";
import { Button } from "../button/Button";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { logoutUser } from "@/slices/authSlice";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface INavbarMobile {
  handleOpenRegisterModal: () => void;
  handleCloseRegisterModal: () => void;
  handleOpenLoginModal: () => void;
  handleCloseLoginModal: () => void;
}

const NavbarMobile = (props: INavbarMobile) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const auth = useTypedSelector((state) => state.auth);

  const handleToggleMenu = () => {
    setToggleMenu((prevState) => !prevState);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, [router]);

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

  const handleLogout = () => {
    dispatch(logoutUser(null));
    router.push("/");
  };
  return (
    <div ref={menuRef}>
      <div className="flex space-x-2">
        <div className="flex mr-1 mt-1">
          <li className="bi bi-bell-fill text-white text-xl mt-1 mr-1 list-none"></li>
          <span className="flex w-4 h-4 -mt-1 p-3 -ml-2 justify-center items-center text-xs m-auto bg-red-700 rounded-lg text-white">
            0
          </span>
        </div>
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
        <div
          id="togglebar"
          className="block fixed top-20 right-0 z-10 mt-1 rounded-lg py-3 w-1/2 h-3/4 ease-in duration-300"
        >
          <Background
            color="bg-gray-100"
            bgImg
            imgUrl='url("/background4.jpeg")'
            pd="p-6"
          >
            <div className="flex flex-col space-y-3 w-full">
              {authToken ? (
                <>
                  <Button
                    text="Send Invite"
                    onClick={() => {
                      setToggleMenu(false);
                    }}
                    style="bg-red-400 border:none text-center text-sm rounded-lg p-3 text-white font-medium"
                  />
                  <Button
                    text="Join a Group"
                    onClick={() => {
                      setToggleMenu(false);
                    }}
                    style="bg-blue-400 border:none text-center text-sm rounded-lg p-3 text-white font-medium"
                  />
                  <Button
                    text="Logout"
                    onClick={() => {
                      handleLogout();
                      setToggleMenu(false);
                    }}
                    style="bg-black border:none text-center text-sm rounded-lg p-3 text-white font-medium"
                  />
                </>
              ) : (
                <>
                  <Button
                    text="Login"
                    onClick={() => {
                      props.handleOpenLoginModal();
                      setToggleMenu(false);
                    }}
                    style="bg-pink-500 border:none text-center text-sm rounded-lg p-3 text-white font-medium"
                  />
                  <Button
                    text="Register"
                    onClick={() => {
                      props.handleOpenRegisterModal();
                      setToggleMenu(false);
                    }}
                    style="bg-gray-950 border:none text-center text-sm rounded-lg p-3 text-white"
                  />
                </>
              )}
            </div>
          </Background>
        </div>
      )}
    </div>
  );
};
export default NavbarMobile;
