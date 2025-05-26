import React, { useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Button } from "@mui/material";

import img from "../../assets/images/profile-4.jpg";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Course } from "../../static/types";
import { deleteCourse, getOneCourse } from "../../api/admin.api";
import CustomCard from "./components/CustomCard";

type SidebarType = () => void;

const DisplayCourseInfo: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  // Create course object to collect personal informations from the store
  const [course, setCourse] = useState<Course>({
    courseName: "",
    courseCode: "",
    courseInstructor: "",
    courseHours: '',
  });

  const [cardTransition, setCardTransition] = useState(false);

  // Fetch teacher information from the database
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await getOneCourse(courseId as string);
        if (data.status == "error") {
          throw new Error(data.message);
        } else {
          const {
            courseName,
            courseCode,
            courseInstructor,
            courseHours,
            createdAt,
          } = data?.data;
          setCourse({
            courseName: courseName,
            courseCode: courseCode,
            courseInstructor: courseInstructor,
            courseHours: courseHours,
            createdAt: createdAt,
          });
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchCourseData();
  }, []);

  // Display card container to confirm or cancel deletion
  const setCardContainer = () => setCardTransition(true);
  const unmountCardContainer = () => setCardTransition(false);

  // Delete teacher action
  const handleCourseDelete = async () => {
    if (!courseId) {
      console.log("course ID parameter is required");
      return;
    }

    try {
      const response = await deleteCourse(courseId as string);
      const { status, message } = response.data;

      if (status === "error") {
        toast.error(message);
        throw new Error(message);
      } else {
        unmountCardContainer();
        toast.success(message);
        // Redirect to teachers page
        setTimeout(() => navigate("/admin/manage.courses"), 2000);
      }
    } catch (err: any) {
      console.error(err.message);
    }
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
          <CustomCard
            name={course.courseName}
            state={cardTransition}
            func1={handleCourseDelete}
            func2={unmountCardContainer}
          />
          <Navbar />
          <DashHeader title="Course's Data" message="Course Information" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div
            className={`w-full h-max mt-6 flex flex-col gap-6 ${
              themeMode === "dark" ? "text-[#f6f6f67e]" : "text-black"
            }`}
          >
            <section className="grid grid-cols-3 items-center">
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Course Name:</span>
                <span>{course?.courseName}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Course Code:</span>
                <span>{course?.courseCode}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Attachment:</span>
                <div className="w-15 h-15 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src={img}
                    alt=""
                  />
                </div>
              </div>
            </section>
            <hr className="mt-5 border-[#85838336] border-solid border-1" />
            <section className="grid grid-cols-2 items-center">
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Course Instructor:</span>
                <span>{course.courseInstructor}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Course Duration:</span>
                <span>{course.courseHours} hr(s)</span>
              </div>
            </section>
            <hr className="mt-3 border-[#85838336] border-solid border-1" />
            <section className="mt-4 flex gap-4">
              <Button
                variant="contained"
                style={{ backgroundColor: "#dada11d7" }}
                onClick={() =>
                  navigate(
                    `/admin/edit/course/${encodeURIComponent(
                      courseId as string
                    )}`
                  )
                }
              >
                Edit
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: cardTransition ? "grey" : "gray" }}
                disabled={cardTransition}
                onClick={setCardContainer}
              >
                Delete
              </Button>
            </section>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default DisplayCourseInfo;
