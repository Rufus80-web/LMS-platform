import React, {useState} from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { SidebarContext } from "../../context/sidebarContext";

type SidebarType = () => void;

const AdminDashboard: React.FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  return (
    <div className="w-screen min-h-screen flex">
      <SidebarContext.Provider value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}>
        <AdminSidebar />
      </SidebarContext.Provider>
    </div>
  );
};

export default AdminDashboard;
