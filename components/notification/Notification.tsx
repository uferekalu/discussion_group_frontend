import React from "react";
import { motion } from "framer-motion";
import { AllNotifications } from "@/utils/interface";
import { Button } from "../button/Button";
import PulseAnimation from "../animations/PulseAnimations";

interface INotification {
  showNotification: boolean;
  notifications: AllNotifications[];
  notificationStatus: string;
  notificationError: string;
}

const Notification: React.FC<INotification> = ({
  showNotification,
  notifications,
  notificationStatus,
  notificationError,
}) => {
  const unreadMsg = () => {
    const unread = notifications.filter(
      (notification) => notification.status === "unread"
    );
    return unread.length;
  };
  const readMsg = () => {
    const read = notifications.filter(
      (notification) => notification.status === "read"
    );
    return read.length;
  };

  const handleVariousNotification = (text: string) => {
    const result =
      notifications &&
      notifications
        .filter((notification) => notification.content.includes(text))
        .map((result) => (
          <div className="flex flex-col" key={result.id}>
            <div className="flex flex-col space-y-2 p-1 mt-2">
              <div className="flex space-x-2">
                <input type="checkbox" />
                <span className="text-black text-xs">
                  {text === "has reacted" || text === "has started a discussion"
                    ? result.content
                    : result.message}
                </span>
              </div>
              <Button
                text="Delete"
                style="bg-blue-500 px-2 py-1 rounded-lg shadow-lg text-white text-xs hover:bg-pink-500"
                onClick={handleDelete}
              />
            </div>
            <hr />
          </div>
        ));

    return notificationStatus === "pending" ? (
      <div className="mt-2">
        <PulseAnimation num={2} display="grid grid-cols-1 gap-4" />
      </div>
    ) : (
      result
    );
  };

  const handleDelete = () => {};
  return (
    <>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute z-50 top-16 mt-3 sm:w-1/2 w-full sm:right-6 right-0 bg-white p-3 rounded-lg shadow-lg">
            <div className="flex space-x-1">
              <h2 className="text-black text-sm font-bold p-2 m-auto justify-center items-center">
                All Notifications
              </h2>
            </div>
            <div className="flex space-x-3">
              <div className="flex space-x-1 mt-1 cursor-pointer">
                <i className="bi bi-envelope"></i>
                <span className="text-xs text-black mt-1">Inbox</span>
              </div>
              <div className="flex space-x-1 mt-1 cursor-pointer">
                <span className="flex p-1 justify-center items-center text-xs m-auto bg-gray-500 rounded-full text-white">
                  {unreadMsg()}
                </span>
                <span className="text-xs text-black mt-1 -ml-1">Unread</span>
              </div>
              <div className="flex space-x-1 mt-1 cursor-pointer">
                <span className="flex p-1 justify-center items-center text-xs m-auto bg-gray-500 rounded-full text-white">
                  {readMsg()}
                </span>
                <span className="text-xs text-black mt-1 -ml-1">Read</span>
              </div>
            </div>
            <div className="h-64 overflow-y-auto mt-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <h3 className="text-black text-xs text-center font-bold sm:p-2 p-1 mt-2 bg-gray-300 rounded-lg">
                    Group Related:
                  </h3>
                  {handleVariousNotification("has reacted")}
                  <hr />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-black text-xs text-center font-bold sm:p-2 p-1 mt-2 bg-gray-300 rounded-lg">
                    Discussions Related:
                  </h3>
                  {handleVariousNotification("has started a discussion")}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-black text-xs text-center font-bold sm:p-2 p-1 mt-2 bg-gray-300 rounded-lg">
                    Invite Related:
                  </h3>
                  {handleVariousNotification(
                    "You have an invitation waiting for your action"
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export { Notification };
