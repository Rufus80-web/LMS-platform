import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Dialog from "./components/Dialog";
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import { getScheduledExamReducer } from "../../Redux/Slices/studentSlice";
import ExamCard from "./components/ExamCard";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
// import SchoolIcon from "@mui/icons-material/School";

const Exam: React.FC = () => {
  const dispatch = useAppDispatch();
  const { examInfo } = useAppSelector((state) => state.studentExamInfo);
  console.log(examInfo);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleClickOpen = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    setTitle(title);
    setDescription(description);
    setOpen(true);
  };
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setOpen(false);
  };
  // console.log(examInfo);

  useEffect(() => {
    dispatch(getScheduledExamReducer());
  }, [dispatch]);

  const handleExamAttendance = (item: any) => {
    // @examId populated ID

    navigate("/student/attend-exam", {
      state: {
        examId: item.examId["_id"],
        teacherId: item.teacherId["_id"],
        datetime: item.datetime,
        durationMinutes: item.examId["durationMinutes"],
      },
    });
  };

  const canAccessExam = (event: any): boolean => {
    const now = new Date();
    const examStart = new Date(`${event.datetime}:00`);
    const examEnd = new Date(
      examStart.getTime() + event.examId.durationMinutes * 60000
    );

    const canAccess = now >= examStart && now <= examEnd;
    console.log("exam: " + event._id, canAccess);
    return canAccess;
  };

  /********************************************************************************************************************************************************** */
  return (
    <div
      className={`w-screen min-h-screen bg-gradient-to-l from-[#111] to-[#082520c5] shadow-sm`}
    >
      {/* sidebar section  */}
      <Sidebar />

      {/* Deside the sidebar  */}
      <div className="w-[82vw] min-h-screen absolute right-0 flex flex-col">
        {/* Navbar section  */}
        <Navbar />

        {/* Time's table content  */}
        <div className="absolute bottom-2 pb-[2em] w-[82vw] h-full overflow-auto pt-20 grid grid-cols-3 gap-y-8 pl-5">
          {open && ( // Show more detail of the exam
            <Dialog
              open={open}
              handleClose={handleClose}
              title={title}
              description={description}
            />
          )}
          {examInfo.length > 0 ? (
            examInfo.map((item, index) => (
              <div>
                <ExamCard
                  index={index}
                  item={{ ...item }}
                  canAccess={canAccessExam(item)}
                  getExamId={() => handleExamAttendance(item)}
                  handleClickOpen={() =>
                    handleClickOpen({
                      title: item.course,
                      description: item.description,
                    })
                  }
                />
              </div>
            ))
          ) :  (
            <div className="absolute top-70 left-[30rem]">
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" color="warning">
                    No Exam scheduled Yet
                  </Typography>
                  <Typography component="p" color="warning">
                    You shall be notified when so.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exam;
