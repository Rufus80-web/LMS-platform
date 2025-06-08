export type Gender = "Male" | "Female";

// Interface to handle themeMode in the application
export interface ThemeModeProps {
  themeMode: string; // "light" | "dark"
  lightTheme: () => void;
  darkTheme: () => void;
}

// Interface to return all children passed to the ThemeContectProvider component
export interface ThemeContextComponent {
  children: React.ReactNode;
}

//Instantiating a ThemeModeprops object for the createContext() function
export const themeMode: ThemeModeProps = {
  themeMode: localStorage.getItem("theme") as string ,
  lightTheme: () => {},
  darkTheme: () => {},
};

// This interface is used to create an authRedux initStateUserObject
export interface AuthUser {
  readonly id?: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  gender: "Male" | "Female" | null;
  role: "Student" | "Teacher" | "Administrator";
}

// interface to instantiate an authSlice state Object
export interface AuthSliceProps {
  token: string | null;
  user: AuthUser | null;
  isLoggedIn: boolean;
}

// Interface for creating an announcement
export interface Announcement {
  readonly announId?: string;
  title: string;
  content: string;
  sendOn?: string;
  receivers?: string;
  sender: string;
}

// Interface for Admin profile update page
export interface Adminprofile {
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  address: string;
  profile: string,
  password?: string;
  newPassword?: string;
  confirm_new_password?: string;
}

//Interface of a user object for HTTP POST Method by Admin
export interface User {
  id: string;
  name?: string;
  email?: string;
  isActive: boolean;
  roles: string;
  isSuperUser?: string;
}

// Interface for partial reteieval of user's data to perform user's-role UPDATE HTTP Method by Admin
export interface SemiUser {
  name: string;
  isSuperUser?: string;
  roles: string;
}

// Interface to send user form data on Login
export interface Credentials {
  email: string;
  password: string;
}

// 
export interface studentOfTeacherDataProps {
  readonly id: string;
  firstname: string;
  lastname: string;
  age?: number;
  contact: string;
  email: string;
  roles: string;
  isBlock: number
  [index: number]: number;
}


export interface GradedExercise {
  examId: string,
  examTitle: string;
  examTime: string,
  examDate: string,
  type: "mcq" | "programming";
  durationMinutes: number;
  exercises: any[];
  dateOfExam?: Date;
}

export interface ExamProps{
  examId: string,
  examTitle: string;
  durationMinutes: number;
  exercises: any[];
  examhasPassed: boolean;
  teacherId: string,
  room: string,
  course: string,
  _id?: string,
  datetime: string
}