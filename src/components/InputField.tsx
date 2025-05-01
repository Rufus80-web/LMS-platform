import { ChangeEvent } from "react";

type InputFieldType = {
  id?: string;
  name: string;
  value: string;
  placeholder?: string;
  label: string;
  type: string;
  isRequired?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  id,
  name,
  value,
  type,
  placeholder,
  label,
  isRequired,
  onChange,
}: InputFieldType) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}{" "}
        {isRequired && (
          <span className={`space-x-3 ${isRequired && "text-red-600"}`}>*</span>
        )}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default InputField;
