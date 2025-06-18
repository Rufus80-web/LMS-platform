import { FC, useEffect, useState } from "react";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { __getStudentApi, deleteStudentApi } from "../../api/teacher.api";
import { getUserObjectId } from "../../Redux/Slices/teacherSlice";
import img from "../../assets/images/profile-1.jpg";
import CustomCard from "../Admin/components/CustomCard";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type SidebarType = () => void;
type studentProps = {
  room: string;
  matricule: string;
  level: string;
  courses: string;
  email: string;
  stud_id?: {
    firstname: string;
    lastname: string;
    _id: string;
    email: string;
  };
};

const DisplayStudentPage: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [student, setStudent] = useState<studentProps>({
    room: "",
    matricule: "",
    level: "",
    courses: "",
    email: "",
    stud_id: {
      firstname: "",
      lastname: "",
      _id: "",
      email: "",
    },
  });
  console.log(student);
  const [cardTransition, setCardTransition] = useState(false);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const { themeMode } = useTheme();
  const route = useNavigate();

  // Get student ID
  const { studID } = useParams();

  // Display card container to confirm or cancel deletion
  const setCardContainer = () => setCardTransition(true);
  const unmountCardContainer = () => setCardTransition(false);

  // Delete student action
  const deleteStudentRequest = async () => {
    try {
      const teacherId = getUserObjectId();
      const response = await deleteStudentApi(teacherId, studID as string);
      const { status, message } = response.data;

      if (status === "error") {
        toast.error(message);
        throw new Error(message);
      } else {
        unmountCardContainer();
        toast.success(message);
        // Redirect to students page
        setTimeout(() => route("/teacher/students"), 2000);
      }
    } catch (err: any) {
      console.error(err.message);
      throw new Error(err);
    }
  };

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

  return (
    <div className="w-screen min-h-screen flex select-none">
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <motion.div
          initial={{ opacity: 0, x: "-60%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Sidebar />
        </motion.div>

        <div
          className={`w-screen min-h-screen ${
            themeMode === "dark" ? "bg-content-dark" : "bg-white"
          } ${isOpen ? "pl-7 pr-3" : "pl-20 pr-3"} pb-[2em]
             `}
        >
          <CustomCard
            name={student?.stud_id?.firstname}
            state={cardTransition}
            func1={deleteStudentRequest}
            func2={unmountCardContainer}
          />
          <Navbar />

          <div className="pl-1">
            <DashHeader
              title="student Data"
              message={"Personal Informations"}
            />
            {/* <div className={`mt-8 pr-3`} style={{color: themeMode === "light" ? "black" : "#d4d0d08c",}}></div> */}
            <hr className="mt-3 border-[#85838336] border-solid border-1" />

            <div
              className={`w-full h-max mt-6 flex flex-col gap-3 ${
                themeMode === "dark" ? "text-[#f6f6f67e]" : "text-black"
              }`}
            >
              <section className="grid grid-cols-3 items-center">
                <div className="flex flex-col gap-3 w-60 h-15">
                  <span>Name:</span>
                  <span>{student?.stud_id?.firstname}</span>
                </div>
                <div className="flex flex-col gap-3 w-60 h-15">
                  <span>Attachement:</span>
                  <div className="w-15 h-15 rounded-full">
                    <img
                      className="w-full h-full rounded-full"
                      src={img}
                      alt=""
                    />
                  </div>
                </div>
              </section>
              <hr className="mt-10 border-[#85838336] border-solid border-1" />
              <section className="flex justify-start items-center">
                <div className="flex flex-col justify-start items-start">
                  <div>Email</div>
                  <div>{student?.stud_id?.email}</div>
                </div>
              </section>
              <hr className="mt-3 border-[#85838336] border-solid border-1" />
              <section className="flex justify-start items-center">
                <div className="flex flex-col justify-start items-start">
                  <div>Matricule</div>
                  <div>{student?.matricule}</div>
                </div>
              </section>
              <hr className="mt-3 border-[#85838336] border-solid border-1" />
              <section className="grid grid-cols-3 items-center">
                <div className="flex flex-col gap-3 w-60 h-15">
                  <span>ClassName</span>

                  <span>{student.room}</span>
                </div>
                <div className="flex flex-col gap-3 w-60 h-15">
                  <span>Level:</span>
                  <span>{student.level}</span>
                </div>
                <div className="flex flex-col gap-3 w-60 h-15">
                  <span>Courses:</span>
                  <span>
                    {student.courses
                      .toString()
                      .split(",")
                      .join("-")
                      .toUpperCase()}
                  </span>
                </div>
              </section>
              <hr className="mt-3 border-[#85838336] border-solid border-1" />
              <section className="mt-4 flex gap-4">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#dada11d7" }}
                  onClick={() => route("/teacher/edit-student/" + studID)}
                >
                  Edit
                </Button>
                <Button
                  disabled={cardTransition}
                  variant="contained"
                  style={{
                    backgroundColor: cardTransition ? "grey" : "gray",
                  }}
                  onClick={setCardContainer}
                >
                  Delete
                </Button>
              </section>
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default DisplayStudentPage;
