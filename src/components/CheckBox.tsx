import { JSX } from "react";

type checkboxType = {
    id: string,
    name: string,
}

const CheckBox = ( {id, name } : checkboxType): JSX.Element => {
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    />
  );
};

export default CheckBox;
