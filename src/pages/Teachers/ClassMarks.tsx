import { FC, useState } from "react";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import PieChart from "./components/PieChart";
import { useTheme } from "../../context/ThemeContext";

type SidebarType = () => void;

const ClassMarks: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const { themeMode } = useTheme()

  return (
    <div className="w-screen min-h-screen flex select-none">
      <SidebarContext.Provider
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
            <DashHeader title="Student Records" message="Simple Pie Chart" />
            <div className="flex justify-center items-center">
              <div className={`mt-0 pr-3 w-[500px] h-[500px]`}>
                <PieChart />
              </div>
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default ClassMarks;
