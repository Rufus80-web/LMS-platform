import { JSX } from "react";

import { navItems } from "../../../../static/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
import { useTheme } from "../../../../context/ThemeContext";
import { useAppDispatch } from "../../../../Redux/configureStrore";
import { logout } from "../../../../Redux/Slices/AuthSlice";

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

  // const toggleThemeMode = () => {
  //   if (themeMode === "light") {
  //     darkTheme();
  //   } else {
  //     lightTheme();
  //   }
  // };

  return (
    <nav
      className={`w-full z-50 h-[8vh] fixed flex justify-end items-center ${
        themeMode === "dark" ? "bg-sidebar-dark" : "bg-[#f6f6f9]"
      }`}
    >
      <ul className="flex justify-end items-center gap-4 text-[14px] pr-[18em]">
        {navItems?.map((item) => (
          <a
            onClick={() => route(item.url)}
            key={item.id}
            className={`decoration-none text-black hover:cursor-pointer ${
              pathname === item.url &&
              "transition-all  duration-50 animate-pulse h-full w-max text-blue-500 text-[12px] font-bold"
            } hover:text-teal-600`}
          >
            <li className="flex justify-center items-center gap-0">
              <span className="text-dark-varient">{item.icon}</span>
              <span
                className={`${
                  themeMode === "dark" ? "text-slate-50" : "text-dark"
                }`}
              >
                {item.name}
              </span>
            </li>
          </a>
        ))}
        <li>
          {/* <Button
            variant="contained"
            style={{ fontSize: "10px" }}
            onClick={toggleThemeMode}
          >
            {themeMode === 'light' ? 'Light' : 'Dark'}
          </Button> */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
