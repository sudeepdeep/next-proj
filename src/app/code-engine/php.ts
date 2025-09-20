/* eslint-disable @typescript-eslint/no-explicit-any */
export const runPhp = async (
  isLoading: any,
  setIsLoading: any,
  setOutput: any,
  code: any,
  isLoadedRef: any
) => {
  if (isLoading) return;

  setIsLoading(true);
  setOutput("");

  try {
    console.log(isLoadedRef.current);
    console.log((window as any).uniter);
    if (!isLoadedRef.current || !(window as any).uniter) {
      setOutput("PHP engine is not yet loaded. Please try again in a moment.");
      setIsLoading(false);
      return;
    }

    console.log("Running PHP code:", code);

    const uniter = (window as any).uniter;
    let outputBuffer = "";

    // Create PHP engine with correct language specification
    const phpEngine = uniter.createEngine("PHP", {
      include: (path: string, promise: any) => {
        promise.reject(new Error(`Include not supported: ${path}`));
      },
    });

    // Capture output
    phpEngine.getStdout().on("data", (data: string) => {
      outputBuffer += data;
    });

    phpEngine.getStderr().on("data", (data: string) => {
      outputBuffer += `Error: ${data}`;
    });

    // Execute PHP code
    await phpEngine.execute(code);

    setOutput(outputBuffer || "Code executed successfully (no output)");
  } catch (error: any) {
    console.error("PHP execution error:", error);
    let errorMessage = "An error occurred while executing PHP code.";

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
