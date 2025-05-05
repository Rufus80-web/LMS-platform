import { JSX } from "react";

import { navItems } from "../../../../static/navbarList";
import { Link, useLocation } from "react-router-dom";

const Navbar = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <nav className="w-full z-50 h-[8vh] fixed bg-[#f6f6f9] flex justify-end items-center">
      <ul className="flex justify-end items-center gap-4 text-[14px] pr-[18em]">
        {navItems?.map((item) => (
          <Link
            to={item.type !== "btn" ? { pathname: item?.url } : ""}
            key={item.id}
            className={`decoration-none text-black hover:cursor-pointer ${
              pathname === item.url &&
              "border-blue-300 transition-all  duration-50 animate-pulse border-b-2 h-full w-max bg-gray-400 p-4 text-white text-[13px]"
            }`}
          >
            <li className="flex justify-center items-center gap-1">
              <span className={` ${item.icon} `}></span>
              {item.type === "btn" ? (
                <button className="w-max h-max bg-primary text-gray-100 p-1 cursor-pointer rounded-sm hover:bg-success">
                  {item.name}
                </button>
              ) : (
                <span>{item.name}</span>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
