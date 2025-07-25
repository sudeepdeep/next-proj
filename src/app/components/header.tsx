/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ClearConsole from "./clearconsole";
import { RunCode2 } from "./runcode";
import ThemeChangeButton from "./themechange";
import UIStore from "../store";

const HeaderComponent = ({ clearOutput, runCode, isLoading }: any) => {
  const ui: any = UIStore.useState();
  const theme: any = ui.theme;
  function handleThemeChange() {
    if (ui.theme == "light") {
      UIStore.update((s) => {
        s.theme = "dark";
      });
    }
    if (ui.theme == "dark") {
      const html = document.documentElement;
      html.classList.toggle("dark");
      UIStore.update((s) => {
        s.theme = "light";
      });
    }
  }

  return (
    <>
      <div
        className={`${
          theme == "dark"
            ? "bg-[#2D2D2D] border-black"
            : "bg-white border-white"
        } shadow-sm border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src={`${
                    theme == "dark" ? `/syntaxz-dark.png` : `/syntaxz-light.png`
                  }`}
                  width={120}
                  height={120}
                  alt="syntaxz"
                />
              </Link>
            </div>
            <div className="flex gap-3 items-center">
              <ClearConsole clearOutput={clearOutput} />
              <RunCode2 runCode={runCode} isLoading={isLoading} />
              <ThemeChangeButton onChange={handleThemeChange} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const HeaderComponentLight = () => {
  const uiTheme = UIStore.useState();
  console.log(uiTheme);
  function onChange() {
    UIStore.update((s) => {
      s.theme = uiTheme.theme == "light" ? "dark" : "light";
    });
  }
  return (
    <>
      <div
        className={`${
          uiTheme.theme == "dark"
            ? " border-black bg-[#2D2D2D]"
            : "border-b border-gray-200 bg-gray-50"
        } shadow-sm border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src={`${
                  uiTheme.theme == "dark"
                    ? `/syntaxz-dark.png`
                    : `/syntaxz-light.png`
                }`}
                width={120}
                height={120}
                alt="Syntaxz - Home"
              />
            </Link>
            <div className="flex gap-3 items-center">
              <ThemeChangeButton onChange={onChange} theme={uiTheme.theme} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
