import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Alert, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchTeacherCourseReducer, getUserObjectId } from "../../Redux/Slices/teacherSlice";
import {
  __getStudentApi,
  updateStudentApi,
} from "../../api/teacher.api";
import { Sidebar } from "./TSidebar";
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import FormSelect from "../../components/FormSelect";
import { classes } from "../../static/classes";

type SidebarType = () => void;

const TeacherUpdateStudent: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  // Redux dispatcher actions
  const dispatch = useAppDispatch()

  // Redux data selector actor
  const { course } = useAppSelector((state) => state.course)

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  const route = useNavigate();
  // create a student object
  const [student, setStudent] = useState({
    classRoom: "",
    studID: "",
    level: "",
    courses: "",
    email: "",
    name: "",
  });
//   const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [btnName, setBtnName] = useState("Update");

  const { studID } = useParams();

  // Handle form data onChange event
  const OnChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    // const courseSelected: string[] = []
    setStudent({
      ...student,
      [name]: value,
    });
  };

  // Function to update a student
  const updateStudent = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setBtnName("Save");

    if (!isEditing) {
      try {
        const teacherId = getUserObjectId();
        const request_body = {
          classRoom: student.classRoom,
          level: student.level,
          course: student.courses
        };
        const response = await updateStudentApi(
          teacherId,
          studID as string,
          request_body
        );

        const {
          data: { status, message },
        } = response;

        if (status === "error") {
          toast.error("Oops! " + message);
          // throw new Error(message);
        } else {
          toast.success(message);

          // Disable back form inputs
          setIsEditing(true);
          
          // Reset submit button name
          setBtnName("Update");

          route("/teacher/students");
        }
      } catch (error: any) {
        console.log(error.message);
        throw new Error(error);
      }
    }
  };

  // fetch student personal information
  useEffect(() => {
    const getStudentData = async () => {
      try {
        const teacherId = getUserObjectId();
        const response = await __getStudentApi(teacherId, studID as string);
        const { student, status, message } = response.data;

        if (status === "error") {
          throw new Error(message);
        } else {
          setStudent(student);
        }
      } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
      }
    };
    getStudentData();
  }, []);


  // fetch courses offered by a teacher
  useEffect(() => {
    dispatch(fetchTeacherCourseReducer())
  }, [])

  // Set FormSelectData

  // UI component
  return (
    <SidebarContext.Provider
      value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
    >
      <div className="w-screen min-h-screen flex">
        <Sidebar />

        <div
          className={`w-screen min-h-screen pb-[2em] select-none ${
            isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
          } ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
        >
          <Navbar />
          <DashHeader title="Edit Student" message="Student Partial information" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-6 flex flex-col gap-3">
            <form onSubmit={updateStudent} className="w-full h-[65vh] p-0">
              <section className="flex gap-2 mt-2">
                <FormSelect
                  name="classRoom"
                  value={student.classRoom}
                  label="Pick a class"
                  onChange={OnChange}
                  disabled={isEditing}
                  options={classes}
                />
                <FormSelect
                  name="level"
                  value={student.level}
                  label="Student Level"
                  onChange={OnChange}
                  disabled={isEditing}
                  options={['Bachelor', 'Master']}
                />
              </section>
              <section className="pt-6 flex gap-6">
                <FormSelect
                  name="courses"
                  label="Student Course"
                  value={student.courses}
                  onChange={OnChange}
                  disabled={isEditing}
                  options={course}
                />
              </section>
              <section className="flex gap-2 mt-2">
                
              </section>
              {/* {selectedCourses} */}
              <section className="absolute right-3 bottom-72 flex justify-center items-center gap-2">
                {!isEditing && <Alert>Form fields enabled</Alert>}
                <Button type="submit" variant="contained" className="uppercase">
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

export default TeacherUpdateStudent;
