import { FC } from "react";
import { format } from "timeago.js";
// import { useTheme } from "../../../../context/ThemeContext";

type ExamInfoProps = {
  title: string;
  course: string;
  description: string;
  createdAt: string;
};

type SpreadExamInfoProps = {
  announ: ExamInfoProps;
};

const Announcement: FC<SpreadExamInfoProps> = ({
  announ: { title, course, description, createdAt },
}) => {
  // const { themeMode } = useTheme();
  return (
    <div className="flex flex-col px-2 border-b-1 font-light border-blue-200 text-[#e8e6e6] bg-[#0000007e]">
      <div className="break-words">
        <span className={`text-sm font-semibold `}>{title}</span>
        <p>{course}</p>
        <span className={`text-[13px]`}>{description}</span>
      </div>
      <div>
        <span className={`text-[10px]`}>
          {format(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Announcement;
