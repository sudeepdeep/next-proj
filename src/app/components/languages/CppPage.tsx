/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import UIStore from "../../store";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguagesDropdown from "../languagesDropdown";
import RunCode from "../runcode";
import FullScreen from "../fullscreen";
import CompilerEditor from "../editor";
import { ClearConsole2 } from "../clearconsole";

export default function CppPage() {
  const params = useParams<{ tag: string; item: string }>();
  console.log(params);
  const isLoadedRef = useRef(false);
  const [code, setCode] = useState(
    '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}'
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

    return () => {
      // Cleanup script if component unmounts
      if (document.body.contains(jscppScript)) {
        document.body.removeChild(jscppScript);
      }
    };
  }, []);

  const handleSaveShortcut = (e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isSaveCombo =
      (isMac && e.metaKey && e.key === "s") ||
      (!isMac && e.ctrlKey && e.key === "s");

    if (isSaveCombo) {
      e.preventDefault();
      runCpp();
    }
  };

  const runCpp = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setOutput("");

    try {
      if (!isLoadedRef.current || !(window as any).JSCPP) {
        setOutput(
          "C++ engine is not yet loaded. Please try again in a moment."
        );
        setIsLoading(false);
        return;
      }

      console.log("Running C++ code:", code);

      const JSCPP = (window as any).JSCPP;
      let outputBuffer = "";

      // Configure JSCPP with input/output handlers
      const config = {
        stdio: {
          write: (s: string) => {
            outputBuffer += s;
          },
          read: () => {
            // For now, we don't support input
            return "";
          },
        },
        unsigned_overflow: "error",
      };

      // Run the C++ code
      const exitCode = JSCPP.run(code, "", config);

      if (exitCode === 0) {
        setOutput(outputBuffer || "Program executed successfully (no output)");
      } else {
        setOutput(outputBuffer + `\nProgram exited with code: ${exitCode}`);
      }
    } catch (error: any) {
      console.error("C++ execution error:", error);
      let errorMessage = "An error occurred while executing C++ code.";

      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setOutput(`Error: ${errorMessage}`);
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
                    <RunCode runCode={runCpp} isLoading={isLoading} />
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
                    language="cpp"
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
                      ? "Compiling and running C++ code..."
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
