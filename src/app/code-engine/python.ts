/* eslint-disable @typescript-eslint/no-explicit-any */
export const runPython = (
  setShowCanvas: any,
  canvasRef: any,
  code: any,
  setOutput: any,
  isLoadedRef: any
) => {
  setShowCanvas(true);

  requestAnimationFrame(() => {
    if (!canvasRef.current) {
      setOutput("Canvas not mounted yet.");
      return;
    }

    // console.log(code);
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
      .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
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
