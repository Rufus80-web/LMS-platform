import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import TeacherPanel from "./TeacherPannel";
import TeacherUploadProgramingExam from "./TeacherUploadProgramingExam";
import { useTheme } from "../../context/ThemeContext";

import { Divider } from "@mui/material";
import FormSelect from "../../components/FormSelect";
import { globalApi } from "../../api/teacher.api";
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import { fetchTeacherCourseReducer } from "../../Redux/Slices/teacherSlice";

type SidebarType = () => void;
type TypeProps = string; // Just for fun

const UploadExercise: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [rooms, setRooms] = useState([]);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const [exerciseType, setexerciseType] = useState<TypeProps>("PROGRAMMING");
  const { themeMode } = useTheme();
  const dispatch = useAppDispatch()
  const { course:courses } = useAppSelector((state) => state.course)

  useEffect(() => {
    const getClassRooms = async () => {
      await globalApi
        .get("/rooms")
        .then((res) => {
          const rooms = res.data.data.map((item: any) => item.class_name)
          setRooms(rooms)
        })
        .catch((err) => console.log(err));
    };

    getClassRooms();
  }, []);

  useEffect(() => {
     dispatch(fetchTeacherCourseReducer())
  }, [])

  return (
    <div className="w-screen min-h-screen flex select-none">
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar />
        <div
          className={`w-screen min-h-screen  ${
            isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
          }  pb-[2em] ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
        >
          <Navbar />

          <div className="pl-0">
            <DashHeader
              title="Upload Student Examination"
              message="Upload Graded Exams for Students"
            />
            <div
              className={`mt-8 pr-3 ${
                themeMode === "dark" && "text-[#f5f5f5cb]"
              }`}
            >
              {/* <TeacherPanel onSave={handleSave}  />
              <Divider sx={{ my: 3 }} /> */}

              <section className="flex gap-10 justify-start">
                <FormSelect
                  name="exerciseType"
                  value={exerciseType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setexerciseType(e.target.value)
                  }
                  options={["MCQ", "PROGRAMMING"]}
                  label="Choose a type to continue"
                />
              </section>

              {exerciseType === "PROGRAMMING" ? (
                <TeacherUploadProgramingExam rooms={rooms ? rooms : []} courses={courses} />
              ) : (
                <>
                  <TeacherPanel onSave={() => {}} />
                  <Divider sx={{ my: 3 }} />
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

// @2025 Implement Digital @all Rights Reserved
export default UploadExercise;
