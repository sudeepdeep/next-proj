/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { runCpp } from "../../code-engine/cpp";
import { runGo } from "../../code-engine/go";
import { runJava } from "../../code-engine/java";
import { runJavaScript } from "../../code-engine/javascript";
import { runPhp } from "../../code-engine/php";
import { runPython } from "../../code-engine/python";
import { runR } from "../../code-engine/r";
import { runRuby } from "../../code-engine/ruby";
import CodeEditor from "../../components/CodeEditor";
import Image from "next/image";
import { defaultCodes } from "@/lib/defaultCodes";

export default function CodeEditorPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [currentLanguage, setCurrentLanguage] = useState(slug);

  const [currentCode, setCurrentCode] = useState(defaultCodes[slug]);

  const handleCodeChange = (code: string) => {
    setCurrentCode(code);
    // console.log("Code changed:", code.length, "characters");
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    console.log("Language changed to:", language);

    if (defaultCodes[language]) {
      setCurrentCode(defaultCodes[language]);
    }
    router.push(`/code-editor/${language}`);
  };

  const handleRunCode = (
    code: string,
    language: string,
    setOutput: any,
    setIsLoading: any,
    isLoading: any,
    setShowCanvas: any,
    canvasRef: any,
    isLoadedRef: any,
    webRRef: any
  ) => {
    console.log(`Running ${language} code:`, code);
    // Here you would implement actual code execution logic
    // For now, we'll just simulate it in the component

    switch (language) {
      case "javascript":
      default:
        runJavaScript(code, setOutput, setIsLoading);
        break;
      case "python":
        runPython(setShowCanvas, canvasRef, code, setOutput, isLoadedRef);
        break;
      case "cpp":
        runCpp(isLoading, setIsLoading, setOutput, isLoadedRef, code);
        break;
      case "java":
        runJava(isLoading, setOutput, isLoadedRef, setIsLoading, code);
        break;
      case "ruby":
        runRuby(setIsLoading, setOutput, isLoadedRef, code, isLoading);
        break;
      case "php":
        runPhp(isLoading, setIsLoading, setOutput, code, isLoadedRef);
        break;
      case "r":
        runR(setOutput, setIsLoading, code, webRRef, isLoading, isLoadedRef);
        break;
      case "go":
        runGo(isLoading, setIsLoading, isLoadedRef, setOutput, code);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <a href="/">
                <Image
                  src="../syntaxz-dark.png"
                  width={140}
                  height={40}
                  alt=""
                />
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                A feature-rich code editor with language support, resizable
                panels, and fullscreen mode
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Current:{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {currentLanguage}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1" style={{ height: "calc(100vh - 120px)" }}>
        <CodeEditor
          initialLanguage={currentLanguage}
          initialCode={currentCode}
          onCodeChange={handleCodeChange}
          onLanguageChange={handleLanguageChange}
          onRunCode={handleRunCode}
        />
      </div>
    </div>
  );
}
