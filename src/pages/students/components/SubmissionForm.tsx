import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import ExamTimer from "./ExamTimer";
import axios from "axios";

// Auto-submits when the time is up

type Props = {
  exerciseId: string;
  language?: string;
  durationMinutes: number;
};

const SubmissionForm: React.FC<Props> = ({
  exerciseId,
  language = "javascript",
  durationMinutes = 30,
}) => {
  const [code, setCode] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleCodeSubmission = async () => {
    if (submitted) return; // Prevent resubmit
    try {
      const response = await axios.post("/api/submission", {
        exerciseId,
        code,
      });
      setSubmitted(true)
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.log("submission failed");
    }
  };

  return (
    <div className="space-y-4">
      <ExamTimer
        durationMinitutes={durationMinutes}
        onTimeUp={handleCodeSubmission}
      />
      <CodeEditor
        code={code}
        onChange={(val) => setCode(val || "")}
        language={language}
      />
      <div className="space-x-3">
      <button
        onClick={handleCodeSubmission}
        disabled={submitted} // If submitted disable button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
      >
        {submitted ? "Submitted" : "Submit"}
      </button>
      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-teal-700 cursor-pointer">Run</button>
      </div>
    </div>
  );
};

export default SubmissionForm
