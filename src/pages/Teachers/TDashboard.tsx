import { FC, useState } from "react";

import { Sidebar } from "./TSidebar";
import MainContent from "./TMain";
import { SidebarContext } from "../../context/sidebarContext";

type SidebarType = () => void;

const TDashboard: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  return (
    <div className="w-screen min-h-screen flex">
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar  />
        <MainContent
        />
      </SidebarContext.Provider>
    </div>
  );
};

export default TDashboard;
