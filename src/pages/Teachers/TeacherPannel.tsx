import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";


interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface TeacherPanelProps {
  onSave: (questions: Question[], startTime: string, duration: number) => void;
}


const TeacherPanel: React.FC<TeacherPanelProps> = ({ onSave }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(30);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          setQuestions(json);
        } else {
          alert("Invalid JSON format.");
        }
      } catch {
        alert("Failed to read JSON file.");
      }
    };
    reader.readAsText(file);
  };


  const handleQuestionEdit = (
    index: number,
    key: keyof Question,
    value: string
  ) => {
    const updated = [...questions];
    if (key === "options") return; // Options are handled separately
    updated[index][key] = value;
    setQuestions(updated);
  };


  const handleOptionEdit = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Teacher Panel - Upload & Schedule</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>Upload Graded Exercise File (.json)</Typography>
        <Input
          type="file"
          inputProps={{ accept: ".json" }}
          onChange={handleFileUpload}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <TextField
          type="datetime-local"
          label="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Duration (mins)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </Box>
      {questions.map((q, i) => (
        <Card key={q.id} sx={{ my: 2 }}>
          <CardContent>
            <TextField
              fullWidth
              label={`Question ${i + 1}`}
              value={q.question}
              onChange={(e) =>
                handleQuestionEdit(i, "question", e.target.value)
              }
            />
            {q.options.map((opt, j) => (
              <TextField
                key={j}
                fullWidth
                label={`Option ${j + 1}`}
                value={opt}
                onChange={(e) => handleOptionEdit(i, j, e.target.value)}
                sx={{ mt: 1 }}
              />
            ))}
            <TextField
              fullWidth
              label="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionEdit(i, "correctAnswer", e.target.value)
              }
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>
      ))}
      <Button
        variant="contained"
        onClick={() => onSave(questions, startTime, duration)}
        sx={{ mt: 2 }}
      >
        Save Exam
      </Button>
    </Box>
  );
};
export default TeacherPanel;
