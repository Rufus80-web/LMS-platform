import  { FC, useState } from "react";
import axios from "axios";

type CodeFeedbackProps = {
    inputCode: string
}

const CodeFeedback: FC<CodeFeedbackProps> = () => {
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:8000/api/openAI/feedback", {
        code: code,
    });
    setFeedback(res.data.feedback);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <textarea
        className="w-full h-48 border p-2 font-mono text-white"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer"
      >
        Get Feedback
      </button>
      {feedback && (
        <div className="bg-gray-100 p-4 mt-4 rounded">
          <h2 className="text-lg font-bold mb-2">AI Feedback:</h2>
          <pre className="whitespace-pre-wrap">{feedback}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeFeedback;
