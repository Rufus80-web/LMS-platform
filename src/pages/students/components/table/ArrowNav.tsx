import { ReactElement, ReactNode } from "react";

type ArrowNavProps = {
  icon: ReactElement;
  name?: string;
};

const ArrowNav = ({ icon, name }: ArrowNavProps): ReactNode => {
  return (
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:cursor-pointer hover:transform hover:scale-90 duration-100 ease-in">
       <span title={name} className={`text-sm`}>{icon} </span>
    </div>
  )
};

export default ArrowNav;
