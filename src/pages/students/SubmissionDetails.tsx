import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { submissionRequestApi } from "../../api/student.api";

type SubmissionType = {
  examId: {
    course: string;
  };
  answers: string[];
  resultDetails: [
    {
      title: string;
      question: string;
      score: number;
      results: [
        {
          input: string;
          expected: string;
          output: string;
          pass: boolean;
        }
      ];
    }
  ];
};

const SubmissionDetail = () => {
  const { examId } = useParams();
  const [submission, setSubmission] = useState<SubmissionType>();

  useEffect(() => {
    const getSubmission = async () => {
      try {
        const response = await submissionRequestApi(examId as string);
        const data = await response.data;

        if (data.status === "error") {
          return console.log(data.message);
        }
        setSubmission(data.submision);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getSubmission();
  }, []);
  return (
    <div className={`w-screen min-h-screen`}>
      {/* sidebar section  */}
      <Sidebar />

      <div className="w-[82vw] min-h-screen absolute right-0 flex flex-col">
        {/* Navbar section  */}
        <Navbar />

        <div className="absolute bottom-0 w-[82vw] h-full flex  justify-center items-start gap-3 pt-15 pl-0 bg-gradient-to-r from-[#111] to-[#082520e8] shadow-sm">
          <div className="w-full h-full bg-[#f5f5f51b] text-[#ffffff83] px-2 py-2 overflow-auto">
            <div>
              <h2 className="text-xl text-white">
                Course - {submission?.examId["course"]}
              </h2>
            </div>
            <div>
              {submission?.resultDetails.map((item, index) => (
                <div key={index} className="pt-4 flex flex-col">
                  <div className="flex flex-col">
                    <span className="font-bold">
                      Q{index + 1}. {item.title}
                    </span>
                    <span>{item.question}</span>
                  </div>
                  <div>
                    {item.results.map((result: any, i: number) => (
                      <div key={i} className="flex flex-col gap-1">
                        <p>
                          <span className="text-gray-700">Input: </span>
                          {result.input}
                        </p>
                        <p>
                          <mark>
                            <span className="text-gray-700">Expected: </span>
                            {result.expected}
                          </mark>
                        </p>
                        <p>
                          <span className="text-gray-700">Your Output: </span>
                          {result.output}
                        </p>
                        <p>
                          <span className={`text-gray-700`}>
                            Status: {result.pass ? "Passed" : "Failed"}
                          </span>
                        </p>
                        {/**student's code submitted */}
                        <div className="py-3">{submission.answers[index]}</div>
                      </div>
                    ))}
                    <span>score: {item.score}</span>
                    <hr />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
