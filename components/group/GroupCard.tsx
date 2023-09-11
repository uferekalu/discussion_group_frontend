import React, { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { Button } from "../button/Button";
import { Select } from "../select/Select";
import { Overlay } from "../overlay/Overlay";
import {
  DecodedJwt,
  DiscussionObject,
  GroupDetails,
  GroupMemberObject,
  UserObject,
} from "@/utils/interface";
import { useRouter } from "next/router";
import PulseAnimation from "../animations/PulseAnimations";

interface IGroupCard {
  id: number;
  groupId: number;
  creator: string;
  groupName: string;
  description: string;
  handleIdFromGroup: (num: number) => void;
  handleGroupId: (num: number) => void;
  groupError?: string | undefined;
  groupStatus?: string;
  group: GroupDetails;
  user: DecodedJwt | undefined;
  isMember: boolean;
  discussions: DiscussionObject[];
}

const GroupCard: React.FC<IGroupCard> = ({
  id,
  groupId,
  creator,
  groupName,
  description,
  handleIdFromGroup,
  handleGroupId,
  groupError,
  groupStatus,
  group,
  user,
  isMember,
  discussions,
  //   authToken
}) => {
  const [groupOverlay, setGroupOverlay] = useState<boolean>(false);
  const overlayRef = useRef<HTMLImageElement>(null);
  const router = useRouter();

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
              onClick={() => handleGroupId(id)}
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
            onClick={
              isMember ? () => router.push(`/forum/group/${id}`) : undefined
            }
            className={`{w-full mb-3 bg-white border p-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${
              groupId === id ? "block" : "hidden"
            } ${isMember && "cursor-pointer"} `}
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
              <div className={`flex justify-end px-4 pt-4`}>
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
              <p className="text-black text-center bg-gray-200 p-1 border rounded-lg text-xs mt-2 px-6">{`${description.slice(
                0,
                100
              )}...`}</p>

              <div className="flex flex-col space-y-2">
                {isMember ? (
                  <>
                    <Select text="Group Members">
                      {group.Group_members.map(
                        (mem: GroupMemberObject, idx: number) => (
                          <option key={idx} value={mem.User.username}>
                            {mem.User.username}
                          </option>
                        )
                      )}
                    </Select>
                    {discussions && discussions.length > 0 && (
                      <Select text="Discussions">
                        {discussions.map(
                          (discussion: DiscussionObject, idx: number) => (
                            <option key={idx} value={discussion.title}>
                              {discussion.title}
                            </option>
                          )
                        )}
                      </Select>
                    )}
                    <Button
                      id="startDiscussion"
                      text="Start Discussion"
                      onClick={() => {}}
                      style="bg-gray-950 border mt-2 rounded-lg p-1 text-white text-sm font-medium"
                    />
                  </>
                ) : (
                  <Button
                    id="joinGroup"
                    text="Join Group"
                    onClick={() => {}}
                    style="bg-gray-950 border mt-2 rounded-lg p-1 text-white text-sm font-medium"
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupCard;
