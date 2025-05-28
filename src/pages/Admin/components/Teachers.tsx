import React, { useEffect, useState } from "react";

import { useTheme } from "../../../context/ThemeContext";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../../context/sidebarContext";
import { AdminSidebar } from "./AdminSidebar";
import Navbar from "../../Teachers/components/navbar/Navbar";
import DashHeader from "../../Teachers/components/DashHeader";
import IconButton from "./IconButton";
import { ChevronRight, ChevronLeft, Print, Add } from "@mui/icons-material";
import { Paper, Table } from "@mui/material";
import TableBody from "./table/TableBody";
import { useAppDispatch, useAppSelector } from "../../../Redux/configureStrore";
import { fetchTeachersReducer } from "../../../Redux/Slices/adminSlice";
import HeaderTable from "./table/HeaderTable";

type SidebarType = () => void;

const Teachers: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  // const [data, _setData] = useState<CustomTableBodyProps[]>(tableData);

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  // Get users's data from redux store
  const dispatch = useAppDispatch();
  const {
    users: { teachers },
  } = useAppSelector((state: any) => state.teachers);
  // Current page of the table
  const [currentPage, setCurrentPage] = useState<number>(1);
  //Number of items to be rendered per page
  const renderPerPage: number = 4;
  // calculating indices for slicing the data array
  const lastIndex: number = currentPage * renderPerPage;
  const firstIndex: number = lastIndex - renderPerPage;
  // Calculate the total number of pages
  const totalPages = Math.ceil(teachers?.length / renderPerPage);
  // Finally slice the data into blocks partitions
  const slicedData = teachers && teachers.slice(firstIndex, lastIndex);

  // Function to move to the next page
  const nextPage = () => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
  };

  // Function to move to the previous page
  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  useEffect(() => {
    dispatch(fetchTeachersReducer());
  }, [teachers?.length]);

  // Return UI component
  return (
    <SidebarContext.Provider
      value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
    >
      <div className="w-screen min-h-screen flex">
        <AdminSidebar />

        <div
          className={`w-screen min-h-screen pb-[2em] select-none ${
            isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
          } ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
        >
          <Navbar />
          <DashHeader
            title="Teacher Data"
            message="All teacher's information"
          />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <main
            className={`w-full mt-3 ${
              themeMode === "light" ? "bg-transparent" : "bg-[#141b2d]"
            }`}
          >
            <div className={`w-full p-2 h-max flex justify-between `}>
              <IconButton
                icon={<Add />}
                name="Create"
                url="/admin/create-teacher"
              />
              <IconButton icon={<Print />} name="Print" url="" />
            </div>

            <Table component={Paper} className="w-full p-3 mt-3">
              <HeaderTable />
              <TableBody data={slicedData} url="/admin/info-teacher" />
            </Table>
            <div className="mt-6 border-none flex justify-start gap-3 items-center pb-1">
              <button
                className="w-8 h-8 bg-sky-400 text-white cursor-pointer"
                onClick={prevPage}
              >
                <ChevronLeft />
              </button>
              <span className={`${themeMode === "dark" && "text-white"}`}>
                {currentPage} of {totalPages}
              </span>
              <button
                className="w-8 h-8 bg-green-400 cursor-pointer text-white"
                onClick={nextPage}
              >
                <ChevronRight />
              </button>
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Teachers;
