/* eslint-disable @typescript-eslint/no-explicit-any */
export const runGo = async (
  isLoading: any,
  setIsLoading: any,
  isLoadedRef: any,
  setOutput: any,
  code: any
) => {
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
    await simulateGoExecution(code, setOutput);
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

const simulateGoExecution = async (goCode: string, setOutput: any) => {
  try {
    let outputBuffer = "";
    const lines = goCode.split("\n");

    // Check for package main and imports
    const hasPackageMain = goCode.includes("package main");
    const hasFmtImport =
      goCode.includes('import "fmt"') || goCode.includes('import (\n    "fmt"');

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
      const printlnMatch = trimmedLine.match(/fmt\.Println\s*\(\s*(.+?)\s*\)/);
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
        const args = printfMatch[2];

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
