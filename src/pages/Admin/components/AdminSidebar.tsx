import adminImg from "../../../assets/images/profile-3.jpg";
import { useTeacherSidebarContext } from "../../../context/sidebarContext";
import { useTheme } from "../../../context/ThemeContext";

import TeacherProfile from "../../Teachers/components/TeacherProfile";
import AdminSidebarItems from "./AdminSideBarItems";

export const AdminSidebar = () => {
  const { themeMode } = useTheme();
  const { isOpen, shouldOpen } = useTeacherSidebarContext();
  return (
    <div className={`select-none overflow-hidden h-screen flex`}>
      <aside
        className={`${
          isOpen
            ? "duration-300 transition-all ease-linear w-64"
            : "duration-300 transition-all ease-linear w-18"
        } overflow-x-hidden ${
          themeMode === "light"
            ? "bg-[#f2f0f0] text-black"
            : "bg-sidebar-dark text-white"
        }  overflow-y-auto fixed h-screen scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200`}
      >
        {/** Bars icon of sidebar */}
        <div
          className={`w-full p-0 flex ${
            isOpen ? "justify-end" : "justify-center"
          }`}
        >
          <div
            className="w-8 h-8 flex justify-center items-center hover:bg-gray-200 hover:rounded-full hover:cursor-pointer"
            onClick={shouldOpen}
          >
            <span className="fas fa-bars"></span>
          </div>
        </div>

        {/* teacher profile  */}
        {isOpen && <TeacherProfile profile={adminImg} />}

        {/* sidebar navigation pages  */}
        <AdminSidebarItems />
      </aside>
    </div>
  );
};
