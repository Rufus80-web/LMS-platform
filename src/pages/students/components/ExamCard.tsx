import { Lock, LockOpen } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

type ExamCardProps = {
  course: string;
  datetime: string;
  description: string;
  hasPassed?: string;
  room?: string;
  teacherId: {
    firstname: string;
    lastname: string;
    gender: string;
  };
  examId: {
    isLocked: number;
  };
};

type ExamCard = {
  index: number;
  item: ExamCardProps;
  getExamId: <T>(examId: T) => void;
  canAccess: boolean;
  handleClickOpen: () => void;
};

const ExamCard: React.FC<ExamCard> = ({
  item,
  index,
  getExamId,
  handleClickOpen,
  canAccess,
}) => {
  const LocaleDate = (inputDate: string) => {
    return new Date(inputDate).toDateString();
  };

  // UI
  return (
    <Card
      key={index}
      sx={{
        maxWidth: 345,
        borderRadius: 4,
        boxShadow: 6,
        userSelect: "none",
        transition: "0.3s",
        height: "38ch",
        "&:hover": {
          boxShadow: 12,
          transform: "scale(1.03)",
        },
      }}
    >
      <CardMedia>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          padding={2}
          height={100}
          bgcolor="#1976d2"
        >
          {/* <SchoolIcon sx={{ fontSize: 80, color: "#fff" }} /> */}
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color="white"
            fontSize={13}
            textTransform={"uppercase"}
          >
            Upcomming Exam
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontSize={13}
            color="white"
            textTransform={"uppercase"}
          >
            {item.room}
          </Typography>
        </Box>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Exam - {item.course}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Course - {item.description?.slice(0, 40) + "..."}
        </Typography>
        <Typography gutterBottom color="text.secondary" component="p">
          Date - {LocaleDate(item.datetime?.split("T")[0])}
        </Typography>
        <Typography gutterBottom color="text.secondary" component="p">
          Time - {item.datetime?.split("T")[1]}
        </Typography>
        <Typography gutterBottom color="text.secondary" component="p">
          Course Instructor - {item.teacherId?.gender === "Male" ? "M" : "Mme"}{" "}
          &nbsp;
          {item.teacherId.firstname} {item.teacherId.lastname}
        </Typography>

        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            View
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={getExamId}
            disabled={canAccess === false ? true : false}
          >
            Attend{" "}
            <span className="text-[6px]">
              {canAccess === false ? <Lock /> : <LockOpen />}
            </span>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ExamCard;
