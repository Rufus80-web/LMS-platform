import { useTeacherSidebarContext } from "../../context/TeacherSidebarContext";

import teacher2 from "../../assets/images/profile-2.jpeg";

import TeacherProfile from "./components/TeacherProfile";
import SidebarNavigationList from "./components/SidebarNavigationList";


export const Sidebar = () => {
  const {isOpen, shouldOpen} = useTeacherSidebarContext()
  return (
    <div
      className={`select-none overflow-hidden h-screen flex  ${
        isOpen
          ? "duration-300 transition-all ease-linear w-64"
          : "duration-300 transition-all ease-linear w-12"
      }`}
    >
      <aside className={`${
        isOpen
          ? "duration-300 transition-all ease-linear w-64"
          : "duration-300 transition-all ease-linear w-18"
      } overflow-x-hidden bg-[#f2f0f0]  overflow-y-auto fixed h-screen`}>
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
      {isOpen && <TeacherProfile profile={teacher2} />}

      {/* sidebar navigation pages  */}
      <SidebarNavigationList  />
      </aside>
    </div>
  );
};
