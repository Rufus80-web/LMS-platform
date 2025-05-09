import { FC, useState } from "react";
import {
  TeacherSidebarContext,
  useTeacherSidebarContext,
} from "../../context/TeacherSidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import BarChart from "./components/BarChart";
import { useTheme } from "../../context/ThemeContext";

type SidebarType = () => void;

const ClassProgress: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const { themeMode } = useTheme()

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
            <DashHeader title="Class Progress" message="Simple class data" />
            <div className="flex justify-start">
              <div className={`mt-8 pr-3 h-[65vh] w-full`}>
                <BarChart />
              </div>
            </div>
          </div>
        </div>
      </TeacherSidebarContext.Provider>
    </div>
  );
};

export default ClassProgress;
