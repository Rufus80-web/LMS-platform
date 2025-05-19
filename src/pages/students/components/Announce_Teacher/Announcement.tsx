import { FC } from "react";
import { useTheme } from "../../../../context/ThemeContext";

const Announcement: FC = () => {
  const {themeMode} = useTheme()
  return (
    <div className="flex flex-col">
      <div className="break-words">
        <span className={`font-light text-xl ${themeMode === 'dark' && 'text-slate-50'}`}>Academic: </span>
        <span className={`text-[13px] ${themeMode === 'dark' ? 'text-[#ebe8e894]' : 'text-[#1d1b1b9d]'}`}>
          Summer training inter Live Project
        </span>
      </div>
      <div>
        <span className={`text-[10px] ${themeMode === 'dark' ? 'text-[#ebe8e894]' : 'text-[#1d1b1b9d]'}`}>4 minutes ago</span>
      </div>
    </div>
  );
};

export default Announcement;
