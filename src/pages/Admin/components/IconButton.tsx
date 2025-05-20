import React from "react";
import { useNavigate } from "react-router-dom";

type IconButtonProps = {
  icon: React.ReactNode;
  name: string;
  url?: string;
};

const IconButton = ({ icon, name, url }: IconButtonProps) => {
  const navigate = useNavigate();
  return (
    <button className="border-1 border-solid rounded-lg w-60 h-10 flex justify-center items-center gap-1 hover:bg-[#272829] hover:text-white hover:cursor-pointer"
    onClick={() => navigate(`${url}`)}>
      <span className="">{icon}</span>
      <span className="text-[18px]">{name}</span>
    </button>
  );
};

export default IconButton;
