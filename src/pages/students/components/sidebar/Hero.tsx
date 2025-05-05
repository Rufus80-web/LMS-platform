import { FC } from "react";
import logo from "../../../../assets/images/logo.png";

const Hero: FC = () => {
  return (
    <div className="flex justify-start items-center gap-5 pl-10">
      <div className="w-10 h-10 rounded-full pt-2">
        <img className="w-full h-full rounded-full" src={logo} alt={logo} />
      </div>
      <div className="flex justify-center items-center text-2xl font-bold">
        <span className="text-dark">L</span>
        <span className="text-red-400">M</span>
        <span className="text-dark">S</span>
      </div>
    </div>
  );
};

export default Hero;
