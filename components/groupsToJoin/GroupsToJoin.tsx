import { useRouter } from "next/router";
import React from "react";
import { Button } from "../button/Button";
import { motion } from "framer-motion";

interface IGroupsToJoin {
  groupsToJoin: string[] | unknown;
  belongsTo: string[] | unknown;
  openModal: () => void;
  selectGroup: (id: number, name: string) => void;
  handleGroupsUserBelongsTo: () => void;
  handleJoinAGroup: () => void;
  isJoinAGroup: boolean;
  isBelongTo: boolean;
}

const GroupsToJoin: React.FC<IGroupsToJoin> = ({
  groupsToJoin,
  belongsTo,
  openModal,
  selectGroup,
  handleGroupsUserBelongsTo,
  handleJoinAGroup,
  isJoinAGroup,
  isBelongTo,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center m-auto p-3 mt-3">
      <div className="flex space-x-2">
        <h2
          onClick={handleJoinAGroup}
          className={`text-white font-medium text-sm mb-3 p-2 rounded-lg shadow-lg cursor-pointer ${
            isJoinAGroup ? "bg-black" : "bg-slate-500"
          }`}
        >
          Groups You can Join
        </h2>
        <h2
          onClick={handleGroupsUserBelongsTo}
          className={`text-white font-medium text-sm mb-3 p-2 rounded-lg shadow-lg cursor-pointer ${
            isBelongTo ? "bg-black" : "bg-slate-500"
          }`}
        >
          Groups You Belong To
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 2.0 }}
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 mt-3">
          {isJoinAGroup &&
            Array.isArray(groupsToJoin) &&
            groupsToJoin.map((group) => (
              <Button
                key={group.id}
                text={group.name}
                style="bg-blue-500 p-2 rounded-lg shadow-lg text-white text-xs hover:bg-pink-500"
                onClick={() => {
                  openModal();
                  selectGroup(group.id, group.name);
                }}
              />
            ))}
          {isBelongTo &&
            Array.isArray(belongsTo) &&
            belongsTo.map((group) => (
              <Button
                key={group.id}
                text={group.name}
                style="bg-blue-500 p-2 rounded-lg shadow-lg text-white text-xs hover:bg-pink-500"
                onClick={() => router.push(`/forum/group/${group.id}`)}
              />
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GroupsToJoin;
