import { FC } from "react";

import Navbar from "../navbar/Navbar";
import Attendance from "./Attendance";
import Announce_Teacher from "../Announce_Teacher/Announce_Teacher";

const Main: FC = () => {
  return (
    <div className="w-[82vw] min-h-screen absolute right-0 flex flex-col">
      <Navbar />

      {/* Container for attendance-announcements  */}
      <div className="absolute bottom-0 w-[82vw] h-full flex">
        <div className="w-[64vw] h-full flex flex-col">
          <div className="w-full h-[46vh] mt-13 pl-5">
            {/* attendances  */}
            <h2 className="text-2xl ml-[0.5em]">Attendance</h2>
            <div className="w-full grid grid-cols-4">
              <Attendance />
              <Attendance />
            </div>
          </div>

          <div className="w-full h-[46vh] p-2 pl-5">{/* time table  */}
             <h2 className="text-2xl ml-[0.5em] pt-2">Today's Timetable</h2>
             <table className="w-[98%] bg-white mt-4 rounded-xl">
                <thead className="text-center p-14 font-semibold table-header-group">
                    <tr className="table-row">
                        <th>Time</th>
                        <th>RoomNo</th>
                        <th>Subject</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="text-[15px] text-dark-bg">
                    <tr>
                        <td className="text-center">10-11AM</td>
                        <td className="text-center">33-309</td>
                        <td className="text-center">MEC103</td>
                        <td className="text-center">Lecture</td>
                    </tr>
                    <tr>
                        <td className="text-center">10-11AM</td>
                        <td className="text-center">33-309</td>
                        <td className="text-center">MEC103</td>
                        <td className="text-center">Lecture</td>
                    </tr>
                </tbody>
             </table>
          </div>
        </div>
        <Announce_Teacher  />
      </div>
    </div>
  );
};

export default Main;
