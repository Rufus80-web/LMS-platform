import { ChangeEvent } from "react";
import { classes as classRooms } from "../static/classes";

type SelectType = {
  name: string;
  value: string;
  label: string;
  isRequired?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const FormSelect = ({
  name,
  value,
  label,
  onChange,
  isRequired,
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
        onChange={onChange}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option disabled value="">
          Choose your class
        </option>
        {classRooms?.map((room) => (
          <option key={room.id} value={room.name}>
            {room.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
