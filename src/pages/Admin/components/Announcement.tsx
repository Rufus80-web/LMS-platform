import React, { useState } from "react";

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
import { AnnouncementHeaderProps } from "../../../static/types";
import AnnouncementHeader from "./table/AnnouncementHeader";
import DashHeader from "../../Teachers/components/DashHeader";
import AnnouncementTableBody from "./table/AnnouncementTableBody";

const tableData = [
  {
    id: "1",
    title: "Public Holiday",
    description: "Lorem ipsum dolor",
    createdBy: "Administrator",
    date: "2023-12-09",
  },
];

type SidebarType = () => void;

const Announcement: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const [data, _setData] = useState<AnnouncementHeaderProps[]>(tableData);

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

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
                data={data}
                url="/admin/info-announcement"
              />
            </Table>
            <div className="mt-6 border-none flex justify-start gap-3 items-center pb-1">
              <button className="w-8 h-8 bg-sky-400 text-white cursor-pointer">
                <ChevronLeft />
              </button>
              <span className={`${themeMode === 'dark' && 'text-slate-50'}`}>1</span>
              <button className="w-8 h-8 bg-green-400 cursor-pointer text-white">
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
