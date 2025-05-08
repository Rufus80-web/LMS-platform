import { FC, useState } from "react";

import { Sidebar } from "./TSidebar";
import Navbar from "./components/navbar/Navbar";
import {
  TeacherSidebarContext,
  useTeacherSidebarContext,
} from "../../context/TeacherSidebarContext";
import { Paper, Table, TableContainer, TablePagination } from "@mui/material";
import DashHeader from "./components/DashHeader";
import _TableBody from "./components/talble/TableBody";
import _TableHeaders from "./components/talble/TableHeaders";

import { useTableDataContext } from "../../context/TableActionContext";

type SidebarType = () => void;

const StudentList: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };

  const { isOpen } = useTeacherSidebarContext();
  const {
    _order,
    _orderBy,
    _page,
    _rowPerPage,
    _sortedRow,
    sort,
    changePage,
    changeRowPerPage,
  } = useTableDataContext();

  return (
    <div className="w-screen min-h-screen flex select-none">
      <TeacherSidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar />
        <div
          className={`w-screen min-h-screen ${
            isOpen ? "pl-10 pr-3" : "pl-12 pr-3"
          } pb-[2em]`}
        >
          <Navbar />

          <div className="pl-3">
            <DashHeader title="My Students" message="Managing the Students" />
            <div
              className={`mt-8 pr-3`}
            >
              <Paper>
                <TableContainer>
                  <Table>
                    <_TableHeaders
                      order={_order}
                      orderBy={_orderBy}
                      handleSort={sort}
                    />
                    <_TableBody
                      tableRows={_sortedRow}
                      page={_page}
                      rowPerPage={_rowPerPage}
                    />
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[3, 5, 10]}
                  component="div"
                  count={_sortedRow?.length}
                  rowsPerPage={_rowPerPage}
                  page={_page}
                  onPageChange={changePage}
                  onRowsPerPageChange={changeRowPerPage}
                  className="bg-indigo-300"
                />
              </Paper>
            </div>
          </div>
        </div>
      </TeacherSidebarContext.Provider>
    </div>
  );
};

export default StudentList;
