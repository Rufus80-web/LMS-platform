import React from "react";
import Select from "./Select";
import { Editor as MonacoEditor } from "@monaco-editor/react";

type EditorProps = {
  editorRef?: React.RefObject<unknown>;
  language: string;
  value: string;
  // getEditorValue: (value: string) => void;
  onMount: (editor: any) => void;
  onChange: (value: string) => void;
};

const Editor: React.FC<EditorProps> = ({
  language,
  value,
  onMount,
  onChange,
  // getEditorValue,
}) => {
  // Component UI

  // Handles editor value change
  /*const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue); // ✅ calls handleCodeChange in parent
    }
  };
  */
  
  /*********************************************************************Component UI************************************************************************************************* */
  
  return (
    <div className="flex flex-col gap-1 select-none">
      <div>
        <Select name="selectedLanguage" value={language} onChange={() => {}} />
      </div>
      <div className="w-[60vw] h-[40vh] bg-[#1E1E1E] text-[#D4D4D4]">
        <MonacoEditor
          height="100%"
          language={language}
          // defaultValue={"console.log('writing exam...')"}
          theme="vs-dark"
          onChange={(value) => {
            if (onChange) onChange(value ?? ""); // ✅ propagate change
          }}
          onMount={onMount}
          value={value}
          options={{
            fontSize: 14,
            automaticLayout: true,
            fontFamily: "Fira Code, monospace",
            fontLigatures: true,
            lineNumbers: "on",
            minimap: { enabled: true },
            wordWrap: "on",
            autoClosingBrackets: "always",
            autoIndent: "advanced",
            formatOnType: true,
            formatOnPaste: true,
            // renderLineHightlight: "all",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            scrollBeyondLastLine: false,
            quickSuggestions: true,
            suggestOnTriggerCharacters: true, // Trigger suggestions on dot (.)
            tabSize: 2,
            insertSpaces: true,
            bracketPairColorization: {
              enabled: true, // color matching brackets
            },
            guides: {
              indentation: true, // show indent guides
              highlightActiveIndentation: true,
            },
            // renderWhiteSpaces: "boundary" // show whitespaces at boundaries
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
