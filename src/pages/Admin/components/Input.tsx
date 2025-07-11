import { ChangeEvent } from "react";
import { useTheme } from "../../../context/ThemeContext";

type InputProps = {
  name: string;
  type: string;
  value: string;
  readonly placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style: string;
  disable: boolean
};

const Input = ({
  name,
  type,
  value,
  placeholder,
  onChange,
  style,
  disable
}: InputProps) => {
  const {themeMode} = useTheme()
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disable}
      className={`${style} ${themeMode === 'dark' ? 'bg-[#43495779] placeholder:text-slate-50 text-white' : 'bg-[#eeeeee7c]'} select-none placeholder:textt-sm`}
    />
  );
};

export default Input;
