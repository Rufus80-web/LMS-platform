import { FC, useState } from "react";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import TeacherPanel from "./TeacherPannel";
import StudentExam from "../students/StudentExam";
import { useTheme } from "../../context/ThemeContext";

import { Divider } from "@mui/material";

type SidebarType = () => void;

interface Question {
  id: number,
  question: string,
  options: string[],
  correctAnswer: string
}

const UploadExercise: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const {themeMode} = useTheme()

  const [, setQuestions] = useState<Question[]>([])
  const [, setStartTime] = useState('')
  const [, setDuration] = useState(30)

  const handleSave = (q: Question[], start: string, dur: number) => {
    setQuestions(q)
    setStartTime(start)
    setDuration(dur)
  }

  return (
    <div className="w-screen min-h-screen flex select-none">
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar />
        <div
          className={`w-screen min-h-screen  ${
            isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
          }  pb-[2em] ${themeMode === 'dark' ? 'bg-content-dark' : 'bg-white'}`}
        >
          <Navbar />

          <div className="pl-0">
            <DashHeader
              title="Upload Exercise"
              message="Upload graded exercise for student"
            />
            <div className={`mt-8 pr-3 ${themeMode === 'dark' && 'text-[#f5f5f5cb]'}`}>
              <TeacherPanel onSave={handleSave}  />
              <Divider sx={{ my: 3 }} />
              {/* <StudentExam questions={questions} startTime={startTime} duration={duration} /> */}
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default UploadExercise;
