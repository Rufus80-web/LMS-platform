import { FC } from "react";

import Announcement from "./Announcement";
import TeacherOnLeave from "./TeacherOnLeave";
// import { useTheme } from "../../../../context/ThemeContext";

type ExamInfoProps = {
  title: string;
  course: string;
  description: string;
  createdAt: string;
};

type Instructor = {
  firstname: string;
  lastname: string;
  profile: string;
};

type AnnouncementProps = {
  announcements: ExamInfoProps[];
  instructors: Instructor[];
};

const Announce_Teacher: FC<AnnouncementProps> = ({
  announcements,
  instructors,
}) => {
  // const { themeMode } = useTheme();
  return (
    <div
      className={`w-[18vw] h-full flex flex-col bg-gradient-to-r from-[#111] to-[#082520c5] shadow-sm`}
    >
      <div
        className={`remove-scroll w-full max-h-[50vh] pt-14 flex flex-col gap-0 overflow-auto `}
      >
        <div>
          <h2 className="text-sm font-semibold text-white uppercase mt-2 px-2">
            Announcements
          </h2>
        </div>
        {announcements.map((item, index) => (
          <Announcement key={index} announ={{ ...item }} />
        ))}
      </div>
      <div className="w-full pt-1 h-[50vh] pl-2 overflow-y-scroll remove-scroll-1 border-t-1 border-t-gray-500">
        <h2 className="text-sm font-semibold text-white uppercase">
          Your Teachers
        </h2>
        <div className="pt-2 flex flex-col gap-2">
          {instructors
            ? instructors.map((item, p) => (
                <TeacherOnLeave
                  key={p}
                  firstname={item.firstname}
                  lastname={item.lastname}
                  profile={item.profile}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Announce_Teacher;
