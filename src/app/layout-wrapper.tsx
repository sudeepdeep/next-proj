/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import UIStore from "./store";
import { HeaderComponentLight } from "./components/header";
import Footer from "./footer";

const LayoutWrapper = ({ children }: any) => {
  const ui: any = UIStore.useState();
  return (
    <div
      className={`min-h-screen ${
        ui.theme == "light"
          ? "bg-gray-50 text-black"
          : "bg-[#171717] text-white"
      }`}
    >
      {!ui.hideContent && <HeaderComponentLight />}
      {children}
      {!ui.hideContent && <Footer />}
    </div>
  );
};

export default LayoutWrapper;
