import { FC, useState } from "react";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import CalendarPlanner from "./components/CalendarPlanner";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


type SidebarType = () => void;

const TimeTableTeacher: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    // console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const {themeMode} = useTheme()

  return (
    <div className="w-screen min-h-screen flex select-none">
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar />
        <div
          className={`w-screen min-h-screen ${
            isOpen ? "pl-14 pr-3" : "pl-8 pr-3"
          } pb-[2em] ${themeMode === 'dark' ? 'bg-content-dark' : 'bg-white'}`}
        >
          <Navbar />

          <div className="pl-0">
            <DashHeader
              title="Timetable"
              message="Full calendar interactive page"
            />
            <section className="flex justify-end pr-7">
              <Link to="/teacher/event-management">
                <Button variant="contained" className="animate-pulse">View Events</Button>
              </Link>
            </section>
            <div className={`ml-[-1em] pr-3 `} style={{color: themeMode === "light" ? "black" : "#d4d0d08c",}}>
              <CalendarPlanner />
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default TimeTableTeacher;
