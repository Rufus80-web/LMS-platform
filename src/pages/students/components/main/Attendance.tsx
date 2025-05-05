import { FC } from "react";

const Attendance: FC = () => {
  return (
    <div className="w-45 h-60 rounded-3xl bg-white text-black mt-2 flex flex-col gap-4 justify-center items-center shadow-2xl shadow-gray-400">
      <div className="text-dark">
        <h2 className="text-xl">Big Data</h2>
        <h2 className="text-2xl">12/14</h2>
      </div>
      <div className="w-20 h-20 border-7 border-blue-500 border-solid rounded-full flex justify-center items-center">
        <span>80%</span>
      </div>
      <div className="text-[10px] pt-6">
        <span className="">Last 24 Hours</span>
      </div>
    </div>
  );
};

export default Attendance;
