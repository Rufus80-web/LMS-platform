import React, { useEffect, useState } from "react";

import { useTheme } from "../../../context/ThemeContext";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../../context/sidebarContext";
import { AdminSidebar } from "./AdminSidebar";
import Navbar from "../../Teachers/components/navbar/Navbar";
import IconButton from "./IconButton";
import { Print, Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Paper, Table } from "@mui/material";
import AnnouncementHeader from "./table/AnnouncementHeader";
import DashHeader from "../../Teachers/components/DashHeader";
import AnnouncementTableBody from "./table/AnnouncementTableBody";
import { useAppDispatch, useAppSelector } from "../../../Redux/configureStrore";
import { announcementReducer } from "../../../Redux/Slices/adminSlice";

type SidebarType = () => void;

const Announcement: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const dispatch = useAppDispatch();
  const {
    users: { announcementList },
  } = useAppSelector((state) => state.announArray);

  // Current page of the table
  const [currentPage, setCurrentPage] = useState<number>(1);
  //Number of items to be rendered per page
  const renderPerPage: number = 1;
  // calculating indices for slicing the data array
  const lastIndex: number = currentPage * renderPerPage;
  const firstIndex: number = lastIndex - renderPerPage;
  // Calculate the total number of pages
  const totalPages = Math.ceil(announcementList?.length / renderPerPage);
  // Finally slice the data into blocks partitions
  const slicedData = announcementList && announcementList.slice(firstIndex, lastIndex);

  // Function to move to the next page
  const nextPage = () => {
    if(currentPage !== totalPages){
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1)
    }
  };

  // Function to move to the previous page
  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  useEffect(() => {
    dispatch(announcementReducer());
  }, []);

  // Return component UI
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
          <DashHeader title="Announcement Data" message="All announcements" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-3">
            <div className="w-full p-2 h-max flex justify-between ">
              <IconButton
                icon={<Add />}
                name="Create"
                url="/admin/create-announcement"
              />
              <IconButton icon={<Print />} name="Print" url="" />
            </div>

            <Table component={Paper} className="w-full p-3">
              <AnnouncementHeader />
              <AnnouncementTableBody
                data={slicedData}
                url="/admin/info-announcement"
              />
            </Table>
            <div className="mt-6 border-none flex justify-start gap-3 items-center pb-1">
              <button className="w-8 h-8 bg-sky-400 animate-pulse text-white cursor-pointer" onClick={prevPage}>
                <ChevronLeft />
              </button>
              <span className={`${themeMode === "dark" && "text-slate-50"}`}>
               &nbsp; {currentPage} of { totalPages } &nbsp;
              </span>
              <button className="w-8 h-8 bg-green-400 cursor-pointer animate-pulse text-white" onClick={nextPage}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Announcement;
