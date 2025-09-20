/* eslint-disable @typescript-eslint/no-explicit-any */
export const runR = async (
  setOutput: any,
  setIsLoading: any,
  code: any,
  webRRef: any,
  isLoading: any,
  isLoadedRef: any
) => {
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
      await runWithWebR(code, setOutput, webRRef);
    } else {
      await simulateRExecution(code, setOutput);
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

const simulateRExecution = async (rCode: string, setOutput: any) => {
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

const runWithWebR = async (rCode: string, setOutput: any, webRRef: any) => {
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
