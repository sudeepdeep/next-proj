/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React from "react";

const RunCode = ({ runCode }: any) => {
  return (
    <>
      <div className="border-2 rounded-sm cursor-pointer">
        <Image
          title="run code"
          onClick={runCode}
          alt="JavaScript logo"
          src="/run-icon-white.svg"
          width={20}
          height={20}
        />
      </div>
    </>
  );
};

export const RunCode2 = ({ runCode, isLoading }: any) => {
  return (
    <>
      <button
        onClick={runCode}
        disabled={isLoading}
        className="md:flex hidden px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors items-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Running...
          </>
        ) : (
          "▶ Run Code"
        )}
      </button>
    </>
  );
};

export default RunCode;
