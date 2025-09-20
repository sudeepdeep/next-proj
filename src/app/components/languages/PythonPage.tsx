/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import UIStore from "@/app/store";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguagesDropdown from "../languagesDropdown";
import RunCode from "../runcode";
import FullScreen from "../fullscreen";
import CompilerEditor from "../editor";
import { ClearConsole2 } from "../clearconsole";

export default function PythonPage() {
  const params = useParams<{ tag: string; item: string }>();
  const canvasRef = useRef<HTMLDivElement | null>(null);
  console.log(params);
  const isLoadedRef = useRef(false);
  const [code, setCode] = useState(
    "# write your python code here \nprint('Hello world')"
  );
  const [output, setOutput] = useState("");
  const [showCanvas, setShowCanvas] = useState(true);
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
  }, []);

  const handleSaveShortcut = (e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isSaveCombo =
      (isMac && e.metaKey && e.key === "s") ||
      (!isMac && e.ctrlKey && e.key === "s");

    if (isSaveCombo) {
      e.preventDefault();
      runPython(); // Call your custom function
    }
  };

  const runPython = () => {
    setShowCanvas(true);

    requestAnimationFrame(() => {
      if (!canvasRef.current) {
        setOutput("Canvas not mounted yet.");
        return;
      }

      console.log(code);
      setOutput("");

      if (!isLoadedRef.current || !(window as any).Sk) {
        setOutput("Skulpt is not yet loaded. Please try again in a moment.");
        return;
      }

      const Sk = (window as any).Sk;

      function outf(text: string) {
        setOutput(text);
      }

      function builtinRead(x: string) {
        if (
          Sk.builtinFiles === undefined ||
          Sk.builtinFiles["files"][x] === undefined
        ) {
          throw `File not found: '${x}'`;
        }
        return Sk.builtinFiles["files"][x];
      }

      const canvas = document.getElementById("mycanvas");
      if (canvas) {
        canvas.innerHTML = "";
      }

      Sk.pre = "output";
      Sk.configure({ output: outf, read: builtinRead });
      (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "mycanvas";
      Sk.misceval
        .asyncToPromise(() =>
          Sk.importMainWithBody("<stdin>", false, code, true)
        )
        .then(() => {
          if (!canvas?.innerHTML) {
            setShowCanvas(false);
          }
          console.log(!canvas?.innerHTML);
        })
        .catch((err: any) => {
          setOutput("\n" + err.toString());
          // output.innerText += "\n" + err.toString();
        });
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  function handleHideContent() {
    console.log(hideContent);
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
                  <LanguagesDropdown language={params} />
                  <div className="flex gap-3.5">
                    <RunCode runCode={runPython} />
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
                    language="python"
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
                  <>
                    <pre
                      id="output"
                      className={`text-sm font-mono whitespace-pre-wrap ${
                        theme == "dark" ? "text-white" : "text-gray-800"
                      } leading-relaxed`}
                    >
                      {output ||
                        'Click "Run Code" or press "Ctrl + S" to see output here...'}
                    </pre>

                    {/* Always include mycanvas */}
                    {showCanvas && (
                      <div
                        id="mycanvas"
                        ref={canvasRef}
                        className={`w-auto h-[400px] ${
                          output.includes("turtle") ? "block" : "block"
                        } bg-white border mt-4`}
                      ></div>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
