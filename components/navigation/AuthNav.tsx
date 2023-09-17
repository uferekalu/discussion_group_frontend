import React, { useState } from "react";
import { Button } from "../button/Button";
import { Notification } from "../notification/Notification";
import { AllNotifications } from "@/utils/interface";

interface IAuthNav {
  handleLogout: () => void;
  openIsCreateGroup: () => void;
  notifications: AllNotifications[];
  notificationStatus: string;
  notificationError: string;
}

const AuthNav: React.FC<IAuthNav> = ({
  handleLogout,
  openIsCreateGroup,
  notifications,
  notificationStatus,
  notificationError,
}) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowNotification((prevState) => !prevState);
  };

  return (
    <>
      {notifications && (
        <div className="flex mr-1 mt-1 cursor-pointer" onClick={handleClick}>
          <li className="bi bi-bell-fill text-white text-xl mt-1 mr-1 list-none"></li>
          <span className="flex w-4 h-4 -mt-1 p-3 -ml-2 justify-center items-center text-xs m-auto bg-red-700 rounded-full text-white">
            {notifications.length}
          </span>
        </div>
      )}
      <Notification
        showNotification={showNotification}
        notifications={notifications}
        notificationStatus={notificationStatus}
        notificationError={notificationError}
      />
      <Button
        id="invite"
        text="Send an Invite"
        onClick={() => {}}
        style="bg-red-400 border rounded-lg p-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
      />
      <Button
        id="createGroup"
        text="Create a Group"
        onClick={openIsCreateGroup}
        style="bg-red-400 border rounded-lg p-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
      />
      <Button
        id="logout"
        text="Logout"
        onClick={handleLogout}
        style="bg-gray-950 border rounded-lg p-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
      />
    </>
  );
};

export default AuthNav;
