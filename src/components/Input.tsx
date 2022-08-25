import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ type, label, onChange, ...props }) => {
  return (
    <div className="input">
      <p>{label}</p>
      <input type={type} name={label} onChange={onChange} {...props} />
    </div>
  );
};
export default Input;
