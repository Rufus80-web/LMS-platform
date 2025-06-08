import React, {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TableContextProps } from "../static/types";
// import { rows } from "../static/utils";

import { useAppDispatch, useAppSelector } from "../Redux/configureStrore";
import {
  getStudentCreatedByTeacherReducer,
} from "../Redux/Slices/teacherSlice";
import { useLocation } from "react-router-dom";

const tableDataProps: TableContextProps = {
  _order: "asc",
  _orderBy: "name",
  _sortedRow: [],
  _page: 0,
  _rowPerPage: 3,
  sort: () => {},
  changePage: () => {},
  changeRowPerPage: () => {},
};

type TableChildrenProps = {
  children: React.ReactNode;
};

export const TableContext = createContext(tableDataProps);

const TableContextProdiver = ({ children }: TableChildrenProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc"); // default sorting order
  const [orderBy, setOrderBy] = useState<string>("name");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(3);
  const dispatch = useAppDispatch();

  // Getting data from store and passing it to student TableContexProvider found in LayOut
  const { studentOfTeacherData } = useAppSelector(
    (state) => state._studentsOfTeacher
  );
  const location = useLocation()
  // console.log(studentOfTeacherData);

  //Initiating getStudentCreatedByTeacherReducer reducer action from reduxSlice
  useEffect(() => {
    dispatch(getStudentCreatedByTeacherReducer());
  }, [location.pathname, dispatch]);

  type TableSorting = (property: string) => void;

  //Handling the sorting functionality
  const handleRequestSorting: TableSorting = (
    property
  ): ReturnType<TableSorting> => {
    const isAsc: boolean = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //handle page change
  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (event: ChangeEvent | any) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /*const sortedRows = studentOfTeacherData.sort((a, b) => {
    if (orderBy === "name") {
      return order === "asc"
        ? a.firstname.localeCompare(b.firstname)
        : b.firstname.localeCompare(a.firstname);
    }
    if (orderBy === "Phone Number") {
      return order === "asc"
        ? a.contact.localeCompare(b.contact)
        : b.contact.localeCompare(a.contact);
    } else {
      return order === "asc"
        ? a['age'] - b['age']
        : b['age'] - a['age'];
    }
  }); */

  return (
    <TableContext.Provider
      value={{
        _order: order,
        _orderBy: order,
        _sortedRow: studentOfTeacherData,
        _page: page,
        _rowPerPage: rowPerPage,
        sort: handleRequestSorting,
        changePage: handlePageChange,
        changeRowPerPage: handleChangeRowPerPage,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableDataContext = () => useContext(TableContext);
export default TableContextProdiver;
