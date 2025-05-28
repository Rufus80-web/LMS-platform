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
import { Print, Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Paper, Table } from "@mui/material";
import TableHeader from "./table/TableHeader";
import { useAppDispatch, useAppSelector } from "../../../Redux/configureStrore";
import { courseReducer } from "../../../Redux/Slices/adminSlice";
import CourseTableBody from "./table/CourseTableBody";

type SidebarType = () => void;

const Courses: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const dispatch = useAppDispatch();

  // Get courseArray data from the store
  const {
    users: { courses },
  } = useAppSelector((state) => state.courseArray);

  // Current page of the table
  const [currentPage, setCurrentPage] = useState<number>(1);
  //Number of items to be rendered per page
  const renderPerPage: number = 4;
  // calculating indices for slicing the data array
  const lastIndex: number = currentPage * renderPerPage;
  const firstIndex: number = lastIndex - renderPerPage;
  // Calculate the total number of pages
  const totalPages = Math.ceil(courses?.length / renderPerPage);
  // Finally slice the data into blocks partitions
  const slicedData = courses && courses.slice(firstIndex, lastIndex);

  // Function to move to the next page
  const nextPage = () => {
    setCurrentPage(currentPage === slicedData.length ? 1 : currentPage + 1);
  };

  // Function to move to the previous page
  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  useEffect(() => {
    dispatch(courseReducer());
  }, []);

  // Return UI
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
          <DashHeader title="Course Info" message="All courses information" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-3">
            <div className="w-full p-2 h-max flex justify-between ">
              <IconButton
                icon={<Add />}
                name="Create"
                url="/admin/create-course"
              />
              <IconButton icon={<Print />} name="Print" url="" />
            </div>

            <Table component={Paper} className="w-full p-3 mt-3">
              <TableHeader />
              <CourseTableBody data={slicedData} url="/admin/info-course" />
            </Table>
            <div className="mt-6 border-none flex justify-between gap-3 items-center pb-1">
              <div>
                <button
                  className="w-8 h-8 bg-sky-400 text-white cursor-pointer"
                  onClick={prevPage}
                >
                  <ChevronLeft />
                </button>
                <span className={`${themeMode == "dark" && "text-slate-50"}`}>
                  &nbsp; {currentPage} of {!totalPages ? 1 : totalPages} &nbsp;
                </span>
                <button
                  className="w-8 h-8 bg-green-400 cursor-pointer text-white"
                  onClick={nextPage}
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="text-white text-md">Total: <span>{courses?.length > 0 ? courses?.length : 0}</span></div>
            </div>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Courses;
