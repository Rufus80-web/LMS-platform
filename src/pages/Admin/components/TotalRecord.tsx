import {} from "react";
import { useTheme } from "../../../context/ThemeContext";

type RecordProps = {
    title: string,
    count: number
}

const TotalRecord = ( { title, count}: RecordProps) => {
  const { themeMode } = useTheme()
  return (
    <div className={`w-[50%] rounded-lg h-full flex flex-col text-3xl justify-center items-center gap-1 ${themeMode === 'light' ? 'bg-[#a19f9f3b]' : 'bg-[#ffffff56] text-slate-50'}`}>
      <h2>{ title }</h2>
      <h1>{ count }</h1>
    </div>
  );
};

export default TotalRecord;
