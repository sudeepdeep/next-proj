/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
}) as any;

const CompilerEditor = ({ theme, code, handleEditorChange }: any) => {
  return (
    <Editor
      defaultLanguage="javascript"
      theme={theme == "light" ? "vs-light" : "vs-dark"}
      value={code}
      onChange={handleEditorChange}
      options={{
        fontSize: 14,
        padding: { top: 16, bottom: 16 },
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
        minimap: { enabled: false },
        wordWrap: "on",
        lineNumbers: "on",
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
      }}
    />
  );
};

export default CompilerEditor;
