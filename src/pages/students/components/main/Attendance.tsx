import { FC } from "react";

type AttendanceProps = {
  id: number,
  name: string,
  progress: number,
}

const Attendance: FC<AttendanceProps> = ({ name, progress, id }) => {
  return (
    <div key={id} className="w-45 h-60 rounded-3xl border-blue-300 border-2 bg-slate text-white mt-2 flex flex-col gap-4 justify-center items-center shadow shadow-gray-400">
      <div className="">
        <h2 className="text-md">{name ? name.slice(0, 14) : null}</h2>
        <h2 className="text-md"> 10 / 25</h2>
      </div>
      <div className={`w-20 h-20 border-7 border-blue-100 border-solid rounded-full flex justify-center items-center`}>
        <span>{progress}%</span>
      </div>
      <div className="text-[10px] pt-6">
        <span className="">Last 24 Hours</span>
      </div>
    </div>
  );
};

export default Attendance;
