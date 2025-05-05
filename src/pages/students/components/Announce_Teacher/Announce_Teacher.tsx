import { FC } from "react";

import Announcement from "./Announcement";
import TeacherOnLeave from "./TeacherOnLeave";

const Announce_Teacher: FC = () => {
  return (
    <div className="w-[18vw] h-full flex flex-col">
      <div className="remove-scroll w-full h-[50vh] pt-14 pl-2 bg-[#f6f6f9] flex flex-col gap-2 overflow-y-scroll ">
        <h2 className="text-2xl font-bold">Announcement</h2>
        <Announcement />
        <Announcement />
        <Announcement />
      </div>
      <div className="w-full pt-1 h-[50vh] pl-2 overflow-y-scroll remove-scroll-1">
        <h2 className="text-2xl font-bold">Teachers On Leave</h2>
        <div className="pt-2 flex flex-col gap-2">
          <TeacherOnLeave />
          <TeacherOnLeave />
        </div>
      </div>
    </div>
  );
};

export default Announce_Teacher;
