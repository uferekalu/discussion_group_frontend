import React, { useState, useEffect, useRef, useCallback } from "react";
import { Background } from "../background/Background";
import { useRouter } from "next/router";
import { Button } from "../button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/slices/authSlice";
import { Notification } from "../notification/Notification";
import { motion } from "framer-motion";
import { AllNotifications, DecodedJwt, GroupSlice } from "@/utils/interface";
import { Reusables } from "@/utils/reusables";
import GroupsToJoin from "../groupsToJoin/GroupsToJoin";
import jwtDecode from "jwt-decode";

interface INavbarMobile {
  handleOpenRegisterModal: () => void;
  handleCloseRegisterModal: () => void;
  handleOpenLoginModal: () => void;
  handleCloseLoginModal: () => void;
  openIsCreateGroup: () => void;
  notifications: AllNotifications[];
  notificationStatus: string;
  notificationError: string;
  groups: GroupSlice;
  groupsToJoin: string[] | unknown;
  openModal: () => void;
  selectGroup: (id: number, name: string) => void;
  handleGroupsUserBelongsTo: () => void;
  handleJoinAGroup: () => void;
  belongsTo: string[] | unknown;
  isJoinAGroup: boolean;
  isBelongTo: boolean;
}

const NavbarMobile = (props: INavbarMobile) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hoverButton, setHoverButton] = useState<string | null>(null);

  const { buttonVariants } = Reusables();

  const handleShowNotification = () => {
    setShowNotification((prevState) => !prevState);
    setToggleMenu(false)
  };

  const handleToggleMenu = () => {
    setToggleMenu((prevState) => !prevState);
    setShowNotification(false)
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedUser: DecodedJwt = jwtDecode(`${token}`);
    setAuthToken(token);
    if (!token) {
      router.push("/");
    }
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
        {authToken && props.notifications && (
          <div onClick={handleShowNotification} className="flex mr-1 mt-1">
            <li className="bi bi-bell-fill text-white text-xl mt-1 mr-1 list-none"></li>
            <span className="flex w-4 h-4 -mt-1 p-3 -ml-2 justify-center items-center text-xs m-auto bg-red-700 rounded-full text-white">
              {props.notifications.length}
            </span>
          </div>
        )}
        <Notification
          showNotification={showNotification}
          notifications={props.notifications}
          notificationStatus={props.notificationStatus}
          notificationError={props.notificationError}
        />
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            id="togglebar"
            className="absolute z-50 top-20 mt-4 sm:w-1/2 w-5/6 sm:right-6 right-0 rounded-lg shadow-lg"
          >
            <Background
              color="bg-gray-100"
              bgImg
              imgUrl='url("/background4.jpeg")'
              pd="p-3"
            >
              <div className="flex flex-col space-y-3 w-full">
                {authToken ? (
                  <div className="h-96 overflow-y-auto mt-2">
                    <div className="flex flex-col mt-2">
                      <div className="flex space-x-2">
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          onMouseEnter={() => setHoverButton("Send Invite")}
                          onMouseLeave={() => setHoverButton(null)}
                          onClick={() => {
                            setToggleMenu(false);
                          }}
                          className={`bg-red-400 p-2  rounded-lg shadow-lg text-white text-xs ${
                            hoverButton === "Send Invite"
                              ? "hover:bg-teal-300"
                              : ""
                          }`}
                        >
                          Send Invite
                        </motion.button>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          onMouseEnter={() => setHoverButton("Create a Group")}
                          onMouseLeave={() => setHoverButton(null)}
                          onClick={() => {
                            setToggleMenu(false);
                            props.openIsCreateGroup();
                          }}
                          className={`bg-blue-500 p-2  rounded-lg shadow-lg text-white text-xs ${
                            hoverButton === "Create a Group"
                              ? "hover:bg-teal-300"
                              : ""
                          }`}
                        >
                          Create a Group
                        </motion.button>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          onMouseEnter={() => setHoverButton("Logout")}
                          onMouseLeave={() => setHoverButton(null)}
                          onClick={() => {
                            handleLogout();
                            setToggleMenu(false);
                          }}
                          className={`bg-black p-2 rounded-lg shadow-lg text-white text-xs ${
                            hoverButton === "Logout" ? "hover:bg-teal-300" : ""
                          }`}
                        >
                          Logout
                        </motion.button>
                      </div>
                      {props.groups.groupStatus === "success" && (
                        <GroupsToJoin
                          groupsToJoin={props.groupsToJoin}
                          openModal={props.openModal}
                          selectGroup={props.selectGroup}
                          handleGroupsUserBelongsTo={
                            props.handleGroupsUserBelongsTo
                          }
                          handleJoinAGroup={props.handleJoinAGroup}
                          belongsTo={props.belongsTo}
                          isJoinAGroup={props.isJoinAGroup}
                          isBelongTo={props.isBelongTo}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
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
                  </div>
                )}
              </div>
            </Background>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default NavbarMobile;
