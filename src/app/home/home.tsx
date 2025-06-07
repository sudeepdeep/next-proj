/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import ThemeChangeButton from "../components/themechange";

const languages = [
  { name: "JavaScript", slug: "javascript", available: true },
  { name: "Python", slug: "python", available: false },
  { name: "R", slug: "r", available: false },
  { name: "C++", slug: "cpp", available: false },
  { name: "Java", slug: "java", available: false },
];

const HomePage = ({ theme, onChange, hideContent }: any) => {
  return (
    <main className={`min-h-screen ${theme == "light" && "bg-gray-50"}`}>
      <header>
        {!hideContent && (
          <>
            <div
              className={`${
                theme == "dark" ? " border-black" : " border-white"
              } shadow-sm border-b`}
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <h1
                    className={`text-2xl font-bold ${
                      theme == "dark" ? "text-white" : "text-gray-800"
                    } `}
                  >
                    syntaxz
                    {/* <span className="text-blue-600">X</span> */}
                    <span className="text-[10px] ml-0.5">.com</span>
                  </h1>
                  <div className="flex gap-3 items-center">
                    <ThemeChangeButton onChange={onChange} theme={theme} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      <div
        className={`${
          theme == "dark" ? "bg-[#2D2D2D] text-white" : "bg-white text-black"
        } w-full min-h-[100vh] h-auto px-[10%] text-center pt-2`}
      >
        <h1
          className={`text-4xl font-bold ${
            theme == "dark" ? "text-white" : "text-gray-800"
          }  mb-4`}
        >
          Syntaxz
        </h1>
        <p
          className={`${
            theme == "dark" ? "text-white" : "text-gray-800"
          } mb-10`}
        >
          Instantly write and run code online. Currently supporting JavaScript,
          with more languages coming soon!
        </p>
        <div className="mb-2.5">
          <Link href={"/about"}>About</Link> |{" "}
          <Link href={"/contact"}>Contact us</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <div
              key={lang.slug}
              className={`rounded-lg p-6 border shadow-md ${
                lang.available ? "bg-white" : "bg-gray-200 opacity-60"
              }`}
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {lang.name}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {lang.available
                  ? `Try out ${lang.name} code directly in your browser.`
                  : `${lang.name} support coming soon.`}
              </p>
              {lang.available ? (
                <Link
                  href={`/compilers/${lang.slug}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Try Now
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-block bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
        <section className="mt-16 text-center">
          <h2
            className={`text-3xl font-bold 
            ${theme == "dark" ? "text-white" : "text-gray-800"}
            mb-4`}
          >
            Learn for Free 🚀
          </h2>
          <p
            className={`
            ${theme == "dark" ? "text-white" : "text-gray-800"}
            max-w-2xl mx-auto mb-6`}
          >
            We're not just a code compiler — we also help you learn to code! We
            handpick and organize the best free programming courses and
            tutorials available across platforms like YouTube, freeCodeCamp,
            Coursera, and more.
          </p>
          <p
            className={`
            ${theme == "dark" ? "text-white" : "text-gray-800"}
            max-w-2xl mx-auto mb-1.5`}
          >
            Whether you're a beginner or want to sharpen your skills, you’ll
            find high-quality content to boost your programming journey — all
            100% free.
          </p>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
