import React from "react";

import { useTheme } from "../../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../../context/sidebarContext";
import Navbar from "../../Teachers/components/navbar/Navbar";
import DashHeader from "../../Teachers/components/DashHeader";
import TotalRecord from "./TotalRecord";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Main: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  return (
    <div
      className={`w-screen min-h-screen pb-[2em] select-none ${
        isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
      } ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
    >
      <Navbar />
      <DashHeader title="Dashboard" message="Welcome to your Dashboard" />

      <div className="w-[78.7vw] h-[40vh] flex p-1 justify-evenly gap-1 mt-2 mr-[0.6rem]">
        <TotalRecord title="Total Teachers" count={30} />
        <TotalRecord title="Total Students" count={12} />
        <TotalRecord title="Total Courses" count={21} />
      </div>

      <div className="w-[78.7vw] mt-6">
        <h2
          className={`${
            themeMode === "light" ? "text-black" : "text-white"
          } text-[22px]`}
        >
          Announcement
        </h2>
        <Table className="mt-2">
          <TableHead>
            <TableRow style={{ backgroundColor: "#272829" }}>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
              >
                #
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
              >
                Name
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
              >
                Created By
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}
              >
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              className={`${
                themeMode === "light" ? "bg-[#f2f0f0] " : "bg-white"
              }`}
            >
              <TableCell>1</TableCell>
              <TableCell>
                <Link to="" className="text-blue-400 cursor-pointer">
                  Important Announcement
                </Link>
              </TableCell>
              <TableCell>Administrator</TableCell>
              <TableCell>19-05-2025 13:20:58</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
