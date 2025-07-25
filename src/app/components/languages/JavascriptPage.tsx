/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import UIStore from "../../store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LanguagesDropdown from "../languagesDropdown";
import RunCode from "../runcode";
import FullScreen from "../fullscreen";
import CompilerEditor from "../editor";
import { ClearConsole2 } from "../clearconsole";

export default function JavascriptPage() {
  const params = useParams<{ tag: string; item: string }>();
  console.log(params);
  const [code, setCode] = useState(
    "// Write your JavaScript code here\nconsole.log('Hello, World!');\n\n// Example: Variables and functions\nconst name = 'JavaScript';\nfunction greet(language) {\n    return `Hello from ${language}!`;\n}\n\nconsole.log(greet(name));"
  );
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ui: any = UIStore.useState();
  const theme = ui.theme;
  const hideContent = ui.hideContent;

  useEffect(() => {
    const theme = localStorage.getItem("comp-theme");
    if (theme && theme == "light") {
      UIStore.update((s) => {
        s.theme = "light";
      });
    } else {
      UIStore.update((s) => {
        s.theme = "dark";
      });
    }
  }, []);

  const handleSaveShortcut = (e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isSaveCombo =
      (isMac && e.metaKey && e.key === "s") ||
      (!isMac && e.ctrlKey && e.key === "s");

    if (isSaveCombo) {
      e.preventDefault();
      runJavaScript();
    }
  };

  const runJavaScript = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setOutput("");

    try {
      console.log("Running JavaScript code:", code);

      // Create a sandboxed environment to capture console output
      const logs: string[] = [];

      // Custom console that captures output
      const mockConsole = {
        log: (...args: any[]) => {
          logs.push(
            args
              .map((arg) =>
                typeof arg === "object"
                  ? JSON.stringify(arg, null, 2)
                  : String(arg)
              )
              .join(" ")
          );
        },
        error: (...args: any[]) => {
          logs.push(`❌ Error: ${args.map((arg) => String(arg)).join(" ")}`);
        },
        warn: (...args: any[]) => {
          logs.push(`⚠️ Warning: ${args.map((arg) => String(arg)).join(" ")}`);
        },
        info: (...args: any[]) => {
          logs.push(`ℹ️ Info: ${args.map((arg) => String(arg)).join(" ")}`);
        },
        debug: (...args: any[]) => {
          logs.push(`🐛 Debug: ${args.map((arg) => String(arg)).join(" ")}`);
        },
        table: (data: any) => {
          logs.push(`📊 Table: ${JSON.stringify(data, null, 2)}`);
        },
        clear: () => {
          logs.length = 0;
        },
      };

      // Create a safe execution environment
      const safeGlobals = {
        console: mockConsole,
        Math,
        Date,
        JSON,
        Array,
        Object,
        String,
        Number,
        Boolean,
        RegExp,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        encodeURIComponent,
        decodeURIComponent,
        setTimeout: (fn: Function, delay: number) => {
          // Simulate setTimeout for demo purposes (limited functionality)
          logs.push(`⏰ setTimeout called with delay: ${delay}ms`);
          try {
            fn();
          } catch (error: any) {
            logs.push(`❌ setTimeout Error: ${error.message}`);
          }
        },
        setInterval: () => {
          logs.push("⚠️ setInterval is not supported in this environment");
        },
      };

      // Create function with safe globals
      const func = new Function(
        ...Object.keys(safeGlobals),
        `
        "use strict";
        try {
          ${code}
        } catch(error) {
          console.error(error.message);
          throw error;
        }
      `
      );

      // Execute the code with safe globals
      func(...Object.values(safeGlobals));

      // Set output
      if (logs.length > 0) {
        setOutput(logs.join("\n"));
      } else {
        setOutput("Code executed successfully (no output)");
      }
    } catch (error: any) {
      console.error("JavaScript execution error:", error);
      let errorMessage = "An error occurred while executing JavaScript code.";

      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setOutput(`❌ Execution Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  function handleHideContent() {
    UIStore.update((s) => {
      s.hideContent = !hideContent;
    });
  }

  const clearOutput = () => {
    setOutput("");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [code]);

  return (
    <>
      <div
        className={`min-h-screen ${
          theme == "dark" ? "bg-[#171717]" : "bg-gray-50"
        }`}
      >
        {/* Main Content */}
        <div
          className={`${
            hideContent ? "max-w-[100%]" : "max-w-[90%]"
          } mx-auto p-4`}
        >
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-4 ${
              hideContent ? "h-[calc(100vh-40px)]" : "h-[calc(100vh-140px)]"
            }`}
          >
            {/* Code Editor */}
            <div className="lg:col-span-2">
              <div
                className={`${
                  theme == "dark" ? "bg-[#1E1E1E]" : "bg-[#f9f7f7]"
                } rounded-xl overflow-hidden h-full shadow-lg border-b`}
              >
                <div
                  className={`flex items-center justify-between gap-3 px-4 py-3 ${
                    theme == "dark"
                      ? "bg-[#2D2D2D] border-gray-600"
                      : "bg-gray-600 border-amber-50"
                  } border-b`}
                >
                  <LanguagesDropdown language={params} />
                  <div className="flex gap-3.5">
                    <RunCode runCode={runJavaScript} isLoading={isLoading} />
                    <FullScreen
                      hideContent={hideContent}
                      onHideContent={handleHideContent}
                    />
                  </div>
                </div>
                <div className="h-[calc(100%-60px)]">
                  <CompilerEditor
                    theme={theme}
                    code={code}
                    handleEditorChange={handleEditorChange}
                    language="javascript"
                  />
                </div>
              </div>
            </div>

            {/* Output Console */}
            <div className="lg:col-span-1">
              <div
                className={`${
                  theme == "dark" ? "bg-[#1E1E1E]" : "bg-white"
                } rounded-xl shadow-lg h-[200px] overflow-y-auto ${
                  hideContent ? "md:h-[95vh]" : "md:h-[85vh]"
                } flex flex-col`}
              >
                <div
                  className={`px-4 py-3 ${
                    theme == "dark" ? "bg-[#2D2D2D]" : "bg-gray-600"
                  } text-white rounded-t-xl flex justify-between`}
                >
                  <h3 className="font-medium">Output</h3>
                  <ClearConsole2 clearOutput={clearOutput} />
                </div>
                <div className="flex-1 p-4 overflow-auto">
                  <pre
                    id="output"
                    className={`text-sm font-mono whitespace-pre-wrap ${
                      theme == "dark" ? "text-white" : "text-gray-800"
                    } leading-relaxed`}
                  >
                    {isLoading
                      ? "Running JavaScript code..."
                      : output ||
                        'Click "Run Code" or press "Ctrl + S" to see output here...'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
