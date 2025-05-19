import { TableDataProps } from "./types";
import {
  Home,
  InfoOutline,
  UploadFile,
  PatternSharp,
  TimeToLeaveTwoTone,
  Person,
  ChatSharp,
  MarkUnreadChatAltTwoTone,
  PlusOne,
  TimeToLeave,
  PlusOneSharp,
  TableRestaurant,
  Lock,
  ExitToApp,
  BookOnline,
} from "@mui/icons-material";

export const navItems = [
  { id: 1, name: "Home", icon: <Home />, url: "/student/dashboard" },
  {
    id: 2,
    name: "Time Table",
    icon: <TableRestaurant />,
    url: "/student/timetable",
  },
  { id: 3, name: "Exams", icon: <BookOnline />, url: "/student/exams" },
  { id: 4, name: "Password", icon: <Lock />, url: "/student/update_pass" },
  { id: 5, name: "Logout", icon: <ExitToApp />, url: "/" },
];

export const teacherSidebarItems = {
  closed: {
    icons: [
      { id: 1, name: <Home />, url: "dashboard" },
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
        children: [{ icon: <Home />, name: "Dashnoard", goto: "dashboard" }],
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
      { id: 1, name: <Home />, url: "dashboard" },
      { id: 2, name: <InfoOutline />, url: "students" },
      { id: 3, name: <UploadFile />, url: "upload-exercise" },
    ],
  },
  open: {
    elements: [
      {
        id: 1,
        title: "",
        children: [{ icon: <Home />, name: "Dashnoard", goto: "dashboard" }],
      },
    ],
  },
};



export const tNavbarItems = [
  { id: 1, icon: "fas fa-sun", url: "" },
  { id: 2, icon: "fas fa-info", url: "" },
  { id: 3, icon: "fas fa-pen", url: "" },
  { id: 4, icon: "fas fa-user", url: "" },
];

const createData = (tdata: TableDataProps): TableDataProps => {
  return { ...tdata };
};

export const rows = [
  createData({
    id: 1,
    name: "John Snow",
    age: 35,
    phoneNumber: "(665)121-5890",
    email: "johnsnow@gmail.com",
  }),
  createData({
    id: 2,
    name: "Meka Alice",
    age: 22,
    phoneNumber: "(665)121-5454",
    email: "alicemeka@gmail.com",
  }),
  createData({
    id: 3,
    name: "Wenga Audrey",
    age: 19,
    phoneNumber: "(665)121-3456",
    email: "awoulbesteph@gmail.com",
  }),
  createData({
    id: 4,
    name: "Awoulbe Stephan",
    age: 26,
    phoneNumber: "(665)121-0654",
    email: "johnsnow@gmail.com",
  }),
  createData({
    id: 5,
    name: "Djiane Meganne",
    age: 41,
    phoneNumber: "(665)121-2345",
    email: "djianemegan@gmail.com",
  }),
];
