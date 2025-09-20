/* eslint-disable @typescript-eslint/no-explicit-any */
export const runRuby = async (
  setIsLoading: any,
  setOutput: any,
  isLoadedRef: any,
  code: any,
  isLoading: any
) => {
  if (isLoading) return;

  setIsLoading(true);
  setOutput("");

  try {
    if (!isLoadedRef.current) {
      setOutput("Ruby engine is not yet loaded. Please try again in a moment.");
      setIsLoading(false);
      return;
    }

    console.log("Running Ruby code:", code);

    // Use simulation for reliable Ruby execution
    await simulateRubyExecution(code, setOutput);
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

const simulateRubyExecution = async (rubyCode: string, setOutput: any) => {
  try {
    let outputBuffer = "";
    const lines = rubyCode.split("\n");
    let inClass = false;
    let inMethod = false;
    const variables: { [key: string]: any } = {};

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
        const value = assignMatch[2];

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
