import { TableDataProps } from "./types";
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
  TableRestaurant,
  Lock,
  ExitToApp,
  BookOnline,
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
  Login
} from "@mui/icons-material";

export const navItems = [
  { id: 1, name: "Home", icon: <Dashboard />, url: "/student/dashboard" },
  {
    id: 2,
    name: "Time Table",
    icon: <TableRestaurant />,
    url: "/student/timetable",
  },
  { id: 3, name: "Exams", icon: <BookOnline />, url: "/student/exams" },
  { id: 4, name: "Password", icon: <Lock />, url: "/student/update_pass" },
  { id: 5, name: "Logout", icon: <ExitToApp />, url: "/auths/login" },
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
        children: [{ icon: <Dashboard />, name: "Dashnoard", goto: "dashboard" }],
      },
      {
        id: 2,
        title: "Data",
        children: [
          { icon: <InfoOutline />, name: "Students", goto: "students" },
          {
            icon: <UploadFile />,
            name: "Upload Exercise",
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
          { icon: <TimeToLeaveTwoTone />, name: "Tmetable", goto: "timetable" },
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
      { id: 1, name: <Dashboard />, url: "/admin/dashboard" },
      { id: 2, name: <School />, url: "/admin/manage.teachers" },
      { id: 3, name: <Group />, url: "/admin/manage.students" },
      { id: 4, name: <MenuBook />, url: "/admin/manage-courses" },
      { id: 5, name: <Campaign />, url: "/admin/announcement" },
      { id: 6, name: <AccountCircle />, url: "/admin/profile" },
      { id: 7, name: <Logout />, url: "/auths/login" },
      { id: 8, name: <People />, url: "/admin/users.account" },
      { id: 9, name: <AdminPanelSettings />, url: "/admin/users.role" },
      { id: 10, name: <Login />, url: "/admin/log-info" },
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
  { id: 1, icon: <LightMode />, url: "", name: 'themeMode', },
  { id: 2, icon: <NotificationImportant />, url: "", name:'Notification Icon' },
  { id: 3, icon: <PendingActions />, url: "", name: 'Pending Actions' },
  { id: 4, icon: <Person3 />, url: "", name: 'Person icon' },
];
