/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React from "react";

const ThemeChangeButton = ({ onChange, theme }: any) => {
  return (
    <div className="cursor-pointer" onClick={onChange}>
      {theme == "dark" ? (
        <Image src="light-mode.svg" alt="light-mode" height={30} width={30} />
      ) : (
        <Image height={30} width={30} src="dark-mode.svg" alt="darkmode" />
      )}
    </div>
  );
};

export default ThemeChangeButton;
