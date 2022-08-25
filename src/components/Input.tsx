import React from 'react';

export interface InputProps {
  type: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ type, label, onChange }) => {
  return (
    <div className="input">
      <p>{label}</p>
      <input type={type} name={label} onChange={onChange}></input>
    </div>
  );
};
export default Input;
