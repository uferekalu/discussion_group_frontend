import React from "react";

type ButtonProps = {
  onClick: () => void;
  text: string;
  style: string;
  type?: "button" | "submit" | "reset" | undefined;
  id?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  style,
  type,
  id,
  disabled,
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      disabled={disabled ? disabled : undefined}
      type={type ? type : undefined}
      className={`cursor-pointer ${style}`}
      onClick={handleClick}
      id={id ? id : undefined}
    >
      {text}
    </button>
  );
};

export { Button };
