/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";

const languages = [
  { name: "JavaScript", slug: "javascript", available: true },
  { name: "Python", slug: "python", available: false },
  { name: "R", slug: "r", available: false },
  { name: "C++", slug: "cpp", available: false },
  { name: "Java", slug: "java", available: false },
];

const HomePage = ({ theme }: any) => {
  return (
    <main className={`min-h-screen ${theme == "light" && "bg-gray-50"}`}>
      <header></header>

      <div
        className={`${
          theme == "dark" ? "bg-[#171717] text-white" : "bg-white text-black"
        } w-full min-h-[70vh] h-auto px-[2%] text-center pt-2  flex flex-col md:flex-row items-center justify-between`}
      >
        <div className="w-[100%] text-left">
          <h1
            className={`md:text-8xl text-4xl font-bold ${
              theme == "dark" ? "text-white" : "text-gray-800"
            }  mb-4`}
          >
            Syntaxz<span className="text-[#ff5757]">{"<"}</span>
            {"/"}
            <span className="text-[#ff914d]">{">"}</span> <br />
            Online Compiler
          </h1>
          <p>🟢Online Code Compiler for Multiple Languages</p>
          <p
            className={`${
              theme == "dark" ? "text-white" : "text-gray-800"
            } mb-10`}
          >
            ✅Instantly write and run code online.
            <br /> 📣Currently supporting JavaScript, with more languages coming
            soon!
          </p>
          <div className="mb-2.5">
            <Link className="text-blue-500" href={"/about"}>
              About
            </Link>{" "}
            |{" "}
            <Link className="text-blue-500" href={"/contact"}>
              Contact us
            </Link>
          </div>
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
      </div>

      <section className="mt-16 text-left px-[2%] flex md:flex-row flex-col items-center">
        <div className="md:w-[50%]">
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
            max-w-2xl mb-6`}
          >
            We're not just a code compiler — we also help you learn to code! We
            handpick and organize the best free programming courses and
            tutorials available across platforms like YouTube, freeCodeCamp,
            Coursera, and more.
          </p>
          <p
            className={`
            ${theme == "dark" ? "text-white" : "text-gray-800"}
            max-w-2xl mb-1.5`}
          >
            Whether you're a beginner or want to sharpen your skills, you’ll
            find high-quality content to boost your programming journey — all
            <b> 100% free</b>.
          </p>
        </div>
        <div className="md:w-[50%]">
          <Image src="/learn.png" width={600} height={600} alt="learn-image" />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
