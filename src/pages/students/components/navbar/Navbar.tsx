import { JSX } from "react";

import { navItems } from "../../../../static/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";
import { useAppDispatch } from "../../../../Redux/configureStrore";
import { logout } from "../../../../Redux/Slices/AuthSlice";
// import { Button } from "@mui/material";

const Navbar = (): JSX.Element => {
  const { pathname } = useLocation();
  const { themeMode } = useTheme();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const route = (url: string) => {
    if (url === "/auths/login" || url === "/") {
      dispatch(logout());
      navigate(url)
    }
    navigate(url)
  };

  /*const toggleThemeMode = () => {
    if (themeMode === "light") {
      darkTheme();
    } else {
      lightTheme();
    }
  };
*/
  return (
    <nav
      className={`w-full z-50 h-[8vh] fixed flex justify-end items-center px-4 py-2 bg-gradient-to-r from-[#111] to-[#082520c5] shadow-sm
         `}
    >
      <ul className="flex justify-end items-center gap-4 text-[14px] pr-[18em]">
        {navItems?.map((item) => (
          <a
            onClick={() => route(item.url)}
            key={item.id}
            className={`decoration-none hover:cursor-pointer ${
              pathname === item.url &&
              "h-full w-max text-[12px] font-bold"
            }`}
          >
            <li className="flex justify-center items-center gap-0">
              <span className="text-[3px]">{item.icon}</span>
              <span
                className={`hover:text-indigo-600 duration-200 transition-all ease-linear hover:translate-x-2 text-white ${
                  themeMode === "dark" ? "text-slate-50" : "text-gray-800"
                }`}
              >
                {item.name}
              </span>
            </li>
          </a>
        ))}
        {/* <li>
          <Button
            variant="contained"
            style={{ fontSize: "10px" }}
            onClick={toggleThemeMode}
          >
            {themeMode === 'light' ? 'Light' : 'Dark'}
          </Button>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
