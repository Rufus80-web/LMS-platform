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