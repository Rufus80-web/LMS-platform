import React, { ChangeEvent, useState } from "react";
import { Table, TableContainer, Paper, TablePagination } from "@mui/material";

import Navbar from "./components/navbar/Navbar";
import DashHeader from "./components/DashHeader";
import BoxUtil from "./components/Box";
import RecordInfo from "./components/Records";
import _TableHeaders from "./components/talble/TableHeaders";
import _TableBody from "./components/talble/TableBody";

// context imports
import { useTeacherSidebarContext } from "../../context/TeacherSidebarContext";
// static impaort
import { rows } from "../../static/utils";

// image imports
import classRoom from "../../assets/images/class2.png";
import money from "../../assets/images/money.png";
import mortarboard from "../../assets/images/mortarboard.png";
import shoppingList from "../../assets/images/shopping-list.png";


const MainContent: React.FC = () => {
  const { isOpen } = useTeacherSidebarContext();
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
  const handlePageChange = (event, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (event: ChangeEvent | any) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } if (orderBy === "phoneNumber") {
      return order === "asc"
        ? a.phoneNumber.localeCompare(b.phoneNumber)
        : b.phoneNumber.localeCompare(a.phoneNumber);
    } else {
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    }
  });

  //UI
  return (
    <div
      className={`w-screen min-h-screen ${
        isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
      } pb-[2em]`}
    >
      <Navbar />
      <DashHeader title="Dashboard" message="Welcome to your Dashboard" />

      <div className={`grid grid-cols-4 pt-5`}>
        <BoxUtil image={classRoom} />
        <BoxUtil image={mortarboard} />
        <BoxUtil image={shoppingList} />
        <BoxUtil image={money} />
      </div>

      <RecordInfo />
      <div className="pl-3">
        <DashHeader title="My Students" message="Managing the Students" />
        <div
          className={`${
            isOpen ? "w-[1030px]" : "w-[1200px]"
          } rounded-3xl shadow-2xl shadow-gray-300 mt-10`}
        >
          <Paper>
            <TableContainer>
              <Table>
                <_TableHeaders
                  order={order}
                  orderBy={orderBy}
                  handleSort={handleRequestSorting}
                />
                <_TableBody
                  tableRows={sortedRows}
                  page={page}
                  rowPerPage={rowPerPage}
                />
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]}
              component="div"
              count={rows?.length}
              rowsPerPage={rowPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowPerPage}
              className="bg-indigo-300"
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
