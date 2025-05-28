import React, { ChangeEvent, createContext, useContext, useState } from "react";
import { TableContextProps } from "../static/types";
// import { rows } from "../static/utils";

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

  const rows:any = []

  const sortedRows = [...rows].sort((a, b) => {
    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (orderBy === "phoneNumber") {
      return order === "asc"
        ? a.phoneNumber.localeCompare(b.phoneNumber)
        : b.phoneNumber.localeCompare(a.phoneNumber);
    } else {
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    }
  });

  return (
    <TableContext.Provider
      value={{
        _order: order,
        _orderBy: order,
        _sortedRow: sortedRows,
        _page: page,
        _rowPerPage: rowPerPage,
        sort: handleRequestSorting,
        changePage: handlePageChange,
        changeRowPerPage: handleChangeRowPerPage
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableDataContext = () => useContext(TableContext);
export default TableContextProdiver;
