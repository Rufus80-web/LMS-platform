import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { useTheme } from "../../context/ThemeContext";
import { Paper, Table } from "@mui/material";
import HeaderTable from "./components/table/HeaderTable";
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import { studentSubmissionReducer } from "../../Redux/Slices/studentSlice";
import { useLocation } from "react-router-dom";
import HeaderBody from "./components/table/HeaderBody";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const TimeTable: React.FC = () => {
  const { themeMode } = useTheme();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { studSubmissions } = useAppSelector(
    (state) => state.studentSubmission
  );

  const [currentIndex, setCurrentIndex] = useState(1);
  const renders = 10;
  const final = currentIndex * renders;
  const initial = final - renders;
  const sliceSubmission = studSubmissions.slice(initial, final);
  const pages = Math.ceil(studSubmissions.length / renders);

  const nextPage = () => {
    setCurrentIndex(currentIndex === pages ? 1 : currentIndex + 1);
  };

  const prevPage = () => {
    setCurrentIndex(currentIndex === 1 ? pages : currentIndex - 1);
  };

  useEffect(() => {
    dispatch(studentSubmissionReducer());
  }, [location.pathname]);

  return (
    <div
      className={`w-screen min-h-screen select-none bg-gradient-to-b from-[#111] to-[#071e1ac5] ${
        themeMode === "light" ? "bg-[#f6f6f9]" : "bg-sidebar-dark"
      }`}
    >
      {/* sidebar section  */}
      <Sidebar />

      {/* Deside the sidebar  */}
      <div className="w-[82vw] min-h-screen absolute right-0 flex flex-col">
        {/* Navbar section  */}
        <Navbar />

        {/* Time's table content  */}
        <div className="w-[80vw] h-full pl-3 pt-[4em]">
          <Table component={Paper}>
            <HeaderTable
              headers={[
                "#",
                "Exam Title",
                "Course",
                "Score / 20",
                "Submission Date",
                "Details",
              ]}
            />

            <HeaderBody data={sliceSubmission} />
          </Table>
          <div className="w-[79.2vw] h-12 text-slate-50 bg-[#49494912] mt-2 flex justify-between items-center px-4">
            <div>Total: {studSubmissions.length}</div>
            <div className="flex justify-center items-center gap-1.5">
              <span className="text-4xl cursor-pointer" onClick={prevPage}>
                <ChevronLeft />
              </span>
              <span className="text-4xl cursor-pointer" onClick={nextPage}>
                <ChevronRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;

/**
 *  <div className="flex items-center justify-center gap-40">
            <ArrowNav name="backward" icon={<ArrowBack />} />
            <TableHeading header="Today's Timetable" />
            <ArrowNav name="foward" icon={<ArrowForward />} />
          </div>

          {/* timetable  
          <div className="overflow-x-auto rounded-2xl w-[60vw]">
            <Table className="w-full table-auto">
              <TableHeader th1="Time" th2="Room No." th3="Course" />
              {/* On fetch API will return an array and we will change the prop value  
              <TableBody
                data={TableRows}
                render={(data, index) => <TableRow item={data} key={index} />}
              />
            </Table>
          </div>
 */
