import { ChangeEvent } from "react";
import { Announcement } from "./Interface";

type TableSorting = (property: string) => void;

export type TableDataProps = {
  // index: number
  id: number;
  name: string;
  age: number;
  phoneNumber: string;
  email: string;
  accessLevel?: HTMLButtonElement;
};

export type TableBodyProps = {
  tableRows: Array<TableDataProps>;
  page: number;
  rowPerPage: number;
};

export type TableContextProps = {
  _order: 'desc' | 'asc',
  _orderBy: string,
  _sortedRow: Array<TableDataProps>,
  _page: number,
  _rowPerPage: number,
  sort: TableSorting
  changePage: (event: any, newPage: number) => void,
  changeRowPerPage: (event: ChangeEvent | any) => void
}

export type tableRowType = {
  td1: string;
  td2: string;
  td3: string;
  td4: string;
};

export type CustomTableBodyProps = {
  id: string,
  firstname: string,
  email: string,
  address: string,
  course: string[],
  createdAt: string
}

export type TeacherFormData = {
  readonly id?: string
  firstname: string,
  lastname: string,
  email: string,
  contact: string,
  address: string,
  gender: string,
  roles: string | string[],
  password?: string,
  [index: number]: number
}

export type FormData = {
  readonly id?: string
  firstname: string,
  lastname: string,
  email: string,
  contact: string,
  address: string,
  gender: string,
}

export type Users = FormData & {
  password?: string,
  roles: string[]
}

export type Course = {
  readonly courseId?: string,
  courseName: string,
  courseCode: string,
  courseInstructor: string,
  courseHours?: string,
  courseProgression?: string,
  createdAt?: string
}

export type Log = {
  description: string,
  createdBy: string,
  createdOn: string
}

export type AdminSliceInitState = {
  users: {
    teachers: TeacherFormData[],
    students: TeacherFormData[],
    allUsers: Users[],
    teacherData: Object,
    courses: Course[],
    announcementList: Announcement[],
    logs: Log[]
  },
  isLoading?: boolean
}
