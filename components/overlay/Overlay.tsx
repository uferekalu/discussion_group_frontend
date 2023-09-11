import React from "react";

type OverlayProps = {
  children: React.ReactNode;
  groupOverlay?: boolean;
};

const Overlay: React.FC<OverlayProps> = ({
  children,
  groupOverlay
}) => {
  return (
    <div style={{
      display: "none"
    }}
      id="dropdown"
      className={`absolute z-10 border text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
        groupOverlay ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export { Overlay };
