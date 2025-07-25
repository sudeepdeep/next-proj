// React hook for AI autocompletion integration with Monaco Editor
// This can be used in your existing editor components

import { useCallback, useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";

interface AutocompletionConfig {
  backend?: "fallback" | "ollama" | "huggingface" | "smolagents";
  enabled?: boolean;
  debounceMs?: number;
  maxSuggestions?: number;
}

interface CompletionResult {
  completion: string;
  confidence: number;
  suggestions: string[];
  error?: string;
  backend?: string;
  timestamp?: string;
}

export const useAIAutocompletion = (
  language: string,
  config: AutocompletionConfig = {}
) => {
  const {
    backend = "fallback",
    enabled = true,
    debounceMs = 500,
    maxSuggestions = 5,
  } = config;

  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const cacheRef = useRef<Map<string, CompletionResult>>(
    new Map<string, CompletionResult>()
  );

  const getCompletion = useCallback(
    async (
      code: string,
      position: number
    ): Promise<CompletionResult | null> => {
      // Create cache key
      const cacheKey = `${code.slice(0, position)}_${language}_${backend}`;

      // Check cache first
      if (cacheRef.current.has(cacheKey)) {
        return cacheRef.current.get(cacheKey)!;
      }

      try {
        const response = await fetch("/api/autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: code.slice(0, position), // Only send code up to cursor
            language,
            cursorPosition: position,
            backend,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result: CompletionResult = await response.json();

        // Cache successful results
        if (!result.error) {
          cacheRef.current.set(cacheKey, result);

          // Limit cache size
          if (cacheRef.current.size > 100) {
            const firstKey = cacheRef.current.keys().next().value;
            if (firstKey) {
              cacheRef.current.delete(firstKey);
            }
          }
        }

        return result;
      } catch (error) {
        console.error("Autocompletion error:", error);
        return null;
      }
    },
    [language, backend]
  );

  const registerCompletionProvider = useCallback(
    (monacoInstance: typeof monaco) => {
      if (!enabled) return null;

      const provider = monacoInstance.languages.registerCompletionItemProvider(
        language,
        {
          triggerCharacters: [".", "(", " ", "\n"],

          provideCompletionItems: async (model, position) => {
            // Clear any existing debounce
            if (debounceRef.current) {
              clearTimeout(debounceRef.current);
            }

            // Return promise that resolves after debounce
            return new Promise((resolve) => {
              debounceRef.current = setTimeout(async () => {
                try {
                  const code = model.getValue();
                  const offset = model.getOffsetAt(position);

                  // Don't trigger on very short code
                  if (code.length < 3) {
                    resolve({ suggestions: [] });
                    return;
                  }

                  const completion = await getCompletion(code, offset);

                  if (!completion || completion.error) {
                    resolve({ suggestions: [] });
                    return;
                  }

                  // Convert AI suggestions to Monaco suggestions
                  const suggestions = completion.suggestions
                    .slice(0, maxSuggestions)
                    .map((suggestion, index) => {
                      // Determine the appropriate completion kind
                      let kind =
                        monacoInstance.languages.CompletionItemKind.Text;

                      if (
                        suggestion.includes("def ") ||
                        suggestion.includes("function ")
                      ) {
                        kind =
                          monacoInstance.languages.CompletionItemKind.Function;
                      } else if (suggestion.includes("class ")) {
                        kind =
                          monacoInstance.languages.CompletionItemKind.Class;
                      } else if (
                        suggestion.includes("import ") ||
                        suggestion.includes("from ")
                      ) {
                        kind =
                          monacoInstance.languages.CompletionItemKind.Module;
                      } else if (suggestion.includes("=")) {
                        kind =
                          monacoInstance.languages.CompletionItemKind.Variable;
                      }

                      return {
                        label: suggestion,
                        kind,
                        insertText: suggestion,
                        detail: `AI Suggestion (${Math.round(
                          completion.confidence * 100
                        )}% confidence)`,
                        documentation: `Generated by ${
                          completion.backend || backend
                        } backend`,
                        sortText: `0${index.toString().padStart(2, "0")}`, // Higher priority
                        filterText: suggestion,
                        range: {
                          startLineNumber: position.lineNumber,
                          endLineNumber: position.lineNumber,
                          startColumn: position.column,
                          endColumn: position.column,
                        },
                      };
                    });

                  resolve({ suggestions });
                } catch (error) {
                  console.error("Completion provider error:", error);
                  resolve({ suggestions: [] });
                }
              }, debounceMs);
            });
          },
        }
      );

      return provider;
    },
    [language, enabled, backend, debounceMs, maxSuggestions, getCompletion]
  );

  // Cleanup function
  const cleanup = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    cacheRef.current.clear();
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    registerCompletionProvider,
    getCompletion,
    cleanup,
    isEnabled: enabled,
  };
};

// Example usage in your existing editor component
export const ExampleEditorWithAI = ({ language = "python" }) => {
  const { registerCompletionProvider } = useAIAutocompletion(language, {
    backend: "fallback", // Start with fallback, upgrade to ollama/huggingface later
    enabled: true,
    debounceMs: 300,
    maxSuggestions: 3,
  });

  useEffect(() => {
    // This would be called when Monaco is loaded
    // const setupAutocompletion = (monacoInstance: typeof monaco) => {
    //   const disposable = registerCompletionProvider(monacoInstance);
    //   return () => {
    //     if (disposable) {
    //       disposable.dispose();
    //     }
    //   };
    // };
    // In your actual component, you'd call this when Monaco is ready
    // setupAutocompletion(monaco);
  }, [registerCompletionProvider]);

  return (
    <div>
      {/* Your Monaco Editor component would go here */}
      <p>AI Autocompletion enabled for {language}</p>
    </div>
  );
};

// Advanced hook with multiple backends and fallback
export const useAdvancedAIAutocompletion = (language: string) => {
  const backends = ["ollama", "huggingface", "fallback"] as const;
  const [currentBackend, setCurrentBackend] = useState(0);

  const { registerCompletionProvider, getCompletion } = useAIAutocompletion(
    language,
    {
      backend: backends[currentBackend],
      enabled: true,
    }
  );

  const getCompletionWithFallback = useCallback(
    async (
      code: string,
      position: number
    ): Promise<CompletionResult | null> => {
      for (let i = currentBackend; i < backends.length; i++) {
        try {
          const result = await getCompletion(code, position);
          if (result && !result.error) {
            // If we're not using the preferred backend, try to switch back
            if (i !== 0) {
              setCurrentBackend(0);
            }
            return result;
          }
        } catch {
          console.warn(`Backend ${backends[i]} failed, trying next...`);
        }
      }

      // All backends failed
      return null;
    },
    [currentBackend, getCompletion]
  );

  return {
    registerCompletionProvider,
    getCompletion: getCompletionWithFallback,
    currentBackend: backends[currentBackend],
    switchBackend: (index: number) => setCurrentBackend(index),
    availableBackends: backends,
  };
};
