import React , {useState} from 'react'

import { useTheme } from '../../context/ThemeContext';
import { useTeacherSidebarContext } from '../../context/sidebarContext';
import { SidebarContext } from '../../context/sidebarContext';
import { AdminSidebar } from './components/AdminSidebar';
import Navbar from '../Teachers/components/navbar/Navbar';
import DashHeader from '../Teachers/components/DashHeader';


type SidebarType = () => void;

const DisplayTeacherInfo: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  
const [isOpenSidebar, setIsOpenSidebar] = useState(true);
const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
};
  
  return (
    <SidebarContext.Provider value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}>
        <div className="w-screen min-h-screen flex">
        <AdminSidebar />

        <div
          className={`w-screen min-h-screen pb-[2em] select-none ${
            isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
          } ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
        >
          <Navbar />
          <DashHeader title="Teacher 1 Info" message="Information Detail Page" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-3 border-1 border-solid rounded-lg border-[#85838336]">
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

export default DisplayTeacherInfo