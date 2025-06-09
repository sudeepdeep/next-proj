/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import UIStore from "../store";
import Image from "next/image";
import Link from "next/link";

const LogoShift = () => {
  const ui: any = UIStore.useState();
  return (
    <>
      <Link href="/" aria-label="Go to homepage">
        <Image
          src={`${
            ui.theme == "dark" ? "/syntaxz-dark.png" : "/syntaxz-light.png"
          }`}
          alt="syntaxz - Home"
          width={120}
          height={120}
        />
      </Link>
    </>
  );
};

export default LogoShift;
