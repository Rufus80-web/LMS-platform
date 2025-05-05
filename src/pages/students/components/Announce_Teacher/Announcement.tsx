import { FC } from "react";

const Announcement: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="break-words">
        <span className="font-light text-xl">Academic: </span>
        <span className="text-[#1d1b1b9d] text-[13px]">
          Summer training inter Live Project
        </span>
      </div>
      <div>
        <span className="text-[10px]">4 minutes ago</span>
      </div>
    </div>
  );
};

export default Announcement;
