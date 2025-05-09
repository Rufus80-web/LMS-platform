import { FC, useState } from "react";
import {
  TeacherSidebarContext,
  useTeacherSidebarContext,
} from "../../context/TeacherSidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import CalendarPlanner from "./components/CalendarPlanner";
import { useTheme } from "../../context/ThemeContext";


type SidebarType = () => void;

const TimeTableTeacher: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const {themeMode} = useTheme()

  return (
    <div className="w-screen min-h-screen flex select-none">
      <TeacherSidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar />
        <div
          className={`w-screen min-h-screen ${
            isOpen ? "pl-14 pr-3" : "pl-12 pr-3"
          } pb-[2em] ${themeMode === 'dark' ? 'bg-content-dark' : 'bg-white'}`}
        >
          <Navbar />

          <div className="pl-1">
            <DashHeader
              title="Timetable"
              message="Full calendar interactive page"
            />
            <div className={`mt-8 pr-3`} style={{color: themeMode === "light" ? "black" : "#d4d0d08c",}}>
              <CalendarPlanner />
            </div>
          </div>
        </div>
      </TeacherSidebarContext.Provider>
    </div>
  );
};

export default TimeTableTeacher;
