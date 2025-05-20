import React, { useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import IconButton from "./components/IconButton";
import { Print } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

type SidebarType = () => void;

const Logs: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

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
          <DashHeader title="Logs" message="Logs details" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only log data  */}
          <div className="w-full h-max mt-3 rounded-lg border-[#85838336]">
            <div className="w-full p-2 h-max flex justify-between ">
              <IconButton icon={<Print />} name="Print" url="" />
            </div>

            <Table component={Paper} className="w-full p-3">
              <TableHead style={{ backgroundColor: "#272829" }}>
                <TableRow>
                  <TableCell style={{ color: "whitesmoke" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className="hover:bg-indigo-100">
                  <TableCell>
                    Administrator created a recruitment titled 'rresc'
                  </TableCell>
                  <TableCell>2020-09-23</TableCell>
                </TableRow>
              </TableBody>

              <div className="mt-6 border-none flex justify-start gap-3 items-center pb-1">
                <button className="w-8 h-8 bg-sky-400 text-white cursor-pointer">
                  <ChevronLeft />
                </button>
                <span>1</span>
                <button className="w-8 h-8 bg-green-400 cursor-pointer text-white">
                  <ChevronRight />
                </button>
              </div>
            </Table>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Logs;
