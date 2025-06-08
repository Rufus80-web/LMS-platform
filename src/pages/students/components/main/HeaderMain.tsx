import { useTheme } from "../../../../context/ThemeContext";

type HeaderProps = {
  title: string;
};

const HeaderMain = ({ title }: HeaderProps) => {
  const { themeMode } = useTheme();
  return (
    <h2
      className={`text-2xl ml-[0.5em] text-white ${
        themeMode === "light" ? "text-dark" : "text-white"
      }`}
    >
      {title}
    </h2>
  );
};

export default HeaderMain;
