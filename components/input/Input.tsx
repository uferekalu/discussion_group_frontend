import React from "react";

type InputProps = {
  placeholder: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  htmlFor: string;
  type: string;
  text: string;
  required?: boolean
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  name,
  onChange,
  htmlFor,
  type,
  text,
  required
}) => {
  return (
    <div className="mb-2">
      <label className="block text-white text-xs font-medium" htmlFor={htmlFor}>
        {text} {" "} {required && "*"}
      </label>
      <input
        className="w-full px-3 border text-sm rounded-lg shadow-lg placeholder:text-xs"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        required={required ? required : undefined}
      />
    </div>
  );
};

export { Input };
