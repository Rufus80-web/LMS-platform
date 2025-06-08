// import { TableDataProps } from "./types";
import {
  InfoOutline,
  UploadFile,
  PatternSharp,
  TimeToLeaveTwoTone,
  ChatSharp,
  MarkUnreadChatAltTwoTone,
  PlusOne,
  TimeToLeave,
  PlusOneSharp,
  ExitToApp,
  Person,
  MenuBook,
  LightMode,
  Logout,
  NotificationImportant,
  Person3,
  PendingActions,
  Dashboard,
  School,
  Group,
  Campaign,
  AccountCircle,
  AdminPanelSettings,
  People,
  Login,
  Schedule,
} from "@mui/icons-material";

export const navItems = [
  { id: 1, name: "Home", icon: '', url: "/student/dashboard" },
  {
    id: 2,
    name: "Time Table",
    icon: '',
    url: "/student/timetable",
  },
  { id: 3, name: "Exams", icon: '', url: "/student/exams" },
  { id: 4, name: "Password", icon: '', url: "/student/update_pass" },
  { id: 5, name: "Logout", icon: <Logout />, url: "/auths/login" },
];

export const teacherSidebarItems = {
  closed: {
    icons: [
      { id: 1, name: <Dashboard />, url: "dashboard" },
      { id: 2, name: <InfoOutline />, url: "students" },
      { id: 3, name: <UploadFile />, url: "upload-exercise" },
      { id: 4, name: <PatternSharp />, url: "student-admission" },
      { id: 5, name: <TimeToLeaveTwoTone />, url: "timetable" },
      { id: 6, name: <TimeToLeave />, url: "class-progress" },
      { id: 7, name: <MarkUnreadChatAltTwoTone />, url: "class-mark" },
      { id: 8, name: <PlusOneSharp />, url: "all-classes" },
    ],
  },
  open: {
    elements: [
      {
        id: 1,
        title: "",
        children: [
          { icon: <Dashboard />, name: "Dashnoard", goto: "dashboard" },
        ],
      },
      {
        id: 2,
        title: "Data",
        children: [
          { icon: <InfoOutline />, name: "Students", goto: "students" },
          {
            icon: <Schedule />,
            name: "Manage Exams",
            goto: "manage-exams",
          },
          {
            icon: <UploadFile />,
            name: "Upload Exam",
            goto: "upload-exercise",
          },
        ],
      },
      {
        id: 3,
        title: "Pages",
        children: [
          {
            icon: <Person />,
            name: "New Admission",
            goto: "student-admission",
          },
          { icon: <Campaign />, name: "Schedule Exam", goto: "timetable" },
        ],
      },
      {
        id: 4,
        title: "Charts",
        children: [
          {
            icon: <ChatSharp />,
            name: "Class Progress",
            goto: "class-progress",
          },
          {
            icon: <MarkUnreadChatAltTwoTone />,
            name: "Class Marks",
            goto: "class-mark",
          },
          { icon: <PlusOne />, name: "All Classes", goto: "all-classes" },
        ],
      },
    ],
  },
};
export const adminSidebar = {
  closed: {
    icons: [
      {
        id: 1,
        name: <Dashboard />,
        url: "/admin/dashboard",
        title: "Dashnoard",
      },
      {
        id: 2,
        name: <School />,
        url: "/admin/manage.teachers",
        title: "Teacher Management",
      },
      {
        id: 3,
        name: <Group />,
        url: "/admin/manage.students",
        title: "Student Management",
      },
      {
        id: 4,
        name: <MenuBook />,
        url: "/admin/manage-courses",
        title: "Course Management",
      },
      {
        id: 5,
        name: <Campaign />,
        url: "/admin/announcement",
        title: "Announcement",
      },
      {
        id: 6,
        name: <AccountCircle />,
        url: "/admin/profile",
        title: "Profile",
      },
      { id: 7, name: <Logout />, url: "/auths/login", title: "Logout" },
      { id: 8, name: <People />, url: "/admin/users.account", title: "Users" },
      {
        id: 9,
        name: <AdminPanelSettings />,
        url: "/admin/users.role",
        title: "Roles",
      },
      { id: 10, name: <Login />, url: "/admin/log-info", title: "Logs" },
    ],
  },
  open: {
    elements: [
      {
        id: 1,
        title: "",
        children: [
          { icon: <Dashboard />, name: "Dashnoard", goto: "/admin/dashboard" },
        ],
      },
      {
        id: 2,
        title: "Data",
        children: [
          {
            icon: <School />,
            name: "Teachers",
            goto: "/admin/manage.teachers",
          },
          {
            icon: <Group />,
            name: "Students",
            goto: "/admin/manage.students",
          },
          {
            icon: <MenuBook />,
            name: "Courses",
            goto: "/admin/manage-courses",
          },
        ],
      },
      {
        id: 3,
        title: "",
        children: [
          {
            icon: <Campaign />,
            name: "Announcements",
            goto: "/admin/announcement",
          },
        ],
      },
      {
        id: 4,
        title: "Administrator",
        children: [
          {
            icon: <AccountCircle />,
            name: "Profile",
            goto: "/admin/profile",
          },
          { icon: <Logout />, name: "Logout", goto: "/auths/login" },
        ],
      },
      {
        id: 5,
        title: "Accounts",
        children: [
          {
            icon: <People />,
            name: "Users",
            goto: "/admin/users.account",
          },
          {
            icon: <AdminPanelSettings />,
            name: "Roles",
            goto: "/admin/users.role",
          },
          { icon: <Login />, name: "Logs", goto: "/admin/log-info" },
        ],
      },
    ],
  },
};

export const tNavbarItems = [
  {
    id: 1,
    icon: <LightMode />,
    url: "",
    name: "themeMode",
    title: "themeMode",
  },
  {
    id: 2,
    icon: <NotificationImportant />,
    url: "",
    name: "Notification Icon",
    title: "Notification",
  },
  {
    id: 3,
    icon: <PendingActions />,
    url: "",
    name: "Pending Actions",
    title: "",
  },
  {
    id: 4,
    icon: <Person3 />,
    url: "/teacher/profile/info",
    name: "Person icon",
    title: "My Profile",
  },
];


