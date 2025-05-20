import React, { useState } from "react";

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
import TableHeader from "./table/TableHeader";
import TableBody from "./table/TableBody";
import { CustomTableBodyProps } from "../../../static/types";

const tableData = [
  {
    id: "1",
    name: "Student 1",
    email: "student1@gmail.com",
    address: "Nkoabang",
    course: ["Merisse"],
    date: "2023-06-09",
  },
];

type SidebarType = () => void;

const Students: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const [data, _setData] = useState<CustomTableBodyProps[]>(tableData);

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

            <Table component={Paper} className="w-full p-3">
              <TableHeader />
              <TableBody data={data} url="/admin/info-student" />
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

export default Students;
