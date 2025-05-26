import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Alert, Button } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import Input from "./components/Input";
import { Course } from "../../static/types";
import { getOneCourse, updateCourse } from "../../api/admin.api";
import { toast } from "react-toastify";

type SidebarType = () => void;

const EditCourseInfo: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const route = useNavigate();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [btnName, setBtnName] = useState("Update");

  const [course, setCourse] = useState<Course>({
    courseName: "",
    courseCode: "",
    courseInstructor: "",
    courseHours: "",
  });

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourse((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };


  // Get userId from the route
  const { courseId } = useParams();

  useEffect(() => {
    const getCourse = async () => {
      if (typeof courseId === "undefined") {
        throw new Error("User ID is null");
      } else {
        try {
          const { data } = await getOneCourse(courseId);
          const { status, message } = data;
          if (status === "error") {
            throw new Error(message);
          }
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
        } catch (error: any) {
          throw new Error(error);
        }
      }
    };

    getCourse();
  }, []);

  // Perform course update
  const handleCourseUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setBtnName("Save");

    console.log("Form inputs are enabled");

    if (!isEditing) {
      // toast.success("You can now modify the profile's information");

      try {
        const response = await updateCourse(courseId as string, course);
        const {
          data: { status, message, data },
        } = response;

        if (status === "error") {
          toast.error("Oops! " + message);
          throw new Error(message);
        } else {
          toast.success(message);
          // Get updated course record
          const {
            courseName,
            courseCode,
            courseInstructor,
            courseHours,
            createdAt,
          } = data; // Get course from server response object

          // Set updated record on the UI
          setCourse({
            courseName: courseName,
            courseCode: courseCode,
            courseInstructor: courseInstructor,
            courseHours: courseHours,
            createdAt: createdAt,
          });

          // Disable back form inputs
          setIsEditing(true);

          // Reset submit button name
          setBtnName("Update");
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
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
          <DashHeader title="Database" message={`Edit ${course?.courseName} course`} />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-6 flex flex-col gap-3">
            <form onSubmit={handleCourseUpdate} className="w-full h-[65vh] p-0">
              <section className="flex gap-2 mt-2">
                <Input
                  type="text"
                  name="courseName"
                  value={course.courseName}
                  placeholder="Enter Course Name"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
                <Input
                  type="text"
                  name="courseCode"
                  value={course.courseCode}
                  placeholder="Enter Course Code"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
              </section>
              <section className="pt-6 flex flex-col gap-6">
                <Input
                  type="courseInstructor"
                  name="courseInstructor"
                  value={course.courseInstructor}
                  placeholder="Enter Course Instructor "
                  onChange={OnChange}
                  disable={isEditing}
                  style="long-input"
                />
                <Input
                  type="text"
                  name="courseHours"
                  value={course.courseHours as string}
                  placeholder="Course Duration"
                  onChange={OnChange}
                  disable={isEditing}
                  style="long-input"
                />
              </section>
              <section className="absolute right-3 bottom-22 flex justify-center items-center gap-2">
                {!isEditing && (
                  <Alert>Form fields enabled</Alert>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  className="uppercase"
                >
                  <span>{btnName}</span>&nbsp;
                </Button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default EditCourseInfo;
