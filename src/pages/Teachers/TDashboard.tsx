import { FC, useState } from "react";

import { Sidebar } from "./TSidebar";
import MainContent from "./TMain";
import { TeacherSidebarContext } from "../../context/TeacherSidebarContext";

type SidebarType = () => void;

const TDashboard: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  return (
    <div className="w-screen min-h-screen flex">
      <TeacherSidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar  />
        <MainContent />
      </TeacherSidebarContext.Provider>
    </div>
  );
};

export default TDashboard;
