import React, {  } from "react";

import Editor from "./Editor";
import Output from "./Output";

type MyCodeEditorProps = {
  language: string;
  index: number;
  codeFromEditor: string;
  onMount: (editor: any) => void;
  onChange: (value: string) => void; // ✅ now used for code changes
};

export const CodeEditor: React.FC<MyCodeEditorProps> = ({
  language,
  codeFromEditor,
  onMount,
  onChange,
}) => {
  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue); // calls handleCodeChange in parent
    }
  };

  // Passed props to Editor component
  return (
    <div className="flex flex-col gap-2">
      <div className="flex mt-4">
        <Editor
          language={language}
          onMount={onMount}
          value={codeFromEditor}
          onChange={handleEditorChange} // ✅ pass to Editor correctly
        />
        <Output code={codeFromEditor} language={language} />
      </div>
    </div>
  );
};
