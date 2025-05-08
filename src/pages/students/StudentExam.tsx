import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import dayjs from "dayjs";


interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface StudentExamProps {
  questions: Question[];
  startTime: string;
  duration: number;
}


const StudentExam: React.FC<StudentExamProps> = ({
  questions,
  startTime,
  duration,
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [now, setNow] = useState<string>(dayjs().toISOString());

  useEffect(() => {
    const interval = setInterval(() => setNow(dayjs().toISOString()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isAvailable = () => {
    const start = dayjs(startTime);
    const end = start.add(duration, "minute");
    return dayjs(now).isAfter(start) && dayjs(now).isBefore(end);
  };


  const isExpired = () => {
    const end = dayjs(startTime).add(duration, "minute");
    return dayjs(now).isAfter(end);
  };


  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };


  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    setScore(score);
  };
  if (!startTime || !duration || questions.length === 0)
    return (
      <Typography>
        Please wait for the teacher to configure the exam.
      </Typography>
    );
  if (!isAvailable())
    return (
      <Typography color="warning.main">
        {isExpired() ? "Exam has ended." : "Exam is not yet available."}
      </Typography>
    );

    
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Student Exam</Typography>
      {questions.map((q) => (
        <Card key={q.id} sx={{ my: 2 }}>
          <CardContent>
            <Typography>{q.question}</Typography>
            <RadioGroup
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            >
              {q.options.map((opt) => (
                <FormControlLabel
                  key={opt}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      {score !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Score: {score} / {questions.length}
        </Typography>
      )}
    </Box>
  );
};
export default StudentExam;
