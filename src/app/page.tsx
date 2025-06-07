"use client";
import { useEffect, useState } from "react";
import Footer from "./footer";
import HomePage from "./home/home";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [hideContent, setHideContent] = useState(false);
  function handleThemeChange() {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  function handleHideContent() {
    setHideContent(!hideContent);
  }

  useEffect(() => {
    const theme = localStorage.getItem("comp-theme");
    if (theme && theme == "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);
  return (
    <div className={`${theme == "dark" ? "bg-[#171717]" : "bg-gray-50"}`}>
      <HomePage
        theme={theme}
        onChange={handleThemeChange}
        hideContent={hideContent}
        onHideContent={handleHideContent}
      />
      {!hideContent && <Footer />}
    </div>
  );
}
