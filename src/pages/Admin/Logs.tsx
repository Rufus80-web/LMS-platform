import React, { useEffect, useState } from "react";

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
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import { logReducer } from "../../Redux/Slices/adminSlice";
import { Log } from "../../static/types";

type SidebarType = () => void;

const Logs: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const dispatch = useAppDispatch();
  // Get logs' data from redux store
  const {
    users: { logs },
  } = useAppSelector((state) => state.logs);

  useEffect(() => {
    dispatch(logReducer());
  }, []);

  const formatDate = (date: string): string => {
    const formatted: string = new Date(date).toISOString().split("T")[0];
    return formatted;
  };

  const formatTime = (date: string): string => {
    const time: string = new Date(date)
      .toISOString()
      .split("T")[1]
      .split(".")[0];
    return time;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  //Number of items to be rendered per page
  const renderPerPage: number = 10;
  // calculating indices for slicing the data array
  const lastIndex: number = currentPage * renderPerPage;
  const firstIndex: number = lastIndex - renderPerPage;
  // Calculate the total number of pages
  const totalPages = Math.ceil(logs?.length / renderPerPage);
  // Finally slice the data into blocks partitions
  const slicedData = logs && logs.slice(firstIndex, lastIndex);

  // Function to move to the next page
  const nextPage = () => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
  };

  // Function to move to the previous page
  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

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
          <DashHeader title="Logs" message="Logs details" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only log data  */}
          <div className="w-full h-max mt-3 rounded-lg border-[#85838336]">
            <div className="w-full p-2 h-max flex justify-between ">
              <IconButton icon={<Print />} name="Print" url="" />
            </div>

            <Table component={Paper} className="w-full p-3 mt-2">
              <TableHead style={{ backgroundColor: "#272829" }}>
                <TableRow>
                  <TableCell style={{ color: "whitesmoke" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>Time</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>Date</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>Actor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedData.map((log: Log) => {
                  return (
                    <TableRow
                      key={log._id}
                      style={{
                        backgroundColor:
                          themeMode === "light" ? "transparent" : "#141b2d",
                      }}
                    >
                      <TableCell
                        style={{
                          color: themeMode === "light" ? "#00000083" : "#adabab78",
                        }}
                      >
                        {log.description}
                      </TableCell>
                      <TableCell
                        style={{
                          color: themeMode === "light" ? "#00000083" : "#adabab78",
                        }}
                      >
                        {formatTime(log.createdAt as string)}
                      </TableCell>
                      <TableCell
                        style={{
                          color: themeMode === "light" ? "#00000083" : "#adabab78",
                        }}
                      >
                        {formatDate(log.createdAt as string)}
                      </TableCell>
                      <TableCell
                        style={{
                          color: themeMode === "light" ? "#00000083" : "#adabab78",
                        }}
                      >
                        {log.createdBy}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="mt-6 border-none flex justify-between gap-3 items-center pb-1">
              <div>
                <button
                  className="w-8 h-8 bg-sky-400 text-white animate-pulse cursor-pointer"
                  onClick={prevPage}
                >
                  <ChevronLeft />
                </button>
                <span className={`${themeMode === "dark" && "text-slate-50"}`}>
                  &nbsp; {currentPage} of {totalPages} &nbsp;
                </span>
                <button
                  className="w-8 h-8 bg-green-400 cursor-pointer animate-pulse text-white"
                  onClick={nextPage}
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="text-white text-md pr-4 flex gap-2">
                <h1>P{currentPage}-{slicedData.length}</h1>
                <h1>Total: {!logs ? 0 : logs.length}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Logs;
