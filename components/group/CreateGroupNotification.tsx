import React from "react";
import { Button } from "../button/Button";

interface ICreateGroup {
  closeHasJoined: () => void;
  text: string;
}

const CreateGroupNotification: React.FC<ICreateGroup> = ({
  closeHasJoined,
  text,
}) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <i className="bi bi-info-circle-fill text-3xl"></i>
      <p className="text-center text-sm">{text}</p>
      <div className="flex space-x-2">
        <Button
          text="Close"
          onClick={() => {
            closeHasJoined();
          }}
          style="text-sm text-white bg-red-500 p-2 rounded-lg hover:bg-black hover:text-white"
        />
      </div>
    </div>
  );
};

export default CreateGroupNotification;
