import { FC, useState } from "react";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";

import ChartComponent from "./components/ChartComponent";
import {Container} from "@mui/material"
import { useTheme } from "../../context/ThemeContext";


type SidebarType = () => void;

const AllClasses: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const { themeMode} = useTheme()

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
            <DashHeader
              title="ALL CLASSES"
              message="Class Competition"
            />
            <div className={`mt-4 pr-3`}>
               <Container maxWidth="lg" sx={{ mt: 5 }}>
                 <ChartComponent />
               </Container>
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default AllClasses;
