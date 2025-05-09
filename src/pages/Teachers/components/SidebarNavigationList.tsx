import { teacherSidebarItems as Items } from "../../../static/utils";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import {Fragment} from 'react'

import { useTeacherSidebarContext } from "../../../context/TeacherSidebarContext";

const SidebarNavigationList = () => {
  const location = useLocation()
  const {themeMode} = useTheme()
  const {isOpen} = useTeacherSidebarContext()


  



  return (
    <div className="w-full pt-4">
        {isOpen ? ( // Displayed if sidebar with is >= 25vw (25%)
          Items?.open.elements?.map((item, index) => (
            <Fragment key={index}>
              <h2 key={index} className="pl-6 text-[14px]">
                {item.title}
              </h2>
              {item?.children?.map((el, i) => (
                <ul key={i} className="list-none flex flex-col gap-x-2">
                  <Link to={`/teacher/${el.goto}`} className="decoration-0 mt-2">
                    <li
                      className={`w-full ml-[1.15em]
                      ${location.pathname === `/teacher/${el.goto}` && themeMode === 'light' && 'bg-gray-300'}
                      ${location.pathname === `/teacher/${el.goto}` && themeMode === 'dark' && 'bg-dark-bg'}
                      cursor-pointer  h-[7vh] flex items-center justify-start pl-7 gap-2 text-[13px]`}
                    >
                      <span>{el.icon}</span>
                      <span>{el.name}</span>
                    </li>
                  </Link>
                </ul>
              ))}
            </Fragment>
          ))
        ) : (
          // Displayed if sidebar width = 6vw (6%)
          <ul className="flex flex-col justify-center items-center gap-0">
            {Items?.closed.icons?.map((item) => (
              <Link
                key={item.id}
                to={`/teacher/${item.url}`}
                className={`w-full ${
                  location.pathname === item.url && "bg-[#0000005e]"
                } p-3 flex justify-center items-center hover:bg-[#0000005e]`}
              >
                <span
                  className={`text-[20px] text-[#7a7a7afb] ${
                    location.pathname === item.url && "text-black"
                  }`}
                >{item.name}</span>
              </Link>
            ))}
          </ul>
        )}
      </div>
  )
}

export default SidebarNavigationList