import { tNavbarItems } from "../../../../static/utils";
import { useTheme } from "../../../../context/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const NavList = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const {themeMode, lightTheme, darkTheme} = useTheme()
  const setThemeMode = (iconName: string) => {
    if(iconName === 'themeMode' && typeof iconName === 'string'){
      if(themeMode === 'dark'){
        toast.success('Switched to Light Mode')
        lightTheme()
      } else {
        toast.success('Switched to Dark Mode')
        darkTheme()
      }
    }
  }

  const displayThemeIcon = <T,>({name, icon}: {name: string, icon: T}) => {
    if(name === 'themeMode'){
      if(themeMode === "light"){
        return <LightMode />
      } else {
        return <DarkMode />
      }
    } else {
     return icon
    }
  }
  return (
    <nav>
      <ul className="flex gap-0.5 justify-center items-center">
        {tNavbarItems.map((el) => (
          <li
            key={el.id}
            title={el.title}
            onClick={() => navigate(el.url)}
            className={`w-8 h-8 rounded-full  hover:cursor-pointer flex justify-center items-center ${pathname === el.url && 'animate-pulse text-white bg-black'}`}
          >
            <span className={`text-[grey] text-sm`} onClick={() => setThemeMode(el.name)}>{displayThemeIcon({name: el.name, icon: el.icon})}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;
