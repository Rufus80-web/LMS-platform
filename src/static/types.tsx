import { ChangeEvent } from "react";
import { Announcement, studentOfTeacherDataProps } from "./Interface";

type TableSorting = (property: string) => void;

export type TableBodyProps = {
  tableRows: Array<{
    matricule: string;
    email: string;
    isBlock: number;

    id: string;
    _id: string;
    firstname: string;
    lastname: string;
    gender: string;
    contact: string;
  }>;
  page: number;
  rowPerPage: number;
};

export type TableContextProps = {
  _order: "desc" | "asc";
  _orderBy: string;
  _sortedRow: studentOfTeacherDataProps[];
  _page: number;
  _rowPerPage: number;
  sort: TableSorting;
  changePage: (event: any, newPage: number) => void;
  changeRowPerPage: (event: ChangeEvent | any) => void;
};

export type tableRowType = {
  td1: string;
  td2: string;
  td3: string;
  td4: string;
};

export type CustomTableBodyProps = {
  id: string;
  firstname: string;
  email: string;
  address: string;
  course: string[];
  createdAt: string;
};

export type TeacherFormData = {
  readonly id?: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  address: string;
  gender: string;
  roles: string | string[];
  password?: string;
  [index: number]: number;
};

export type Student = TeacherFormData & {
  studClass: string;
  level: string;
  matricule: string;
  course: string;
  [index: number]: number;
};

export type FormData = {
  readonly id?: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  address: string;
  gender: string;
};

export type Users = FormData & {
  password?: string;
  roles: string;
  name: string;
};

export type Course = {
  readonly courseId?: string;
  courseName: string;
  courseCode: string;
  courseInstructor: string;
  courseHours?: string;
  courseProgression?: string;
  createdAt?: string;
};

export type Log = {
  readonly _id?: string;
  description: string;
  createdBy: string;
  createdOn: string;
  createdAt?: string;
};

export type AdminSliceInitState = {
  users: {
    teachers: TeacherFormData[];
    students: TeacherFormData[];
    allUsers: Users[];
    teacherData: Object;
    courses: Course[];
    announcementList: Announcement[];
    logs: Log[];
  };
  isLoading?: boolean;
};

export const Roles = {
  STUDENT: "Student",
  TEACHER: "Teacher",
  ADMIN: "Administrator",
  SUPERADMIN: "SuperAdmin",
};

export type DecodedToken = {
  exp: number;
  iat: number;
  roles: string;
  [key: string]: any;
};

export type Event = {
  _id?: string;
  title: string;
  description: string;
  hasPassed?: boolean;
  datetime?: string;
  room?: string;
  examId: {
    durationMinutes?: string;
    room?: string;
  };
  teacherId?: {
    firstname?: string;
    lastname?: string;
    gender?: string;
  };
};
