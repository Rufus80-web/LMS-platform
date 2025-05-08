import {} from "react";

import { useTeacherSidebarContext } from "../../../context/TeacherSidebarContext";

const StudentPiechart = () => {
  const { isOpen } = useTeacherSidebarContext();
  return (
    <div
      className={`${
        isOpen ? "w-[510px] h-[290px]" : "w-[600px] h-[290px]"
      } bg-[#f2f0f0]`}
    >
      <div className="flex flex-col justify-start items-start px-0 py-8">
        <div>
          <h2 className="text-[16px] font-semibold px-8">Student Record</h2>
        </div>
        <hr className="w-full border-1 mt-3" />
      </div>
      {/* graph container  */}
      <div></div>
    </div>
  );
};

export default StudentPiechart;
