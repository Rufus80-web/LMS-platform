import Seachbar from "./Seachbar";
import NavList from "./NavList";

const Navbar = () => {
  return (
    <div className="w-full h-[8vh] flex justify-between items-center pr-3">
      <Seachbar />
      <NavList />
    </div>
  );
};

export default Navbar;
