export interface ThemeModeProps {
    themeMode: 'light' | 'dark',
    lightTheme: () => void
    darkTheme: () => void
}

export interface ThemeContextComponent {
    children: React.ReactNode
}

export const themeMode: ThemeModeProps = {
    themeMode: 'light',
    lightTheme: () => {},
    darkTheme: () => {}
}

interface SliceInitialState {
    username?: string,
    isLoggedIn: boolean,
    redirect?: string,
    redirected?: boolean
}

export interface AuthSliceProps {
    name: string,
    initState: SliceInitialState,
}