import { FC } from "react";
import { Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { useTheme } from "../../../../context/ThemeContext";

import Navbar from "../navbar/Navbar";
import Attendance from "./Attendance";
import Announce_Teacher from "../Announce_Teacher/Announce_Teacher";
import HeaderMain from "./HeaderMain";

const Main: FC = () => {
  const {themeMode} = useTheme()
  return (
    <div className={`w-[82vw] min-h-screen absolute right-0 flex flex-col ${themeMode === 'dark' ? 'bg-sidebar-dark' : 'bg-[#f6f6f9]'}`}>
      <Navbar />

      {/* Container for attendance-announcements  */}
      <div className="absolute bottom-0 w-[82vw] h-full flex">
        <div className="w-[64vw] h-full flex flex-col">
          <div className="w-full h-[46vh] mt-13 pl-5">
            {/* attendances  */}
            <HeaderMain title="Attendance" />
            <div className="w-full grid grid-cols-4">
              <Attendance />
              <Attendance />
            </div>
          </div>

          <div className="w-full h-[46vh] p-2 pl-5">{/* time table  */}
             <HeaderMain title="Today's Timetable" />
             <div>
             <Table className="w-[98%] bg-white mt-4 rounded-xl">
                <TableHead className="text-center p-14 font-semibold table-header-group">
                    <TableRow className="table-row">
                        <TableCell>Time</TableCell>
                        <TableCell>RoomNo</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="text-[15px] text-dark-bg">
                    <TableRow>
                        <TableCell className="text-center">10-11AM</TableCell>
                        <TableCell className="text-center">33-309</TableCell>
                        <TableCell className="text-center">MEC103</TableCell>
                        <TableCell className="text-center">Lecture</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="text-center">10-11AM</TableCell>
                        <TableCell className="text-center">33-309</TableCell>
                        <TableCell className="text-center">MEC103</TableCell>
                        <TableCell className="text-center">Lecture</TableCell>
                    </TableRow>
                </TableBody>
             </Table>
             </div>
          </div>
        </div>
        <Announce_Teacher  />
      </div>
    </div>
  );
};

export default Main;
