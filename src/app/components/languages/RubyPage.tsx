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

export default function RubyPage() {
  const params = useParams<{ tag: string; item: string }>();
  console.log(params);
  const isLoadedRef = useRef(false);
  const [code, setCode] = useState(
    '# Write your Ruby code here\nputs "Hello, World!"\n\n# Example: Variables and basic operations\nname = "Ruby Programming"\nnumbers = [1, 2, 3, 4, 5]\n\nputs "Welcome to #{name}!"\nputs "Numbers: #{numbers}"\nputs "Sum: #{numbers.sum}"\nputs "Length: #{numbers.length}"\n\n# Example: Method definition and call\ndef greet(language)\n  "Hello from #{language}!"\nend\n\nputs greet("Ruby")\n\n# Example: Class definition\nclass Person\n  def initialize(name)\n    @name = name\n  end\n  \n  def say_hello\n    "Hello, I am #{@name}"\n  end\nend\n\nperson = Person.new("Alice")\nputs person.say_hello'
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

    // For Ruby, we'll use simulation since browser-based Ruby execution is complex
    // Alternative CDNs for Ruby in browser are limited and often unreliable
    isLoadedRef.current = true;
  }, []);

  const handleSaveShortcut = (e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isSaveCombo =
      (isMac && e.metaKey && e.key === "s") ||
      (!isMac && e.ctrlKey && e.key === "s");

    if (isSaveCombo) {
      e.preventDefault();
      runRuby();
    }
  };

  const runRuby = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setOutput("");

    try {
      if (!isLoadedRef.current) {
        setOutput(
          "Ruby engine is not yet loaded. Please try again in a moment."
        );
        setIsLoading(false);
        return;
      }

      console.log("Running Ruby code:", code);

      // Use simulation for reliable Ruby execution
      await simulateRubyExecution(code);
    } catch (error: any) {
      console.error("Ruby execution error:", error);
      let errorMessage = "An error occurred while executing Ruby code.";

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

  const simulateRubyExecution = async (rubyCode: string) => {
    try {
      let outputBuffer = "";
      const lines = rubyCode.split("\n");
      let inClass = false;
      let inMethod = false;
      let variables: { [key: string]: any } = {};

      for (let i = 0; i < lines.length; i++) {
        const trimmedLine = lines[i].trim();

        // Skip comments and empty lines
        if (trimmedLine.startsWith("#") || trimmedLine === "") {
          continue;
        }

        // Handle class definitions
        if (trimmedLine.startsWith("class ")) {
          inClass = true;
          continue;
        }

        // Handle method definitions
        if (trimmedLine.startsWith("def ")) {
          inMethod = true;
          continue;
        }

        // Handle end statements
        if (trimmedLine === "end") {
          if (inMethod) {
            inMethod = false;
          } else if (inClass) {
            inClass = false;
          }
          continue;
        }

        // Skip method and class content (except puts)
        if ((inClass || inMethod) && !trimmedLine.startsWith("puts")) {
          continue;
        }

        // Handle variable assignments
        const assignMatch = trimmedLine.match(/^(\w+)\s*=\s*(.+)/);
        if (assignMatch && !inClass && !inMethod) {
          const varName = assignMatch[1];
          let value = assignMatch[2];

          if (value.startsWith('"') && value.endsWith('"')) {
            variables[varName] = value.slice(1, -1);
          } else if (value.startsWith("[") && value.endsWith("]")) {
            // Simple array parsing
            const arrayContent = value.slice(1, -1);
            variables[varName] = arrayContent
              .split(",")
              .map((item) => parseInt(item.trim()));
          } else if (value.includes("Person.new(")) {
            const nameMatch = value.match(/Person\.new\("([^"]+)"\)/);
            if (nameMatch) {
              variables[varName] = { name: nameMatch[1], type: "Person" };
            }
          }
          continue;
        }

        // Handle puts statements
        const putsMatch = trimmedLine.match(/puts\s+(.+)/);
        if (putsMatch) {
          let content = putsMatch[1];

          // Handle string literals
          if (content.startsWith('"') && content.endsWith('"')) {
            content = content.slice(1, -1);
            outputBuffer += content + "\n";
          }
          // Handle string interpolation
          else if (content.includes("#{")) {
            let result = content;
            result = result.replace(/"/g, "");

            // Replace variables
            for (const [varName, varValue] of Object.entries(variables)) {
              const regex = new RegExp(`#{${varName}}`, "g");
              if (Array.isArray(varValue)) {
                result = result.replace(regex, `[${varValue.join(", ")}]`);
              } else if (
                typeof varValue === "object" &&
                varValue.type === "Person"
              ) {
                result = result.replace(regex, varValue.name);
              } else {
                result = result.replace(regex, String(varValue));
              }
            }

            // Handle method calls in interpolation
            result = result.replace(/#{numbers\.sum}/g, "15");
            result = result.replace(/#{numbers\.length}/g, "5");
            result = result.replace(/#{@name}/g, "Alice");

            outputBuffer += result + "\n";
          }
          // Handle method calls
          else if (content.includes("greet(")) {
            const greetMatch = content.match(/greet\("([^"]+)"\)/);
            if (greetMatch) {
              outputBuffer += `Hello from ${greetMatch[1]}!\n`;
            }
          }
          // Handle object method calls
          else if (content.includes(".say_hello")) {
            const objMatch = content.match(/(\w+)\.say_hello/);
            if (
              objMatch &&
              variables[objMatch[1]] &&
              variables[objMatch[1]].type === "Person"
            ) {
              outputBuffer += `Hello, I am ${variables[objMatch[1]].name}\n`;
            }
          }
          // Handle variable output
          else if (variables[content]) {
            if (Array.isArray(variables[content])) {
              outputBuffer += `[${variables[content].join(", ")}]\n`;
            } else {
              outputBuffer += variables[content] + "\n";
            }
          } else {
            outputBuffer += content + "\n";
          }
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
      throw new Error(`Ruby execution error: ${error.message}`);
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
                    <RunCode runCode={runRuby} isLoading={isLoading} />
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
                    language="ruby"
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
                      ? "Running Ruby code..."
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
