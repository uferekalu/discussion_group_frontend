import React, { ReactNode } from "react";
import { Tooltip, Typography } from "@material-tailwind/react";

interface IReusableToolTip {
  children: ReactNode;
  text: string
}

const ReusableToolTip: React.FC<IReusableToolTip> = ({ text, children }) => {
  return (
    <Tooltip
      placement="bottom"
      className="border -mt-1 z-50 border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
      content={
        <div className="w-16">
          {text}
        </div>
      }
    >
      {children}
    </Tooltip>
  );
};

export { ReusableToolTip };
