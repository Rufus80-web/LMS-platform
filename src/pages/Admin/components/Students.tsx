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
import { Paper, Table } from "@mui/material";
import { ChevronLeft, ChevronRight, Add, Print } from "@mui/icons-material";
import TableBody from "./table/TableBody";
import { useAppDispatch, useAppSelector } from "../../../Redux/configureStrore";
import { studentsReducer } from "../../../Redux/Slices/adminSlice";
import nodataImage from "../../../assets/images/courses/aws.png";
import HeaderTable from "./table/HeaderTable";

type SidebarType = () => void;

const Students: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const dispatch = useAppDispatch();
  const {
    users: { students },
  } = useAppSelector((state: any) => state.students);

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    dispatch(studentsReducer());
  }, [students && students.length]);

  // Current page of the table
  const [currentPage, setCurrentPage] = useState<number>(1);
  //Number of items to be rendered per page
  const renderPerPage: number = 4;
  // calculating indices for slicing the data array
  const lastIndex: number = currentPage * renderPerPage;
  const firstIndex: number = lastIndex - renderPerPage;
  // Calculate the total number of pages
  const totalPages = Math.ceil(students?.length / renderPerPage);
  // Finally slice the data into blocks partitions
  const slicedData = students && students.slice(firstIndex, lastIndex);

  // Function to move to the next page
  const nextPage = () => {
    setCurrentPage(currentPage === slicedData.length ? 1 : currentPage + 1);
  };

  // Function to move to the previous page
  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  // Returning the UI
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
          <DashHeader title="Student Data" message="All student informations" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-3">
            <div className="w-full p-2 h-max flex justify-between ">
              <IconButton
                icon={<Add />}
                name="Create"
                url="/admin/create-student"
              />
              <IconButton icon={<Print />} name="Print" url="" />
            </div>

            {students.length > 0 ? (
              <Table component={Paper} className="w-full p-3">
                <HeaderTable />
                <TableBody data={slicedData} url="/admin/info-student" />
              </Table>
            ) : null}
            {students.length > 0 ? (
              <div className="mt-6 border-none flex justify-between gap-3 items-center pb-1">
                <div>
                  <button
                    className="w-8 h-8 bg-sky-400 text-white cursor-pointer"
                    onClick={prevPage}
                  >
                    <ChevronLeft />
                  </button>
                  <span
                    className={`${themeMode === "dark" && "text-slate-50"}`}
                  >
                    &nbsp; {currentPage} of {totalPages} &nbsp; 
                  </span>
                  <button
                    className="w-8 h-8 bg-green-400 cursor-pointer text-white"
                    onClick={nextPage}
                  >
                    <ChevronRight />
                  </button>
                </div>
                <div className="text-white">Total: {students?.length}</div>
              </div>
            ) : null}

            {!(students.length > 0) && (
              <div className="text-white flex flex-col justift-center items-center gap-2 mt-10">
                <div className="w-40 h-40 rounded-full animate-bounce">
                  <img
                    src={nodataImage}
                    alt="no-data"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-3xl">404</h2>
                  <small>Create one to view student details</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Students;
