import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import Input from "./components/Input";
import { useTheme } from "../../context/ThemeContext";
import FormSelect from "../Admin/components/FormSelect";
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import {
  fetchTeacherCourseReducer,
  getUserObjectId,
} from "../../Redux/Slices/teacherSlice";
import { registerStudentApi } from "../../api/teacher.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type SidebarType = () => void;

const NewAdmission: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const dispatch = useAppDispatch();
  const route = useNavigate();
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const [formData, setFormData] = useState({
    email: "",
    matricule: "",
    classRoom: "",
    level: "",
    course: "",
  });
  const { themeMode } = useTheme();

  const cleanTheForm = () => {
    setFormData({
      email: "",
      matricule: "",
      classRoom: "",
      level: "",
      course: "",
    });
  };

  //Redux store data
  const { course } = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchTeacherCourseReducer());
  }, []);

  const OnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // Create a new student
  const StudentAdmission = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const reqBody = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const id = getUserObjectId();
      const response = await registerStudentApi(reqBody, id);
      const { status, message } = await response.json();

      if (status === "error") {
        toast.error(message);
      } else {
        toast.success(message);
        cleanTheForm();

        setTimeout(() => route("/teacher/students"), 1000);
        // Navigate and clear the form
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // UI Component
  return (
    <div className="w-screen min-h-screen flex select-none">
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar />
        <div
          className={`w-screen min-h-screen pb-[2em] ${
            isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
          } ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
        >
          <Navbar />

          <div className="pl-0">
            <DashHeader
              title="CREATE USER"
              message="Create a new user profile"
            />
            <div className={`mt-8 pr-3`}>
              <form
                onSubmit={StudentAdmission}
                className="w-[78vw] min-h-[65vh] p-2 pb-2"
              >
                <section className="pt-6 flex gap-6"></section>
                <section className="pt-6 flex gap-6">
                  <FormSelect
                    name="classRoom"
                    value={formData.classRoom}
                    placeholder="Enter student class room"
                    onChange={OnChange}
                    style="small-input"
                    options={[
                      "BA1A",
                      "BA1B",
                      "BA1C",
                      "BA1D",
                      "BA2A",
                      "BA2B",
                      "SE3A",
                      "SE3B",
                      "SE3C",
                    ]}
                  />
                  <FormSelect
                    name="level"
                    value={formData.level}
                    placeholder="Choose student Level"
                    onChange={OnChange}
                    style="small-input"
                    options={["Bachelor", "Master"]}
                  />
                </section>
                <section className="pt-6 flex gap-6">
                  <FormSelect
                    name="course"
                    value={formData.course}
                    placeholder="Select a course"
                    onChange={OnChange}
                    style="small-input"
                    options={course ? course : []}
                  />
                  <Input
                    type="text"
                    name="email"
                    value={formData.email}
                    placeholder="Email "
                    onChange={OnChange}
                    style="small-input"
                  />
                </section>

                <section className="absolute right-3 bottom-22">
                  <Button
                    type="submit"
                    variant="contained"
                    className="uppercase"
                  >
                    Submit
                  </Button>
                </section>
              </form>
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default NewAdmission;
