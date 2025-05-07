import { FC, useState } from "react";

import { Sidebar } from "./TSidebar";
import MainContent from "./TMain";

type SidebarType = () => void;

const TDashboard: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  return (
    <div className="w-screen min-h-screen flex">
      <Sidebar isOpen={isOpenSidebar} handleWidth={handleSidebarWidth} />
      <MainContent />
    </div>
  );
};

export default TDashboard;
