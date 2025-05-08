import { ChangeEvent } from "react";

type InputProps = {
  name: string;
  type: string;
  value: string;
  readonly placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style: string;
};

const Input = ({
  name,
  type,
  value,
  placeholder,
  onChange,
  style,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={style}
    />
  );
};

export default Input;
