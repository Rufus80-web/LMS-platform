import { FC, useEffect, useState } from "react";
import { ButtonGroup, Button } from "@mui/material";
import { useTheme } from "../../../../context/ThemeContext";

import Navbar from "../navbar/Navbar";
import Attendance from "./Attendance";
import Announce_Teacher from "../Announce_Teacher/Announce_Teacher";
import HeaderMain from "./HeaderMain";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Redux/configureStrore";
import {
  getInstructorReducer,
  getScheduledExamReducer,
  getStudentAttendanceReducer,
} from "../../../../Redux/Slices/studentSlice";
import { useLocation } from "react-router-dom";
import EventTabble from "../EventTabble";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Main: FC = () => {
  // debugger
  const { themeMode } = useTheme();
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Redux store data
  const { attendances } = useAppSelector((state) => state.attendance);
  const { examInfo } = useAppSelector((state) => state.studentExamInfo);
  const { instructors } = useAppSelector((state) => state.instructor);

  const [currentIndex, setCurrentIndex] = useState(1);
  const renders: number = 1;
  const stop: number = currentIndex * renders;
  const start: number = stop - renders;
  const slice_exam_info = examInfo.slice(start, stop);
  const total: number = Math.ceil(examInfo.length / renders);

  const nextPage = () => {
    setCurrentIndex(currentIndex === total ? 1 : currentIndex + 1);
  };

  const prevPage = () => {
    setCurrentIndex(currentIndex === 1 ? total : currentIndex - 1);
  };

  // render selected page number
  const gotoPage = (pageNum: number): void => {
    setCurrentIndex(pageNum);
  };

  const generatePageNumbers = (): number[] => {
    const pages: number[] = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    dispatch(getStudentAttendanceReducer());
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getScheduledExamReducer());
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getInstructorReducer());
  }, [location.pathname]);

  /************************************************************************ UI component ****************************************************************/
  return (
    <div
      className={`w-[82vw] min-h-screen absolute right-0 flex flex-col ${
        themeMode === "dark" ? "bg-sidebar-dark" : "bg-[#f6f6f9]"
      }`}
    >
      <Navbar />

      {/* Container for attendance-announcements  */}
      <div className="absolute bottom-0 w-[82vw] h-full flex">
        <div className="w-[64vw] h-full flex flex-col text-gray-800 bg-gradient-to-r from-[#111] to-[#082520c5] shadow-sm">
          <div className="w-full h-[46vh] mt-13 pl-7">
            {/* attendances  */}
            <br />
            <HeaderMain title="Attendance" />

            <div className="w-full grid grid-cols-4">
              {attendances.length > 0 ? (
                attendances.map((course, i) => (
                  <Attendance
                    id={i}
                    name={course}
                    progress={course.split("").length}
                  />
                ))
              ) : (
                <h3 className="text-center pt-8">No attendance</h3>
              )}
            </div>
          </div>

          <div className="w-full h-[46vh] p-2 pl-5">
            {/* time table  */}
            <HeaderMain title="Today's Timetable" />
            <div className="">
              <EventTabble data={slice_exam_info} />
              <ButtonGroup className="pl-4">
                <Button onClick={prevPage}>
                  <ChevronLeft />
                </Button>
                {generatePageNumbers().map((page) => {
                  return (
                    <Button
                      key={page}
                      onClick={() => gotoPage(page)}
                      style={{
                        backgroundColor: page === currentIndex ? "blue" : "",
                        color: page === currentIndex ? "white" : "",
                      }}
                    >
                      {page}
                    </Button>
                  );
                })}
                <Button onClick={nextPage}>
                  <ChevronRight />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <Announce_Teacher announcements={examInfo} instructors={instructors} />
      </div>
    </div>
  );
};

export default Main;
