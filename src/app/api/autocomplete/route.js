// Example Next.js API route for AI autocompletion
// Save this as: src/app/api/autocomplete/route.js

import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(request) {
  try {
    const {
      code,
      language,
      cursorPosition,
      backend = "fallback",
    } = await request.json();

    // Validate input
    if (!code || !language) {
      return NextResponse.json(
        {
          error: "Missing required fields: code and language",
        },
        { status: 400 }
      );
    }

    // Path to your Python autocompletion script
    const scriptPath = path.join(process.cwd(), "autocompletionagent.py");
    console.log(backend);
    // Prepare command arguments
    const args = [
      scriptPath,
      "--backend",
      backend,
      "--code",
      code,
      "--language",
      language,
      "--cursor",
      (cursorPosition || code.length).toString(),
      "--max-tokens",
      "100", // Limit for faster responses
    ];

    // For production, you might want to use specific models
    if (backend === "ollama") {
      args.push("--model", "codellama:7b-code");
    } else if (backend === "huggingface") {
      args.push("--model", "microsoft/CodeGPT-small-py");
      // Add API token if available
      if (process.env.HUGGINGFACE_TOKEN) {
        args.push("--api-token", process.env.HUGGINGFACE_TOKEN);
      }
    }

    // Execute Python script
    const pythonProcess = spawn("python", args, {
      cwd: process.cwd(),
      stdio: ["pipe", "pipe", "pipe"],
    });

    console.log(pythonProcess);
    let result = "";
    let error = "";

    // Collect output
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    // Return promise that resolves when process completes
    return new Promise((resolve) => {
      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          console.error("Python process error:", error);
          resolve(
            NextResponse.json(
              {
                error: "Autocompletion service error",
                details: error,
              },
              { status: 500 }
            )
          );
          return;
        }

        try {
          const completion = JSON.parse(result);

          // Add metadata
          completion.backend = backend;
          completion.timestamp = new Date().toISOString();

          resolve(NextResponse.json(completion));
        } catch (parseError) {
          console.error("Failed to parse completion result:", parseError);
          resolve(
            NextResponse.json(
              {
                error: "Failed to parse completion result",
                raw_output: result,
              },
              { status: 500 }
            )
          );
        }
      });

      // Set timeout to prevent hanging
      setTimeout(() => {
        pythonProcess.kill();
        resolve(
          NextResponse.json(
            {
              error: "Autocompletion timeout",
            },
            { status: 408 }
          )
        );
      }, 10000); // 10 second timeout
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: "AI Autocompletion API is running",
    backends: ["fallback", "ollama", "huggingface", "smolagents"],
    version: "1.0.0",
  });
}
