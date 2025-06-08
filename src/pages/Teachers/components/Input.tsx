import { ChangeEvent } from "react";
import { useTheme } from "../../../context/ThemeContext";

type InputProps = {
  name: string;
  type: string;
  value: string;
  readonly placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: string;
  disable?: boolean;
};

const Input = ({
  name,
  type,
  value,
  placeholder,
  onChange,
  disable,
}: InputProps) => {
  const { themeMode } = useTheme();
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disable}
      onChange={onChange}
      className={`border-2 border-[#00000011] outline-0 shadow-2xl h-[7vh] w-[40vw] rounded-md indent-2 focus:border-slate-50 placeholder:text-[12px] ${
        themeMode === "dark"
          ? "bg-[#43495779] placeholder:text-slate-50 text-white"
          : "bg-gray-200"
      }`}
    />
  );
};

export default Input;
