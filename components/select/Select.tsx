import React from "react";

type SelectProps = {
  style?: string;
  children: React.ReactNode;
  text: string;
};

const Select: React.FC<SelectProps> = ({ style, children, text }) => {
  return (
    <select
      className={`text-xs mt-2 border rounded-lg shadow-lg p-1 ${
        style ? style : undefined
      }`}
    >
      <option value="">{text}</option>
      {children}
    </select>
  );
};

export { Select };
