import { JSX } from "react";

type HeaderTitle = {
    title: string
}

const FormHeader = ({ title } : HeaderTitle): JSX.Element => {
  return (
    <header>
      <h2 className="text-center text-2xl font-bold text-gray-900">{title}</h2>
    </header>
  );
};

export default FormHeader;
