import {} from "react";

import { useTeacherSidebarContext } from "../../../context/sidebarContext";
import { useTheme } from "../../../context/ThemeContext";

const StudentPiechart = () => {
  const { isOpen } = useTeacherSidebarContext();
  const {themeMode} = useTheme()
  return (
    <div
      className={`${
        isOpen ? "w-[510px] h-[290px]" : "w-[600px] h-[290px]"
      } ${themeMode === 'light' ? 'bg-[#f2f0f0] ' : 'bg-sidebar-dark'}`}
    >
      <div className="flex flex-col justify-start items-start px-0 py-8">
        <div>
          <h2 className={`text-[16px] font-semibold px-8 ${themeMode === 'dark' && 'text-[#fff]'}`}>Student Record</h2>
        </div>
        <hr className="w-full border-1 mt-3" />
      </div>
      {/* graph container  */}
      <div></div>
    </div>
  );
};

export default StudentPiechart;
