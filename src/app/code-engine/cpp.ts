/* eslint-disable @typescript-eslint/no-explicit-any */
export const runCpp = async (
  isLoading: any,
  setIsLoading: any,
  setOutput: any,
  isLoadedRef: any,
  code: any
) => {
  if (isLoading) return;

  setIsLoading(true);
  setOutput("");

  try {
    if (!isLoadedRef.current || !(window as any).JSCPP) {
      setOutput("C++ engine is not yet loaded. Please try again in a moment.");
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
