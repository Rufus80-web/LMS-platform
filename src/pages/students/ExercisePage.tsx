import React, { ChangeEvent, createRef, useEffect, useState } from "react";
import { CodeEditor } from "../../BrowserCodeEditor/CodeEditor";
import ExamTimer from "./ExamTimer";
import { useLocation, useNavigate } from "react-router-dom";
import { getEventExam } from "../../api/student.api";
import toast from "react-hot-toast";
// import Editor from "@monaco-editor/react";
import { getUserObjectId } from "../../Redux/Slices/teacherSlice";
import CodeFeedback from "../../components/CodeFeedback";

interface Exercise {
  type: "mcq" | "programming" | "structural";
  question: string;
  options?: string[];
  instructions?: string;
  testCases?: { input: string; expectedOutput: string }[];
  language?: string;
}

const ExercisePage: React.FC = () => {
  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<any>([]);
  const [codeAnswers, setCodeAnswers] = useState<any>([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()

  const { state } = useLocation();
  const [payload, setPayload] = useState({
    examId: "",
    teacherId: "",
    datetime: "",
    durationMinutes: 1,
    isLocked: 0
  });

  // data state variables for the editor
  const editorRef = createRef();
  const [_selectedLanguage, _setSelectedLanguage] =
    useState<string>("javascript"); // value of the selected language

  // get payload from the state property of the route send from prvious page
  useEffect(() => {
    if (!state) {
      throw new Error("Exam ID is missing");
    }
    setPayload({
      examId: state.examId,
      teacherId: state.teacherId,
      datetime: state.datetime,
      durationMinutes: state.durationMinutes,
      isLocked: state.isLocked
    });
  }, []);

  // fetch exam of selected exam event (announcement)
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await getEventExam(payload.examId, payload.teacherId);
        const { status, message, exam } = response.data;

        if (status === "error") {
          throw new Error(message);
        }
        setExam(exam);
        setAnswers(new Array(exam.exercises.length).fill(""));
        setCodeAnswers(new Array(exam.exercises.length).fill(""));
      } catch (err: any) {
        console.error(err.message);
        throw new Error(err);
      }
    };

    fetchExam();
  }, [payload.examId, payload.teacherId]);

  // Handle change function for mcqs
  const handleChange = (index: number, value: string) => {
    answers[index] = value;
    setAnswers([...answers]);
  };

  // Handle code change on the editor
  const handleCodeChange = (index: number, value: string) => {
    // console.log(`Code updated at index ${index}:`, value); // ✅

    codeAnswers[index] = value;
    setCodeAnswers([...codeAnswers]);
  };

  // Handle submission of exams answers
  const handleSubmit = async () => {
    if (submitted) return;

    // get full anwers of the student
    const fullAnswers = exam.exercises.map((_ex: Exercise, idx: number) =>
      exam.type === "programming" ? codeAnswers[idx] : answers[idx]
    );

    // get student ID from local storage
    const studId = getUserObjectId();

    // send the answers to the server

    try {
      const response = await fetch(
        "http://localhost:8000/api/submit-exam/submission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || null}`,
          },
          body: JSON.stringify({
            studentId: studId,
            examId: payload.examId,
            answers: fullAnswers,
          }),
        }
      );

      const data = await response.json();
      const { status, message } = data;

      if (status === "error") {
        toast.error(message);
      } else {
        setSubmitted(true);
        toast.success(message);
        navigate("/student/exams")
      }
    } catch (err: any) {
      console.error(err.message);
      setSubmitted(false);
    }
  };

  // This functions determines if a student can access the exam within the exam duration time allowed or remaining
  const getAccessExam = (): boolean => {
    const now = new Date();
    const examStart = new Date(`${payload.datetime}:00`);
    const examEnd = new Date(
      examStart.getTime() + payload.durationMinutes * 60000
    );

    const canAccess = now >= examStart && now <= examEnd;
    // console.log("canAccess: ", canAccess);
    return canAccess;
  };

  // const handleProgremmingLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedLanguage(e.target.value);
  // };

  // focus editor when it mounts
  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  /************************************************************USER INTERFACE BELOW **************************************************************************/

  // Return loading if no exam found
  if (!exam)
    return (
      <p className="text-4xl font-bold text-center absolute top-[50%] left-[50%]">
        Loading...
      </p>
    );

  // Return actual UI of the component if exam if present
  return (
    <div className="p-4 space-y-6 bg-gradient-to-r  from-[#111] to-[#082520e2] shadow-sm">
      {getAccessExam() && (
        <ExamTimer
          durationMinutes={exam.durationMinutes}
          onTimeUp={handleSubmit}
        />
      )}
      <h1 className="text-2xl font-bold text-slate-50">{exam.examTitle}</h1>

      {/* <CodeFeedback inputCode={codeAnswers[0]} /> */}

      {exam.exercises.map((ex: Exercise, idx: number) => (
        <React.Fragment>
          {getAccessExam() && (
            <div
              key={idx}
              className="bg-[#33333353] text-white shadow rounded p-4"
            >
              <p>
                <span className="font-bold">Q{idx + 1}</span> {ex.question}
              </p>
              {/* Display mcqs */}
              {exam.type === "mcq" &&
                ex.options?.map((opt, i) => (
                  <div key={i}>
                    <label className="flex justify-start items-center gap-1">
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        value={opt}
                        onChange={() => handleChange(idx, opt)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="">{opt}</span>
                    </label>
                  </div>
                ))}
              {/* Display structural question */}
              {exam?.type === "structural" && (
                <textarea
                  className="w-full p-2 border mt-2"
                  value={answers[idx]}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleChange(idx, e.target.value)
                  }
                />
              )}
              {/* Display programming exercises  */}
              {exam?.type === "programming" && (
                <CodeEditor
                  language={ex.language as string}
                  onMount={onMount}
                  codeFromEditor={codeAnswers[idx]}
                  index={idx}
                  onChange={(val: string) => handleCodeChange(idx, val)} // ✅ this is for editor content
                />
              )}
            </div>
          )}
        </React.Fragment>
      ))}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-[blue]"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default ExercisePage;

/**

 */
