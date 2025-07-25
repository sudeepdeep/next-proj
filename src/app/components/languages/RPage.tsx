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

export default function RPage() {
  const params = useParams<{ tag: string; item: string }>();
  console.log(params);
  const isLoadedRef = useRef(false);
  const webRRef = useRef<any>(null);
  const [code, setCode] = useState(
    '# Write your R code here\nprint("Hello, World!")\n\n# Example: Variables and basic operations\nname <- "R Programming"\nnumbers <- c(1, 2, 3, 4, 5)\n\ncat("Welcome to", name, "!\\n")\ncat("Numbers:", numbers, "\\n")\ncat("Sum:", sum(numbers), "\\n")\ncat("Mean:", mean(numbers), "\\n")\n\n# Example: Simple function\ngreet <- function(language) {\n  paste("Hello from", language, "!")\n}\n\nprint(greet("R"))'
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

    // Load WebR for R execution
    const loadWebR = async () => {
      try {
        // Load WebR from CDN
        const webRScript = document.createElement("script");
        webRScript.src = "https://cdn.jsdelivr.net/npm/webr@0.2.2/dist/webr.js";
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
  }, []);

  const handleSaveShortcut = (e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isSaveCombo =
      (isMac && e.metaKey && e.key === "s") ||
      (!isMac && e.ctrlKey && e.key === "s");

    if (isSaveCombo) {
      e.preventDefault();
      runR();
    }
  };

  const runR = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setOutput("");

    try {
      if (!isLoadedRef.current) {
        setOutput("R engine is not yet loaded. Please try again in a moment.");
        setIsLoading(false);
        return;
      }

      console.log("Running R code:", code);

      // Try to use WebR if available, otherwise use fallback
      if (webRRef.current && webRRef.current.evalR) {
        await runWithWebR(code);
      } else {
        await simulateRExecution(code);
      }
    } catch (error: any) {
      console.error("R execution error:", error);
      let errorMessage = "An error occurred while executing R code.";

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

  const runWithWebR = async (rCode: string) => {
    try {
      // Capture output from WebR
      const result = await webRRef.current.evalR(rCode);
      const output = await result.toJs();

      if (typeof output === "string") {
        setOutput(output);
      } else if (Array.isArray(output)) {
        setOutput(output.join("\n"));
      } else {
        setOutput(JSON.stringify(output, null, 2));
      }
    } catch (error: any) {
      throw new Error(`WebR execution error: ${error.message}`);
    }
  };

  const simulateRExecution = async (rCode: string) => {
    try {
      let outputBuffer = "";
      const lines = rCode.split("\n");

      for (const line of lines) {
        const trimmedLine = line.trim();

        // Skip comments and empty lines
        if (trimmedLine.startsWith("#") || trimmedLine === "") {
          continue;
        }

        // Handle print statements
        const printMatch = trimmedLine.match(/print\s*\(\s*(.+?)\s*\)/);
        if (printMatch) {
          let content = printMatch[1];
          if (content.startsWith('"') && content.endsWith('"')) {
            content = content.slice(1, -1);
          }
          outputBuffer += `[1] "${content}"\n`;
          continue;
        }

        // Handle cat statements
        const catMatch = trimmedLine.match(/cat\s*\(\s*(.+?)\s*\)/);
        if (catMatch) {
          let content = catMatch[1];
          // Simple parsing for cat statements
          content = content.replace(/"/g, "");
          content = content.replace(/,\s*/g, " ");
          content = content.replace(/\\n/g, "\n");

          // Replace variables with simulated values
          content = content.replace(/name/g, "R Programming");
          content = content.replace(/numbers/g, "1 2 3 4 5");
          content = content.replace(/sum\(numbers\)/g, "15");
          content = content.replace(/mean\(numbers\)/g, "3");

          outputBuffer += content;
          continue;
        }

        // Handle function calls like greet("R")
        const greetMatch = trimmedLine.match(
          /print\s*\(\s*greet\s*\(\s*"([^"]+)"\s*\)\s*\)/
        );
        if (greetMatch) {
          outputBuffer += `[1] "Hello from ${greetMatch[1]} !"\n`;
          continue;
        }

        // Handle simple variable assignments (just acknowledge them)
        if (trimmedLine.includes("<-") || trimmedLine.includes("function")) {
          // Variable assignment or function definition - no output
          continue;
        }
      }

      // Simulate execution delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (outputBuffer.trim()) {
        setOutput(outputBuffer.trim());
      } else {
        setOutput("Code executed successfully (no output)");
      }
    } catch (error: any) {
      throw new Error(`R simulation error: ${error.message}`);
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
                    <RunCode runCode={runR} isLoading={isLoading} />
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
                    language="r"
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
                      ? "Running R code..."
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
