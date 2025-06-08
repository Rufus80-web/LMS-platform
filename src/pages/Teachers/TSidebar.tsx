import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { useTheme } from "../../context/ThemeContext";

import TeacherProfile from "./components/TeacherProfile";
import SidebarNavigationList from "./components/SidebarNavigationList";
import { PROFILE_URL, DEFAULT_PROFILE_URL } from "../../services/server-urls";

type TeacherNameRole = {
  name: string;
  role: string;
  profile: string;
  [index: string]: string;
};

function getTeacherNameAndRole(): TeacherNameRole {
  try {
    let localData = localStorage.getItem("user-data") || null;
    let result: TeacherNameRole = {
      name: "",
      role: "",
      profile: "",
    };

    if (!localData) {
      console.error("Could not retrieve user data from localstorage");
      return result;
    } else {
      const parseDate = JSON.parse(localData)["user"];
      result["name"] = parseDate["firstname"] + " " + parseDate["lastname"];
      result["role"] = parseDate["roles"];
      result["profile"] = parseDate["profile"];
      return result;
    }
  } catch (error) {
    console.error(error);
  }
  return { name: "", role: "", profile: "" };
}

export const Sidebar = () => {
  const { isOpen } = useTeacherSidebarContext();
  const { themeMode } = useTheme();
  return (
    <div
      className={`select-none overflow-hidden h-screen flex  ${
        isOpen
          ? "duration-300 transition-all ease-linear w-64"
          : "duration-300 transition-all ease-linear w-12"
      }`}
    >
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
          {/* <div
            className="w-8 h-8 flex justify-center items-center hover:bg-gray-200 hover:rounded-full hover:cursor-pointer"
            onClick={shouldOpen}
          >
            <span className="fas fa-bars"></span>
          </div> */}
        </div>

        {/* teacher profile  */}
        {isOpen && (
          <TeacherProfile
            profile={
              !getTeacherNameAndRole()["profile"]
                ? DEFAULT_PROFILE_URL
                : PROFILE_URL + "/" + getTeacherNameAndRole()["profile"]
            }
            name={getTeacherNameAndRole()["name"]}
            role={getTeacherNameAndRole()["role"]}
          />
        )}

        {/* sidebar navigation pages  */}
        <SidebarNavigationList />
      </aside>
    </div>
  );
};
