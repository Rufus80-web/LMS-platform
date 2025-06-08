import React from "react";
import Editor from '@monaco-editor/react'

type CodeEditorProps = {
    code: string,
    onChange: (value: string | undefined) => void
    language?: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({code, onChange, language = 'javascript'}) => {
  return (
    <div className="h-[500px] border border-gray-300 ronded-lg shadow-sm">
        <Editor
          height='100%'
          defaultLanguage={language}
          defaultValue={code}
          theme="vs-dark"
          onChange={onChange}
        />
    </div>
  )
}

export default CodeEditor