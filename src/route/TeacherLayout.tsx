import {useState, useEffect} from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { ScrollRestoration } from "react-router-dom";


import { Outlet } from "react-router-dom";
import TableContextProdiver from "../context/TableActionContext";

type ThemeMode = 'light' | 'dark'

const TeacherLayout = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const darkTheme = () => {
    setThemeMode('dark')
  }
  const lightTheme = () => {
    setThemeMode('light')
  }
  
  useEffect(() => {
    document.querySelector('html')?.classList.remove('dark', 'light')
    document.querySelector('html')?.classList.add(themeMode)
  }, [themeMode])



  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
        <TableContextProdiver>
          <Outlet />
          <ScrollRestoration />
        </TableContextProdiver>
    </ThemeProvider>
  );
};

export default TeacherLayout;
