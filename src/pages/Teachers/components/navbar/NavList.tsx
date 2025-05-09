import { tNavbarItems } from "../../../../static/utils";
import { useTheme } from "../../../../context/ThemeContext";

const NavList = () => {
  const {themeMode, lightTheme, darkTheme} = useTheme()
  const setThemeMode = (iconName: string) => {
    if(iconName === 'fas fa-sun' && typeof iconName === 'string'){
      if(themeMode === 'dark'){
        lightTheme()
      } else {
        darkTheme()
      }
    }
  }
  return (
    <nav>
      <ul className="flex gap-0.5 justify-center items-center">
        {tNavbarItems.map((el) => (
          <li
            key={el.id}
            className="w-8 h-8 rounded-full hover:bg-gray-200 hover:cursor-pointer flex justify-center items-center"
          >
            <span className={`${el.icon} text-gray-400 text-sm`} onClick={() => setThemeMode(el.icon)}></span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;
