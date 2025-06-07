/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const ClearConsole = ({ clearOutput }: any) => {
  return (
    <div>
      <button
        onClick={clearOutput}
        className="md:block hidden px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        Clear Output
      </button>
    </div>
  );
};

export const ClearConsole2 = ({ clearOutput }: any) => {
  return (
    <div>
      <div
        className={`rounded-sm cursor-pointer`}
        onClick={clearOutput}
        title="clear console"
      >
        <Image
          alt="JavaScript logo"
          src="/clear-console.svg"
          width={20}
          height={20}
          className="flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default ClearConsole;
