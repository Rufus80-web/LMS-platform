import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

type IconButtonProps = {
  icon: React.ReactNode;
  name: string;
  url?: string;
};

const IconButton = ({ icon, name, url }: IconButtonProps) => {
  const navigate = useNavigate();
  const { themeMode } = useTheme()
  return (
    <button className={`border-1 border-solid rounded-lg w-60 h-10 flex justify-center items-center gap-1 hover:bg-[#272829] hover:text-white hover:cursor-pointer ${themeMode === 'dark' ? 'bg-[#fff8]' : 'bg-transparent'}`}
    onClick={() => navigate(`${url}`)}>
      <span className="">{icon}</span>
      <span className="text-[18px]">{name}</span>
    </button>
  );
};

export default IconButton;
