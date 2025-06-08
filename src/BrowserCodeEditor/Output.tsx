import React, { useState } from "react";
import { executeCodeApi } from "./api";
// import toast from "react-hot-toast";

type OutputProps = {
  code: string;
  language: string;
};

const Ouput: React.FC<OutputProps> = ({ code, language }) => {
  const [output, setOutput] = useState<string[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    try {
      setIsLoading(true);

      const { message, data } = await executeCodeApi(language, code);
      console.log('Response: ' + message);
      const { run } = data

      // set code response on output container
      setOutput(run.output?.split("\n"));

      // verify if there is a run-time/compilation error
      run.stderr ? setIsError(true) : setIsError(false);
    } catch (error: any) {
      console.error(error);
      // toast.error(error.message || "Unable to Run code", { duration: 6000 });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-1 select-none">
      <div>
        <button
          onClick={runCode}
          className="w-max h-8 text-[12px] px-2 text-[#ffffffde] border-1 bg-[#201f1fe5] rounded-md hover:text-yellow-300 cursor-pointer"
        >
          {isLoading ? "Loading" : "Run Code"}
        </button>
      </div>
      <div
        className={`w-[30vw] h-[40vh] bg-[#17171a] border-1 ${
          isError
            ? "border-red-400 text-red-400"
            : "border-[#ffffff20] text-[#ffffff95]"
        }  pl-2 rounded-md transition-all duration-100 ease-in-out `}
      >
        {output
          ? output.map((line: string, i: number) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Ouput;
