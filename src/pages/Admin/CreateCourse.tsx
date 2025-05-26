import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { useTheme } from "../../context/ThemeContext";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import Input from "./components/Input";
import { Button } from "@mui/material";
import { Course } from "../../static/types";
import { addCourseRequest } from "../../api/admin.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, RootState } from "../../Redux/configureStrore";
import FormSelect from "./components/FormSelect";
import { courseReducer } from "../../Redux/Slices/adminSlice";


type SidebarType = () => void;

const CreateCourse = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const [courseData, setCourseData] = useState<Course>({
    courseName: "",
    courseCode: "",
    courseInstructor: "",
    courseHours: "",
  });

  const OnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const {
    users: { courses },
  } = useAppSelector((state: RootState) => state.courseArray);
  const dispatch = useAppDispatch();

  // This function send user-data to the server to perform post request i.e Function to add a new Teacher to the DB
  const handleAddNewCourse = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const configs = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      };

      // Send request to server
      const response = await addCourseRequest(configs);

      // Jsonify the server response
      const { status, message } = await response.json();

      if (status === "error") {
        toast.error(message);
        // Clear the Form Input after successfull registration
        cleanTheForm();
      } else {
        // Display error message
        toast.success(message);
        // Then Redirect
        route("/admin/manage-courses");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // Clean the form
  const cleanTheForm = (): void => {
    setCourseData({
      courseName: "",
      courseCode: "",
      courseInstructor: "",
      courseHours: "",
      createdAt: "",
    });
  };

  // Route to path
  const route = useNavigate();

  useEffect(() => {
    // dispatch data from the store
    dispatch(courseReducer());
  }, []);

  // Retrieve all teacher's names
  const getTeacherNames = (): string[] => {
    const arrayNames: Array<string> = [];
    if (courses && courses.length > 0) {
      for (const data of courses) {
        let name: string = `${data["courseInstructor"]}`;
        arrayNames.push(name);
      }
    } else {
      throw new Error("Course array is possibly empty");
    }
    return arrayNames;
  };

  // Returning UI component
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
          <DashHeader title="New Course" message="Create a new Course" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}

          <form onSubmit={handleAddNewCourse} className="w-full h-[65vh] p-0">
            <section className="flex gap-2 mt-2">
              <Input
                type="text"
                name="courseName"
                value={courseData.courseName}
                placeholder="Course Name"
                onChange={OnChange}
                disable={false}
                style="small-input"
              />
              <Input
                type="text"
                name="courseCode"
                value={courseData.courseCode}
                placeholder="Course Code"
                onChange={OnChange}
                disable={false}
                style="small-input"
              />
            </section>
            <section className="pt-6 flex flex-col gap-6">
              <FormSelect
                name="courseInstructor"
                value={courseData.courseInstructor}
                placeholder="Course Instructor "
                onChange={OnChange}
                style="long-input"
                options={getTeacherNames()}
              />
              <Input
                type="text"
                name="courseHours"
                value={courseData.courseHours as string}
                placeholder="Course Duration"
                onChange={OnChange}
                disable={false}
                style="long-input"
              />
            </section>
            <section className="absolute right-3 bottom-60">
              <Button type="submit" variant="contained" className="uppercase">
                Submit
              </Button>
            </section>
          </form>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default CreateCourse;
