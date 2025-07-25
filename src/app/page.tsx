/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import HomePage from "./home/home";
import UIStore from "./store";

export default function Home() {
  const ui: any = UIStore.useState();

  useEffect(() => {
    const theme = localStorage.getItem("comp-theme");
    if (theme && theme == "light") {
      UIStore.update((s) => {
        s.theme = "light";
      });
    } else {
      UIStore.update((s) => {
        s.theme = "dark";
      });
    }
  }, []);
  return (
    <main>
      <section
        className={`${ui.theme == "dark" ? "bg-[#171717]" : "bg-gray-50"}`}
      >
        <HomePage />
      </section>
    </main>
  );
}
