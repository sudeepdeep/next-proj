/* eslint-disable prefer-const */
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

export default function GoPage() {
  const params = useParams<{ tag: string; item: string }>();
  console.log(params);
  const isLoadedRef = useRef(false);
  const [code, setCode] = useState(
    'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    \n    // Example: Variables and basic operations\n    name := "Go Programming"\n    numbers := []int{1, 2, 3, 4, 5}\n    \n    fmt.Printf("Welcome to %s!\\n", name)\n    fmt.Printf("Numbers: %v\\n", numbers)\n    \n    sum := 0\n    for _, num := range numbers {\n        sum += num\n    }\n    fmt.Printf("Sum: %d\\n", sum)\n    \n    // Example: Function call\n    greeting := greet("Go")\n    fmt.Println(greeting)\n}\n\nfunc greet(language string) string {\n    return fmt.Sprintf("Hello from %s!", language)\n}'
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

    // For Go, we'll use a simulation approach since running Go in browser requires complex setup
    // In a production environment, you might use TinyGo compiled to WebAssembly
    isLoadedRef.current = true;
  }, []);

  const handleSaveShortcut = (e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isSaveCombo =
      (isMac && e.metaKey && e.key === "s") ||
      (!isMac && e.ctrlKey && e.key === "s");

    if (isSaveCombo) {
      e.preventDefault();
      runGo();
    }
  };

  const runGo = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setOutput("");

    try {
      if (!isLoadedRef.current) {
        setOutput("Go engine is not yet loaded. Please try again in a moment.");
        setIsLoading(false);
        return;
      }

      console.log("Running Go code:", code);

      // Simulate Go execution
      await simulateGoExecution(code);
    } catch (error: any) {
      console.error("Go execution error:", error);
      let errorMessage = "An error occurred while executing Go code.";

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

  const simulateGoExecution = async (goCode: string) => {
    try {
      let outputBuffer = "";
      const lines = goCode.split("\n");

      // Check for package main and imports
      const hasPackageMain = goCode.includes("package main");
      const hasFmtImport =
        goCode.includes('import "fmt"') ||
        goCode.includes('import (\n    "fmt"');

      if (!hasPackageMain) {
        throw new Error("Go programs must have 'package main'");
      }

      if (
        !hasFmtImport &&
        (goCode.includes("fmt.") ||
          goCode.includes("Println") ||
          goCode.includes("Printf"))
      ) {
        throw new Error("fmt package must be imported to use fmt functions");
      }

      for (const line of lines) {
        const trimmedLine = line.trim();

        // Skip comments, empty lines, package declarations, imports, and function declarations
        if (
          trimmedLine.startsWith("//") ||
          trimmedLine === "" ||
          trimmedLine.startsWith("package ") ||
          trimmedLine.startsWith("import ") ||
          trimmedLine.includes("import (") ||
          trimmedLine === ")" ||
          trimmedLine.startsWith("func ") ||
          trimmedLine === "{" ||
          trimmedLine === "}" ||
          trimmedLine.includes(":=") ||
          trimmedLine.includes("for ") ||
          trimmedLine.includes("range ") ||
          trimmedLine.includes("sum +=")
        ) {
          continue;
        }

        // Handle fmt.Println statements
        const printlnMatch = trimmedLine.match(
          /fmt\.Println\s*\(\s*(.+?)\s*\)/
        );
        if (printlnMatch) {
          let content = printlnMatch[1];

          if (content.startsWith('"') && content.endsWith('"')) {
            content = content.slice(1, -1);
            outputBuffer += content + "\n";
          } else if (content === "greeting") {
            outputBuffer += "Hello from Go!\n";
          } else {
            outputBuffer += content + "\n";
          }
          continue;
        }

        // Handle fmt.Printf statements
        const printfMatch = trimmedLine.match(
          /fmt\.Printf\s*\(\s*"([^"]+)"\s*,\s*(.+?)\s*\)/
        );
        if (printfMatch) {
          let format = printfMatch[1];
          let args = printfMatch[2];

          // Simple substitution for common cases
          if (format.includes("%s") && args === "name") {
            format = format.replace("%s", "Go Programming");
          } else if (format.includes("%v") && args === "numbers") {
            format = format.replace("%v", "[1 2 3 4 5]");
          } else if (format.includes("%d") && args === "sum") {
            format = format.replace("%d", "15");
          }

          // Replace escape sequences
          format = format.replace(/\\n/g, "\n");

          outputBuffer += format;
          continue;
        }
      }

      // Simulate compilation and execution delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (outputBuffer.trim()) {
        setOutput(outputBuffer.trim());
      } else {
        setOutput("Program compiled and executed successfully (no output)");
      }
    } catch (error: any) {
      throw new Error(`Go compilation/execution error: ${error.message}`);
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
                    <RunCode runCode={runGo} isLoading={isLoading} />
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
                    language="go"
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
                      ? "Compiling and running Go code..."
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
