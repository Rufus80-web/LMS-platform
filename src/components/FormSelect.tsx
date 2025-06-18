import { ChangeEvent } from "react";

type SelectType = {
  name: string;
  value: string;
  label: string;
  isRequired?: boolean;
  disabled?: boolean,
  options: string[]
  style?: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};


const FormSelect = ({
  name,
  value,
  label,
  onChange,
  isRequired,
  disabled,
  options,
  style
}: SelectType) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}{" "}
        {isRequired && (
          <span className={`space-x-3 ${isRequired && "text-red-600"}`}>*</span>
        )}
      </label>
      <select
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`border-2 border-[#00000011] shadow-2xl h-[7vh] w-[35vw] rounded-md ${style}`}
      >
        <option disabled value="">
          {label}
        </option>
        {options?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
