import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "../button/Button";
import { allGroups, createAGroup } from "@/slices/groupSlice";

interface ICreateGroup {
  closeIsCreateGroup: () => void;
  handleOpenCreateGroup: () => void;
}

const CreateGroup: React.FC<ICreateGroup> = ({
  closeIsCreateGroup,
  handleOpenCreateGroup,
}) => {
  const [groupData, setGroupData] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  const dispatch = useAppDispatch();
  const createGroup = useAppSelector((state) => state.groups);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGroupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      data: {
        name: groupData.name,
        description: groupData.description,
      },
    };
    await dispatch(createAGroup(data));
    if (createGroup.createGroupStatus === "success") {
      closeIsCreateGroup();
      dispatch(allGroups());
      handleOpenCreateGroup();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="flex justify-center items-center mx-auto">
        <Image src="/group.jpg" width={60} height={60} alt="group" />
      </div>
      {createGroup.createGroupStatus === "rejected" && (
        <div className="flex justify-center items-center m-auto text-xs text-red-700 italic">
          {createGroup.createGroupError}
        </div>
      )}
      <div className="flex space-x-2 w-full">
        <label className="p-2 text-black text-xs font-bold" htmlFor="name">
          Name:
        </label>
        <input
          className="rounded-lg shadow-lg p-2 w-full border text-black text-xs"
          type="text"
          value={groupData.name}
          name="name"
          onChange={handleChange}
          placeholder="Enter Group name"
          required
        />
      </div>
      <div className="flex space-x-2 w-full">
        <label className="p-2 text-black text-xs font-bold" htmlFor="name">
          Description:
        </label>
        <textarea
          className="rounded-lg shadow-lg p-2 border w-full text-black text-xs"
          value={groupData.description}
          name="description"
          onChange={handleChange}
          rows={5}
          cols={100}
          placeholder="Enter the description"
          required
        ></textarea>
      </div>
      <div className="flex space-x-2">
        <Button
          text="Create"
          onClick={handleSubmit}
          style="text-sm text-white bg-green-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white"
        />
        <Button
          text="Close"
          onClick={() => closeIsCreateGroup()}
          style="text-sm text-white bg-red-500 p-2 rounded-lg hover:bg-black hover:text-white"
        />
      </div>
    </div>
  );
};

export default CreateGroup;
