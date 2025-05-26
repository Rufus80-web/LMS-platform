export interface ThemeModeProps {
  themeMode: "light" | "dark";
  lightTheme: () => void;
  darkTheme: () => void;
}

export interface ThemeContextComponent {
  children: React.ReactNode;
}

export const themeMode: ThemeModeProps = {
  themeMode: "light",
  lightTheme: () => {},
  darkTheme: () => {},
};

interface SliceInitialState {
  username?: string;
  isLoggedIn: boolean;
  redirect?: string;
  redirected?: boolean;
}

export interface AuthSliceProps {
  name: string;
  initState: SliceInitialState;
}

export interface Announcement {
  readonly announId?: string;
  title: string;
  content: string;
  sendOn?: string;
  receivers?: string;
  sender: string;
}

export interface Adminprofile {
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  address: string;
  password?: string;
  newPassword?: string;
  confirm_new_password?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean | null;
  role: string[];
}
