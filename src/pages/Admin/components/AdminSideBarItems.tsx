import { adminSidebar } from "../../../static/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { Fragment } from "react";

import { useTeacherSidebarContext } from "../../../context/sidebarContext";

const AdminSidebarItems = () => {
  const location = useLocation();
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const route = useNavigate();

  const navigateToURL = (url: string) => {
    if (url === "/auths/login") {
      localStorage.removeItem("token");
      // localStorage.removeItem('refreshToken')
      localStorage.removeItem("user-data");
      route(url);
    }
    route(url);
  };

  // Return UI component
  return (
    <div className="w-full pt-4">
      {isOpen ? ( // Displayed if sidebar with is >= 25vw (25%)
        adminSidebar?.open.elements?.map((item, index) => (
          <Fragment key={index}>
            <h2 key={index} className="pl-6 text-[14px]">
              {item.title}
            </h2>
            {item?.children?.map((el, i) => (
              <ul key={i} className="list-none flex flex-col gap-x-2">
                <a
                  onClick={() => navigateToURL(el.goto)}
                  className="decoration-0 mt-2 cursor-pointer"
                >
                  <li
                    className={`w-full ml-[1.15em]
                      ${
                        location.pathname === `${el.goto}` &&
                        themeMode === "light" &&
                        "bg-gray-300"
                      }
                      ${
                        location.pathname === `${el.goto}` &&
                        themeMode === "dark" &&
                        "bg-dark-bg"
                      }
                      cursor-pointer  h-[7vh] flex items-center justify-start pl-7 gap-2 text-[13px]`}
                  >
                    <span>{el.icon}</span>
                    <span>{el.name}</span>
                  </li>
                </a>
              </ul>
            ))}
          </Fragment>
        ))
      ) : (
        // Displayed if sidebar width = 6vw (6%)
        <ul className="flex flex-col justify-center items-center gap-0">
          {adminSidebar?.closed.icons?.map((item) => (
            <a
              key={item.id}
              onClick={() => navigateToURL(item.url)}
              className={`w-full ${
                location.pathname === item.url && "bg-[#fff] animate-pulse"
              } p-3 flex justify-center items-center hover:bg-[#0000005e] cursor-pointer`}
            >
              <span
                className={`text-[20px] text-[#07092cfb] ${
                  location.pathname === item.url && "text-black"
                }`}
              >
                {item.name}
              </span>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminSidebarItems;
