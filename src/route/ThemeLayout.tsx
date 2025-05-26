import { useState, useEffect } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { ScrollRestoration } from "react-router-dom";

import { Outlet } from "react-router-dom";
import TableContextProdiver from "../context/TableActionContext";

type ThemeMode = "light" | "dark";

const ThemeLayout = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    localStorage.getItem("theme") as ThemeMode
  );
  const darkTheme = () => {
    localStorage.setItem("theme", "dark");
    setThemeMode("dark");
  };
  const lightTheme = () => {
    localStorage.setItem("theme", "light");
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html")?.classList.remove("dark", "light");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <TableContextProdiver>
        <Outlet />
        <ScrollRestoration />
      </TableContextProdiver>
    </ThemeProvider>
  );
};

export default ThemeLayout;
