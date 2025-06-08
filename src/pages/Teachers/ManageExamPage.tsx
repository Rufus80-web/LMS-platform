import React, { ChangeEvent, FC, useEffect, useState } from "react";

import { Sidebar } from "./TSidebar";
import Navbar from "./components/navbar/Navbar";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DashHeader from "./components/DashHeader";
import _TableBody from "./components/talble/TableBody";
import _TableHeaders from "./components/talble/TableHeaders";

import { useTheme } from "../../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import { getExamReducer } from "../../Redux/Slices/teacherSlice";
import { GradedExercise } from "../../static/Interface";
import toast from "react-hot-toast";
import { deleteExamsApi, updateExamsApi } from "../../api/teacher.api";
import { useNavigate } from "react-router-dom";
import { Cancel } from "@mui/icons-material";

type SidebarType = () => void; // Just loving doing it 😂. Could be ommited
type Props = {
  examId: string;
  examTitle: string;
  unsetDialogContent: () => void;
};

const ManageExamPage: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const dispatch = useAppDispatch();
  const { exams } = useAppSelector((state) => state.exams);
  const [selectedExam, setSelectedExam] = useState({
    examId: "",
    examTitle: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const { isOpen } = useTeacherSidebarContext();
  const { themeMode } = useTheme();

  console.log(showDialog);

  // Dispatching sidebar state
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    // console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };

  // get examId and title onClick
  const setDialogContainer = (examId: string, examTitle: string) => {
    setShowDialog(true);
    setSelectedExam({
      examId,
      examTitle,
    });
  };

  // Perform reducer action
  useEffect(() => {
    dispatch(getExamReducer());
  }, []);

  // Return component UI
  return (
    <div
      className={`w-screen min-h-screen flex select-none ${
        themeMode === "dark" ? "bg-content-dark" : "bg-white"
      }`}
    >
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar />
        <div
          className={`w-screen min-h-screen ${
            isOpen === true ? "pl-13 pr-3" : "pl-12 pr-3"
          } pb-[2em]`}
        >
          <Navbar />

          <div className="pl-1">
            <DashHeader
              title="Exam Management"
              message="Managing scheduled exams"
            />
            {showDialog && (
              <UpdateOrDeleteExam
                examId={selectedExam.examId}
                examTitle={selectedExam.examTitle}
                unsetDialogContent={() => setShowDialog(false)}
              />
            )}
            <div className={`mt-3 pr-3`}>
              <Table component={Paper}>
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor:
                        themeMode === "light" ? "transparent" : "#222",
                    }}
                  >
                    <TableCell
                      style={{
                        color:
                          themeMode === "light" ? "#00000083" : "#adabab78",
                      }}
                    >
                      Title
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          themeMode === "light" ? "#00000083" : "#adabab78",
                      }}
                    >
                      Date - Time
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          themeMode === "light" ? "#00000083" : "#adabab78",
                      }}
                    >
                      Duration (min)
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          themeMode === "light" ? "#00000083" : "#adabab78",
                      }}
                    >
                      Room
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          themeMode === "light" ? "#00000083" : "#adabab78",
                      }}
                    >
                      Course
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          themeMode === "light" ? "#00000083" : "#adabab78",
                      }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exams &&
                    exams.map((exam, index) => (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor:
                            themeMode === "light" ? "transparent" : "#222",
                        }}
                      >
                        <TableCell
                          style={{
                            color:
                              themeMode === "light" ? "#00000083" : "#adabab78",
                          }}
                          title={exam.examTitle}
                        >
                          <span
                            onClick={() =>
                              setDialogContainer(exam.examId, exam.examTitle)
                            }
                            className="hover:underline text-sky-300 cursor-pointer"
                          >
                            {exam.examTitle}
                          </span>
                        </TableCell>
                        <TableCell
                          style={{
                            color:
                              themeMode === "light" ? "#00000083" : "#adabab78",
                          }}
                        >
                          {exam.examDate} {exam.examTime}
                        </TableCell>
                        <TableCell
                          style={{
                            color:
                              themeMode === "light" ? "#00000083" : "#adabab78",
                          }}
                        >
                          {exam.durationMinutes}
                        </TableCell>
                        <TableCell
                          style={{
                            color:
                              themeMode === "light" ? "#00000083" : "#adabab78",
                          }}
                        >
                          {exam.room}
                        </TableCell>
                        <TableCell
                          style={{
                            color:
                              themeMode === "light" ? "#00000083" : "#adabab78",
                          }}
                          title={exam.course}
                        >
                          {exam.course.slice(0, 15)}
                        </TableCell>
                        <TableCell
                          style={{
                            color:
                              themeMode === "light" ? "#00000083" : "#adabab78",
                          }}
                        >
                          {exam.examhasPassed ? "Wriiten" : "Upcomming"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

// Does deletion or update of an exam
const UpdateOrDeleteExam: React.FC<Props> = ({
  examId,
  examTitle,
  unsetDialogContent,
}) => {
  const [openDialog] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<GradedExercise | null>(null);
  const navigate = useNavigate();

  console.log(file);

  // Discard dialog container
  const discardDialog = () => {
    unsetDialogContent();
    setFile(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file || null);

    // preview the file if file is present
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setPreviewData(json); // etract json file data
        } catch (error) {
          toast.error("Invalid Json format");
          setPreviewData(null);
        }
      };
      reader.readAsText(file);
      console.log(previewData);
    }
  };

  const handleExamUpdate = async () => {
    try {
      const response = await updateExamsApi(
        examId,
        previewData as GradedExercise
      );
      const { status, message } = response.data;

      if (status === "error") {
        toast.error(message);
        return;
      } else {
        navigate("/teacher/manage-exams");
        toast.success(message);
        discardDialog(); // callback function passed as props
      }
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  };

  // Handle exam deletion
  const handleExamdeletion = async () => {
    try {
      const {
        data: { status, message },
      } = await deleteExamsApi(examId);
      if (status === "error") {
        toast.error(message);
        throw new Error(message);
      } else if (status === "OK") {
        toast.success(message);
        navigate("/teacher/manage-exams");
        console.log(message);
        discardDialog();
      }
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Dialog
        open={openDialog}
        // onClick={() => setOpenDialog(false)}
        sx={{ height: "60vh", marginTop: "6em" }}
      >
        <DialogTitle className="flex justify-between pr-4 gap-2 items-center">
          <span className="text-sm">Update | Delete {examTitle}</span>
          <span className="cursor-pointer" onClick={discardDialog}>
            <Cancel />
          </span>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Upload new Exam"
            type="file"
            onChange={handleFileChange}
            fullWidth
            margin="dense"
            style={{ width: "25vw" }}
          />
        </DialogContent>
        <DialogContent className="flex gap-3">
          <Button
            className="text-sm"
            onClick={handleExamUpdate}
            variant="contained"
            type="button"
          >
            Update
          </Button>
          <Button
            className="text-sm"
            onClick={handleExamdeletion}
            variant="contained"
            style={{ backgroundColor: "red" }}
            type="button"
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ManageExamPage;
