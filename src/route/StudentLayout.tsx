import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

type ThemeMode = 'light' | 'dark'


import { ThemeProvider } from "../context/ThemeContext";

const StudentLayout = () => {
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
        <React.Fragment>
          <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
            <Outlet />
            <ScrollRestoration />
          </ThemeProvider>
        </React.Fragment>
    )
}

export default StudentLayout;