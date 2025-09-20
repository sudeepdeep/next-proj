/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const runJavaScript = async (
  code: any,
  setOutput: any,
  setIsLoading: any
) => {
  try {
    setIsLoading(true);
    console.log("Running JavaScript code:", code);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: (...args: any[]) => {
        logs.push(`❌ Error: ${args.map((arg) => String(arg)).join(" ")}`);
      },
      warn: (...args: any[]) => {
        logs.push(`⚠️ Warning: ${args.map((arg) => String(arg)).join(" ")}`);
      },
      info: (...args: any[]) => {
        logs.push(`ℹ️ Info: ${args.map((arg) => String(arg)).join(" ")}`);
      },
      debug: (...args: any[]) => {
        logs.push(`🐛 Debug: ${args.map((arg) => String(arg)).join(" ")}`);
      },
      table: (data: any) => {
        logs.push(`📊 Table: ${JSON.stringify(data, null, 2)}`);
      },
      clear: () => {
        logs.length = 0;
      },
    };

    // Create a safe execution environment
    const safeGlobals = {
      console: mockConsole,
      Math,
      Date,
      JSON,
      Array,
      Object,
      String,
      Number,
      Boolean,
      RegExp,
      parseInt,
      parseFloat,
      isNaN,
      isFinite,
      encodeURIComponent,
      decodeURIComponent,
      setTimeout: (fn: Function, delay: number) => {
        // Simulate setTimeout for demo purposes (limited functionality)
        logs.push(`⏰ setTimeout called with delay: ${delay}ms`);
        try {
          fn();
        } catch (error: any) {
          logs.push(`❌ setTimeout Error: ${error.message}`);
        }
      },
      setInterval: () => {
        logs.push("⚠️ setInterval is not supported in this environment");
      },
    };

    // Create function with safe globals
    const func = new Function(
      ...Object.keys(safeGlobals),
      `
        "use strict";
        try {
          ${code}
        } catch(error) {
          console.error(error.message);
          throw error;
        }
      `
    );

    // Execute the code with safe globals
    func(...Object.values(safeGlobals));

    // Set output
    if (logs.length > 0) {
      setOutput(logs.join("\n"));
    } else {
      setOutput("Code executed successfully (no output)");
    }
  } catch (error: any) {
    console.error("JavaScript execution error:", error);
    let errorMessage = "An error occurred while executing JavaScript code.";

    if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    setOutput(`❌ Execution Error: ${errorMessage}`);
  } finally {
    setIsLoading(false);
  }
};
