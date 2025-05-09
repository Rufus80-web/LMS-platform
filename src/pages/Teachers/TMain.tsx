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
  const {themeMode} = useTheme()
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

  //UI
  return (
    <div
      className={`w-screen min-h-screen pb-[2em] ${
        isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
      } ${themeMode === 'dark' ? 'bg-content-dark' : 'bg-white'}`}
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
              count={rows?.length}
              rowsPerPage={_rowPerPage}
              page={_page}
              onPageChange={changePage}
              onRowsPerPageChange={changeRowPerPage}
              className={`${themeMode === 'light' ? 'bg-indigo-300' : 'bg-indigo-600'}`}
              style={{color: themeMode === "light" ? "black" : "white",}}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
