import {createContext, useContext} from "react"
import { themeMode } from "../static/Interface" 


const AppThemeContext = createContext(themeMode)
export const ThemeProvider =  AppThemeContext.Provider;


export const useTheme = () => {
    return useContext(AppThemeContext)
}
