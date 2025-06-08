import React, { ChangeEvent } from "react";

type Selectprops = {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

type ProgrammingLangage = {
  language: string;
  version: string;
};

const languages: ProgrammingLangage[] = [
  { language: "javascript", version: "15.10.0" },
  { language: "python", version: "5.10.0" },
  { language: "java", version: "10.18.7" },
  { language: "php", version: "8.4.2" },
  { language: "C#", version: "11.2.6" },
];

const Select: React.FC<Selectprops> = ({ name, value, onChange }) => {
  return (
    <section className="flex flex-col gap-2">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border-1 outline-0 border-[#ffffff3f] w-max h-8 rounded-md text-slate-50 bg-gray-900 text-[12px] pl-2 hover:border-green-800"
      >
        {languages.map((lang, i) => (
          <option
            key={i}
            value={lang.language}
            className={`
            text-[#000] ${lang.language === value ? "text-blue-500" : ""}
            ${lang.language === value ? "bg-gray-700" : ""} 
          `}
          >
            {lang.language} &nbsp;
          </option>
        ))}
      </select>
    </section>
  );
};

// <span className="text-[10px]">{lang.version}</span>
export default Select;
