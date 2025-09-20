/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { languages } from "@/lib/languages";
import UIStore from "../store";
import { useSearchParams } from "next/navigation";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
}) as any;

interface CodeEditorProps {
  initialLanguage?: string;
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  onLanguageChange?: (language: string) => void;
  onRunCode?: (
    code: string,
    language: string,
    setOutput: any,
    setIsRunning: any,
    isRunning?: any,
    setShowCanvas?: any,
    canvasRef?: any,
    isLoadedRef?: any,
    webRRef?: any
  ) => void;
  outputResponse?: any;
  isLoading?: boolean;
}

function decompressCode(compressedCode: any) {
  try {
    return decodeURIComponent(atob(compressedCode));
  } catch (error) {
    console.error("Decompression failed:", error);
    return "Invalid compressed code";
  }
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialLanguage = "javascript",
  initialCode = "",
  onCodeChange,
  onLanguageChange,
  onRunCode,
}) => {
  const ui: any = UIStore.useState();
  const searchParams: any = useSearchParams();
  const isLoadedRef = useRef(false);
  const webRRef = useRef<any>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [showCanvas, setShowCanvas] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const theme = ui.theme;
  console.log("called");

  // Handle editor content change
  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      const newCode = value || "";
      console.log(newCode);
      setCode(newCode);
      onCodeChange?.(newCode);
    },
    [onCodeChange]
  );

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle code execution
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running code...");
    if (selectedLanguage == "python") {
      setShowCanvas(true);
    }

    try {
      if (onRunCode) {
        onRunCode(
          code,
          selectedLanguage,
          setOutput,
          setIsRunning,
          isRunning,
          setShowCanvas,
          canvasRef,
          isLoadedRef,
          webRRef
        );
      } else {
        // Default output simulation
        setOutput(
          `Code executed successfully!\n\nLanguage: ${selectedLanguage}\nCode length: ${code.length} characters`
        );
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Handle clear output
  const clearOutput = () => {
    setOutput("");
  };

  // Handle resize drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Constrain between 20% and 80%
      const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80);
      setLeftWidth(constrainedWidth);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (initialLanguage == "javascript" && searchParams.get("code")) {
      const decCode: any = decompressCode(searchParams.get("code"));
      setCode(decCode);
    } else {
      setCode(initialCode);
    }
  }, []);

  React.useEffect(() => {
    if (initialLanguage == "python") {
      const skulptScript = document.createElement("script");
      skulptScript.src =
        "https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js";
      skulptScript.async = true;
      skulptScript.onload = () => {
        console.log("Skulpt core loaded");

        const stdlibScript = document.createElement("script");
        stdlibScript.src =
          "https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.min.js";
        stdlibScript.async = true;
        stdlibScript.onload = () => {
          console.log("Skulpt stdlib loaded");
          isLoadedRef.current = true;
        };
        document.body.appendChild(stdlibScript);
      };
      document.body.appendChild(skulptScript);
    }
    if (initialLanguage == "ruby") {
      isLoadedRef.current = true;
    }

    if (initialLanguage == "r") {
      const loadWebR = async () => {
        try {
          // Load WebR from CDN
          const webRScript = document.createElement("script");
          webRScript.src =
            "https://cdn.jsdelivr.net/npm/webr@0.2.2/dist/webr.js";
          webRScript.type = "module";
          webRScript.onload = async () => {
            try {
              console.log("WebR script loaded, initializing...");
              // Initialize WebR
              const { WebR } = window as any;
              if (WebR) {
                webRRef.current = new WebR();
                await webRRef.current.init();
                console.log("WebR initialized successfully");
                isLoadedRef.current = true;
              } else {
                console.log("WebR not available, using fallback");
                isLoadedRef.current = true;
              }
            } catch (error) {
              console.error("Error initializing WebR:", error);
              isLoadedRef.current = true; // Use fallback
            }
          };
          webRScript.onerror = () => {
            console.error("Failed to load WebR, using fallback");
            isLoadedRef.current = true; // Use fallback
          };
          document.head.appendChild(webRScript);
        } catch (error) {
          console.error("Error loading WebR:", error);
          isLoadedRef.current = true; // Use fallback
        }
      };

      loadWebR();

      return () => {
        // Cleanup if needed
        if (webRRef.current) {
          try {
            webRRef.current.destroy?.();
          } catch (error) {
            console.error("Error cleaning up WebR:", error);
          }
        }
      };
    }
    if (initialLanguage == "php") {
      const uniterScript = document.createElement("script");

      uniterScript.src =
        "https://cdn.jsdelivr.net/npm/uniter@2.18.0/dist/uniter.js";
      uniterScript.async = true;
      uniterScript.onload = () => {
        console.log("Uniter PHP engine loaded");
        isLoadedRef.current = true;
      };
      uniterScript.onerror = () => {
        console.error("Failed to load Uniter PHP engine");
        setOutput("Error: Failed to load PHP engine. Please refresh the page.");
      };
      document.body.appendChild(uniterScript);

      return () => {
        // Cleanup script if component unmounts
        if (document.body.contains(uniterScript)) {
          document.body.removeChild(uniterScript);
        }
      };
    }

    if (initialLanguage == "cpp") {
      // Load JSCPP library for C++ execution
      const jscppScript = document.createElement("script");
      jscppScript.src =
        "https://cdn.jsdelivr.net/npm/JSCPP@2.0.6/dist/JSCPP.es5.js";
      jscppScript.async = true;
      jscppScript.onload = () => {
        console.log("JSCPP C++ engine loaded");
        isLoadedRef.current = true;
      };
      jscppScript.onerror = () => {
        console.error("Failed to load JSCPP C++ engine");
        setOutput("Error: Failed to load C++ engine. Please refresh the page.");
      };
      document.body.appendChild(jscppScript);
    }
  }, [initialLanguage]);
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Get current language info
  const currentLanguage =
    languages.find((lang) => lang.slug === selectedLanguage) || languages[0];

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50" : "w-full h-full"} ${
        theme === "dark" ? "bg-[#1e1e1e]" : "bg-white"
      } flex flex-col`}
      ref={containerRef}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 border-b ${
          theme === "dark"
            ? "border-gray-700 bg-[#2d2d2d]"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex gap-2 items-center">
            <Image
              src={`/${selectedLanguage}.svg`}
              alt={selectedLanguage}
              height={20}
              width={20}
            />
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className={`px-3 py-1 rounded border ${
                theme === "dark"
                  ? "bg-[#3c3c3c] text-yellow-400 border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {languages.map((lang) => (
                <option key={lang.slug} value={lang.slug}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Run Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              theme === "dark"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            <Image src="/run-icon-white.svg" alt="Run" width={16} height={16} />
            {isRunning ? "Running..." : "Run"}
          </button>

          {/* Clear Output Button */}
          <button
            onClick={clearOutput}
            className={`flex items-center gap-2 px-3 py-2 rounded ${
              theme === "dark"
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-500 hover:bg-gray-600 text-white"
            } transition-colors`}
          >
            <Image
              src="/clear-console.svg"
              alt="Clear"
              width={16}
              height={16}
            />
            Clear
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <span
            className={`text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {currentLanguage.name} Editor
          </span>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Image
              src={isFullscreen ? "/full-screen-exit.svg" : "/full-screen.svg"}
              alt="Fullscreen"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor Panel */}
        <div
          className="flex flex-col border-r border-gray-300 dark:border-gray-700"
          style={{ width: `${leftWidth}%` }}
        >
          <div
            className={`px-4 py-2 text-sm font-medium ${
              theme === "dark"
                ? "bg-[#252526] text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Code Editor
          </div>
          <div className="flex-1">
            <Editor
              language={selectedLanguage}
              theme={theme === "light" ? "vs-light" : "vs-dark"}
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
                bracketPairColorization: { enabled: true },
                folding: true,
                foldingHighlight: true,
                showFoldingControls: "always",
                matchBrackets: "always",
                renderWhitespace: "selection",
                cursorBlinking: "blink",
                cursorSmoothCaretAnimation: "on",
              }}
            />
          </div>
        </div>

        {/* Resize Handle */}
        <div
          className={`w-1 cursor-col-resize hover:bg-blue-500 transition-colors ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-300"
          } ${isDragging ? "bg-blue-500" : ""}`}
          onMouseDown={handleMouseDown}
        />

        {/* Output Panel */}
        <div className="flex flex-col" style={{ width: `${100 - leftWidth}%` }}>
          <div
            className={`px-4 py-2 text-sm font-medium ${
              theme === "dark"
                ? "bg-[#252526] text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Output
          </div>
          <div
            className={`flex-1 p-4 overflow-auto font-mono text-sm ${
              theme === "dark"
                ? "bg-[#1e1e1e] text-green-400"
                : "bg-gray-50 text-gray-800"
            }`}
          >
            {output ? (
              <pre className="whitespace-pre-wrap">
                {output}
                {showCanvas && selectedLanguage == "python" && (
                  <div
                    id="mycanvas"
                    ref={canvasRef}
                    className={`w-auto h-[400px] ${
                      output.includes("turtle") ? "block" : "block"
                    } bg-white border mt-4`}
                  ></div>
                )}
              </pre>
            ) : (
              <div
                className={`text-center ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                } mt-8`}
              >
                <Image
                  src="/window.svg"
                  alt="Output"
                  width={48}
                  height={48}
                  className="mx-auto mb-4 opacity-50"
                />
                <p>Output will appear here when you run your code</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className={`px-4 py-2 text-xs border-t flex justify-between items-center ${
          theme === "dark"
            ? "bg-[#007acc] text-white border-gray-700"
            : "bg-blue-500 text-white border-gray-300"
        }`}
      >
        <div className="flex items-center gap-4">
          <span>Language: {currentLanguage.name}</span>
          <span>Lines: {code.split("\n").length}</span>
          <span>Characters: {code.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isRunning ? "bg-yellow-400" : "bg-green-400"
            }`}
          ></span>
          <span>{isRunning ? "Running" : "Ready"}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
