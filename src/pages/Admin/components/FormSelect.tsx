import { ChangeEvent } from "react";
import { useTheme } from "../../../context/ThemeContext";

type SelectProps = {
  name: string;
  value: string;
  readonly placeholder?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  style: string;
  options?: string[];
};

const FormSelect = ({
  name,
  value,
  placeholder,
  onChange,
  style,
  options,
}: SelectProps) => {
  const { themeMode } = useTheme();
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`${style} ${
        themeMode === "dark"
          ? "bg-[#43495779] placeholder:text-slate-50 text-white"
          : "bg-[#eeeeee7c]"
      }`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options &&
        options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
    </select>
  );
};

export default FormSelect;
