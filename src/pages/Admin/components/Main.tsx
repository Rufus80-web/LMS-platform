import React, { useEffect } from "react";

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
import { useAppDispatch, useAppSelector } from "../../../Redux/configureStrore";
import {
  studentsReducer,
  fetchTeachersReducer,
  announcementReducer,
  courseReducer,
} from "../../../Redux/Slices/adminSlice";
import { Announcement } from "../../../static/Interface";

export const Main: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const dispatch = useAppDispatch();
  const {
    users: { announcementList },
  } = useAppSelector((state) => state.announArray);
  const {
    users: { teachers },
  } = useAppSelector((state) => state.teachers);
  const {
    users: { students },
  } = useAppSelector((state) => state.students);
  const {
    users: { courses },
  } = useAppSelector((state) => state.courseArray);

  const arrayLength = announcementList && announcementList.length;
  const _8StepBackward = arrayLength - 5;
  const lastFiveAnnouncement =
    announcementList && announcementList.slice(_8StepBackward, arrayLength);


  useEffect(() => {
    dispatch(announcementReducer());
    dispatch(fetchTeachersReducer());
    dispatch(studentsReducer());
    dispatch(courseReducer());
  }, []);

  // Return component UI
  return (
    <div
      className={`w-screen min-h-screen pb-[2em] select-none ${
        isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
      } ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
    >
      <Navbar />
      <DashHeader title="Dashboard" message="Welcome to your Dashboard" />

      <div className="w-[78.7vw] h-[40vh] flex p-1 justify-evenly gap-1 mt-2 mr-[0.6rem]">
        <TotalRecord
          title="Teachers"
          count={teachers.length === 0 ? 0 : teachers.length}
        />
        <TotalRecord
          title="Students"
          count={students.length === 0 ? 0 : students.length}
        />
        <TotalRecord
          title="Courses"
          count={courses.length === 0 ? 0 : courses.length}
        />
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
            {lastFiveAnnouncement.length > 0
              ? lastFiveAnnouncement.map((item: Announcement) => (
                  <TableRow
                    className={`${
                      themeMode === "light" ? "bg-[#f2f0f0] " : "bg-white"
                    }`}
                  >
                    <TableCell>{item.announId?.slice(0, 8)}</TableCell>
                    <TableCell>
                      <Link
                        to="/admin/announcement"
                        className="text-blue-400 cursor-pointer"
                      >
                        {item.title}
                      </Link>
                    </TableCell>
                    <TableCell>{item.sender}</TableCell>
                    <TableCell>
                      {new Date(item.sendOn).toLocaleDateString("en-GS", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
