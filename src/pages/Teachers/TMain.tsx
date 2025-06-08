import { Table, TableContainer, Paper, TablePagination } from "@mui/material";
import { useTableDataContext } from "../../context/TableActionContext";
import { useTheme } from "../../context/ThemeContext";

import Navbar from "./components/navbar/Navbar";
import DashHeader from "./components/DashHeader";
import BoxUtil from "./components/Box";
import RecordInfo from "./components/Records";
import _TableHeaders from "./components/talble/TableHeaders";
import _TableBody from "./components/talble/TableBody";

// context imports
import { useTeacherSidebarContext } from "../../context/sidebarContext";

// static impaort
// import { rows } from "../../static/utils";

// image imports
import classRoom from "../../assets/images/class2.png";
import money from "../../assets/images/money.png";
import mortarboard from "../../assets/images/mortarboard.png";
import shoppingList from "../../assets/images/shopping-list.png";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import {
  fetchTeacherCourseReducer,
  getExamReducer,
  getStudentCreatedByTeacherReducer,
  getUserId,
} from "../../Redux/Slices/teacherSlice";

const MainContent: React.FC = () => {
  const { isOpen } = useTeacherSidebarContext();
  const { themeMode } = useTheme();
  const dispatch = useAppDispatch();

  // redux store data
  const { course } = useAppSelector((state) => state.course);
  const { studentOfTeacherData } = useAppSelector(
    (state) => state._studentsOfTeacher
  );
  const { exams } = useAppSelector((state) => state.exams);
  const userId = getUserId();
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

  useEffect(() => {
    if (userId) {
      dispatch(fetchTeacherCourseReducer());
      dispatch(getStudentCreatedByTeacherReducer());
      dispatch(getExamReducer());
    }
  }, [userId, dispatch]);

  /**************************************************************************UI UI UI UI UI UI UI UI UI UI ************************************************ */

  //UI
  return (
    <div
      className={`w-screen min-h-screen pb-[2em] ${
        isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
      } ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
    >
      <Navbar />
      <DashHeader title="Dashboard" message="Welcome to your Dashboard" />

      <div className={`grid grid-cols-4 pt-5`}>
        <BoxUtil
          image={classRoom}
          total={studentOfTeacherData ? studentOfTeacherData.length : 0}
          title="Total Students"
        />
        <BoxUtil
          image={mortarboard}
          title="Total Courses"
          total={course ? course.length : 0}
        />
        <BoxUtil
          image={shoppingList}
          title="Total Scheduled Exams"
          total={exams ? exams.length : 0}
        />
        <BoxUtil image={money} title="Class Rooms" total={10} />
      </div>

      <RecordInfo />
      <div className="pl-3">
        <DashHeader title="My Students" message="Managing the Students" />
        <div
          className={`${
            isOpen ? "w-[1030px]" : "w-[1200px]"
          } rounded-3xl mt-10`}
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
              count={[]?.length}
              rowsPerPage={_rowPerPage}
              page={_page}
              onPageChange={changePage}
              onRowsPerPageChange={changeRowPerPage}
              className={`${
                themeMode === "light" ? "bg-indigo-300" : "bg-indigo-600"
              }`}
              style={{ color: themeMode === "light" ? "black" : "white" }}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
