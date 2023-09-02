import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "../button/Button";
import { Select } from "../select/Select";
import { Overlay } from "../overlay/Overlay";
import { DecodedJwt, DiscussionObject, GroupDetails } from "@/utils/interface";

interface IGroupCard {
  id: number;
  groupId: number | null;
  creator: string;
  groupName: string;
  action1: string;
  action2: string;
  description: string;
  onClick: () => void;
  discussions?: DiscussionObject[];
  groupMembers: GroupDetails | undefined;
  handleGroupId: () => void;
  discussionsError?: string | undefined;
  groupError?: string | undefined;
  //   authToken: DecodedJwt | undefined
}

const GroupCard: React.FC<IGroupCard> = ({
  id,
  groupId,
  creator,
  groupName,
  action1,
  action2,
  description,
  onClick,
  discussions,
  groupMembers,
  handleGroupId,
  discussionsError,
  groupError,
  //   authToken
}) => {
  const [groupOverlay, setGroupOverlay] = useState<boolean>(false);
  const overlayRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        setGroupOverlay(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleGroupOverlay = () => {
    setGroupOverlay((prevState) => !prevState);
  };
  return (
    <div>
      {groupError ? (
        <div className="text-xs font-medium p-2 text-black">{groupError}</div>
      ) : (
        <>
          <div className="w-full mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div
              onClick={() => handleGroupId()}
              className="flex justify-between items-center p-2 cursor-pointer w-full"
            >
              <Image
                className="rounded-full shadow-lg"
                src="/discussion.jpg"
                height="20"
                width="20"
                alt="up"
              />
              <span className="text-xs text-black dark:text-black">
                {groupName}
              </span>
              <Image
                className="rounded-full shadow-lg"
                src={groupId === id ? "/images/down.png" : "/images/up.png"}
                height="15"
                width="15"
                alt="up"
              />
            </div>
          </div>
          <div
            className={`{w-full mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${
              groupId === id ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-end mt-1 mr-1">
              <Image
                ref={overlayRef}
                onClick={handleGroupOverlay}
                className="rounded-full shadow-lg cursor-pointer"
                src={"/images/ellipses.png"}
                height="12"
                width="15"
                alt="up"
              />
            </div>
            <div className="flex justify-end px-4 pt-4">
              {groupOverlay && (
                <Overlay groupOverlay={groupOverlay}>
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <Button
                        onClick={() => {
                          console.log("clicked");
                        }}
                        text="Edit"
                        style="block w-full px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      />
                    </li>
                    <li>
                      <Button
                        onClick={() => {}}
                        text="Delete"
                        style="block w-full px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      />
                    </li>
                  </ul>
                </Overlay>
              )}
            </div>
            <div className="flex flex-col items-center pb-2">
              <Image
                className="mb-3 rounded-full shadow-lg"
                src="/images/pic.jpg"
                height="30"
                width="30"
                alt="pic"
              />
              <h5 className="mb-1 text-xs font-medium text-gray-900 dark:text-white">
                <span className="rounded-lg font-bold text-xs">Creator:</span>{" "}
                {creator}
              </h5>
              <span className="text-xs text-black dark:text-black">
                <span className="rounded-lg m-auto font-bold text-xs">
                  Group:
                </span>{" "}
                {groupName}
              </span>
              <p className="text-black text-xs mt-2 px-6">{`${description.slice(
                0,
                100
              )}...`}</p>
              <div className="flex md:flex-col lg:hidden space-x-1">
                {discussionsError === "User is not a member" && (
                  <Button
                    id="join"
                    text="Join Group"
                    onClick={() => {}}
                    style="bg-blue-400 border rounded-lg p-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
                  />
                )}
                {discussionsError != "User is not a member" && (
                  <>
                    {discussions && discussions?.length > 0 && (
                      <Select text="See Discussion">
                        {discussions?.map((discussion: DiscussionObject) => (
                          <option key={discussion.id} value={discussion.title}>
                            {discussion.title}
                          </option>
                        ))}
                      </Select>
                    )}
                    <Button
                      id="join"
                      text="Start a Discussion"
                      onClick={() => {}}
                      style="bg-blue-400 border rounded-lg px-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
                    />
                    <Select text="See Members">
                      {groupMembers?.Group_members.map((mem, idx) => (
                        <option key={idx} value={mem.User.username}>
                          {mem.User.username}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
              </div>
              <div className="lg:flex hidden space-x-1">
                {discussionsError === "User is not a member" && (
                  <Button
                    id="join"
                    text="Join Group"
                    onClick={() => {}}
                    style="bg-blue-400 border rounded-lg p-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
                  />
                )}
                {discussionsError !== "User is not a member" && (
                  <>
                    {discussions && discussions?.length > 0 && (
                      <Select text="See Discussion">
                        {discussions?.map((discussion: DiscussionObject) => (
                          <option key={discussion.id} value={discussion.title}>
                            {discussion.title}
                          </option>
                        ))}
                      </Select>
                    )}
                    <Button
                      id="join"
                      text="Start a Discussion"
                      onClick={() => {}}
                      style="bg-blue-400 border rounded-lg px-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
                    />
                    <Select text="See Members">
                      {groupMembers?.Group_members.map((mem, idx) => (
                        <option key={idx} value={mem.User.username}>
                          {mem.User.username}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
              </div>
              <div className="flex sm:flex-col lg:hidden mt-2 space-x-1 md:mt-6">
                <Button
                  text={action1}
                  onClick={onClick}
                  style="inline-flex justify-center items-center px-2 py-1 sm:px-4 sm:py-2 sm:text-sm text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
                <Button
                  text={action2}
                  onClick={onClick}
                  style="inline-flex items-center px-2 py-1 sm:px-4 sm:py-2 sm:text-sm text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                />
              </div>
              <div className="lg:flex hidden mt-2 space-x-1 md:mt-6">
                <Button
                  text={action1}
                  onClick={onClick}
                  style="inline-flex items-center px-2 py-1 sm:px-4 sm:py-2 sm:text-sm text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
                <Button
                  text={action2}
                  onClick={onClick}
                  style="inline-flex items-center px-2 py-1 sm:px-4 sm:py-2 sm:text-sm text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupCard;
