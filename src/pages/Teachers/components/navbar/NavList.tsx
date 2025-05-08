import { tNavbarItems } from "../../../../static/utils";

const NavList = () => {
  return (
    <nav>
      <ul className="flex gap-0.5 justify-center items-center">
        {tNavbarItems.map((el) => (
          <li
            key={el.id}
            className="w-8 h-8 rounded-full hover:bg-gray-200 hover:cursor-pointer flex justify-center items-center"
          >
            <span className={`${el.icon} text-gray-400 text-sm`}></span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;
