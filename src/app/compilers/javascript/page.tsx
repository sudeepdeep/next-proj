/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import UIStore from "@/app/store";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClearConsole2 } from "../../components/clearconsole";
import FullScreen from "../../components/fullscreen";
import RunCode from "../../components/runcode";

const CompilerEditor = dynamic(() => import("../../components/editor"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

const JavascriptPage = () => {
  const [code, setCode] = useState("// write your javascript code here");
  const [output, setOutput] = useState("");
  const ui: any = UIStore.useState();
  const theme = ui.theme;
  const hideContent = ui.hideContent;

  function handleHideContent() {
    UIStore.update((s) => {
      s.hideContent = !hideContent;
    });
  }

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
      runCode(); // Call your custom function
    }
  };

  const runCode = () => {
    setOutput("");
    console.log(code);

    try {
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
      };

      // Create function with custom console
      const func = new Function(
        "console",
        `
        try {
          ${code}
        } catch(error) {
          console.error(error.message);
        }
      `
      );

      // Execute the code with mock console
      func(mockConsole);

      // Set output
      setOutput(
        logs.length > 0
          ? logs.join("\n")
          : "Code executed successfully (no output)"
      );
    } catch (error: any) {
      setOutput(`❌ Execution Error: ${error.message}`);
    } finally {
    }
  };

  const clearOutput = () => {
    setOutput("");
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [code]);

  return (
    <div
      className={`min-h-screen ${
        theme == "dark" ? "bg-[#171717]" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      {/* {!hideContent && (
        <>
          <HeaderComponent
            clearOutput={clearOutput}
            runCode={runCode}
            isLoading={isLoading}
          />
        </>
      )} */}

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
              } rounded-xl overflow-hidden h-full shadow-lg border-b"`}
            >
              <div
                className={`flex items-center justify-between gap-3 px-4 py-3 ${
                  theme == "dark"
                    ? "bg-[#2D2D2D] border-gray-600"
                    : "bg-gray-600 border-amber-50"
                }  border-b`}
              >
                <div className=" flex gap-1.5 items-center">
                  <div>
                    <Image
                      alt="JavaScript logo"
                      src="/js-logo.svg"
                      width={24}
                      height={24}
                      className="flex-shrink-0"
                    />
                  </div>
                  <div
                    className={`${
                      theme == "dark" ? "text-yellow-400" : "text-white"
                    }  font-medium text-sm`}
                  >
                    JavaScript
                  </div>
                </div>
                <div className="flex gap-3.5">
                  <RunCode runCode={runCode} />
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
              }  flex flex-col`}
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
                {output ? (
                  <pre
                    className={`text-sm font-mono whitespace-pre-wrap ${
                      theme == "dark" ? "text-white" : "text-gray-800"
                    }  leading-relaxed`}
                  >
                    {output}
                  </pre>
                ) : (
                  <div className="text-gray-500 text-sm italic">
                    Click "Run Code or "Ctrl + s" to see output here...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavascriptPage;
