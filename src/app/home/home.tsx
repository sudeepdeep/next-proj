/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import UIStore from "../store";
import { AiOutlineCode } from "react-icons/ai";
import { FiZap } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export const languages = [
  { name: "JavaScript", slug: "javascript", available: true },
  { name: "Python", slug: "python", available: true },
  { name: "R", slug: "r", available: true },
  { name: "C++", slug: "cpp", available: true },
  { name: "Java", slug: "java", available: true },
  { name: "PHP", slug: "php", available: true },
  { name: "GO", slug: "go", available: true },
  { name: "Ruby", slug: "ruby", available: true },
];

const HomePage = () => {
  useEffect(() => {
    UIStore.update((s) => {
      s.hideContent = true;
    });
  }, []);
  return (
    <div className={`min-h-screen dark:bg-gray-900`}>
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 sm:px-8 md:px-16 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="md:text-6xl text-4xl sm:text-5xl font-bold mb-4">
            Syntaxz <span className="text-[#ff914d]">&lt;</span>
            <span>/</span>
            <span className="text-[#ff5757]">&gt;</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Online Compiler – Code, Run & Debug in Your Browser
          </p>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Description */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">
              Write Code Instantly in Your Favorite Language
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-6">
              Syntaxz provides a powerful, fast, and secure online compiler that
              supports all major programming languages — including C, C++,
              Python, Java, and JavaScript. With our streamlined interface, you
              can start coding in seconds without any setup, installations, or
              configurations. <br />
              <br />
              Enjoy instant execution, syntax highlighting, dark mode, and
              multi-language support — all optimized for performance and ease of
              use.
            </p>
            <a href="#explore">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300">
                Start Coding
              </button>
            </a>
          </div>

          {/* Code Preview Box */}
          <div className="lg:w-1/2 w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 overflow-auto">
            <pre className="text-sm sm:text-base font-mono">
              <TypewriterCodeBlock />
            </pre>
          </div>
        </section>

        {/* Features Section (Optional) */}
        <section className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md"
            >
              <h3 className="font-semibold text-xl mb-1 text-gray-900 dark:text-white flex items-center gap-2">
                {feature.title}
                {feature.icon}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white">
        Languages
      </h2>
      <div
        id="explore"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {languages.map((lang) => (
          <div
            key={lang.slug}
            className="w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 mx-auto"
          >
            <div className="flex flex-col items-center p-6">
              <img
                className="w-20 h-20 mb-4  shadow-lg"
                src={`${lang.slug}.svg`}
                alt={`${lang.name} logo`}
              />
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {lang.name}
              </h5>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
                Try out {lang.name} code directly in your browser.
              </p>
              <div className="flex gap-3 mt-auto">
                <a
                  href={`/compilers/${lang.slug}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  Try Now
                </a>
                <a
                  href={`/learn/${lang.slug}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
                >
                  Learn
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-24 px-4 sm:px-8 lg:px-20 flex flex-col md:flex-row items-center gap-12">
        {/* Left Side: Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/learn.png"
            alt="Learn to code illustration"
            width={520}
            height={520}
            className="rounded-xl max-w-full h-auto"
          />
        </div>

        {/* Right Side: Text */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
            Master Programming — <br className="hidden sm:block" />
            Without Paying a Dime 💻
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6">
            Syntaxz helps you learn to code with curated, high-quality tutorials
            and courses — all for free. Whether you're just starting out or
            building on your skills, we've got resources to support your
            journey.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-4 mb-6">
            {[
              "Curated free content from YouTube, Coursera, and more",
              "Beginner to advanced-level topics",
              "No ads. No subscriptions. Just code.",
            ].map((point, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✔</span>
                <p className="text-gray-700 dark:text-gray-300">{point}</p>
              </div>
            ))}
          </div>

          <a
            href="#explore"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Browse Free Courses
          </a>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">
            What Developers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anjali K.",
                text: "Syntaxz helped me test code during interviews. It's fast, responsive, and beginner-friendly.",
              },
              {
                name: "Rohit M.",
                text: "No need to set up anything. Just open the browser and code. A lifesaver!",
              },
              {
                name: "Sarah J.",
                text: "Loved the dark mode and speed. Perfect for quick algorithm practice.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
              >
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{t.text}"
                </p>
                <div className="mt-4 font-semibold text-blue-600 dark:text-blue-400">
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Is it free to use Syntaxz?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes! You can compile and run code completely free of cost.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Do I need to install anything?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No installation needed. Just open the website and start coding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BlogPosts />
      <Footer />
    </div>
  );
};

export default HomePage;

const features = [
  {
    title: "Multiple Languages",
    desc: "Supports C, C++, Python, Java, JavaScript and more.",
    icon: (
      <AiOutlineCode className="text-blue-600 dark:text-blue-400 w-6 h-6" />
    ),
  },
  {
    title: "Instant Execution",
    desc: "No downloads or setups. Run your code in seconds.",
    icon: <FiZap className="text-green-600 dark:text-green-400 w-6 h-6" />,
  },
  {
    title: "Dark Mode",
    desc: "Code comfortably with full dark mode support.",
    icon: (
      <BsMoonStars className="text-yellow-500 dark:text-yellow-300 w-6 h-6" />
    ),
  },
];

import { motion } from "framer-motion";

const code = [
  `<span class="text-gray-400">// Welcome to Syntaxz!</span>`,
  `<span class="text-green-500">#include</span> <span class="text-yellow-300">&lt;stdio.h&gt;</span>`,
  ``,
  `<span class="text-blue-400">int</span> main() {`,
  `&nbsp;&nbsp;<span class="text-pink-400">printf</span>("Hello, World!\\n");`,
  `&nbsp;&nbsp;<span class="text-blue-400">return</span> 0;`,
  `}`,
];

export function TypewriterCodeBlock() {
  const [currentLine, setCurrentLine] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (currentLine >= code.length) {
      setFinished(true);
      return;
    }

    const line = code[currentLine];
    let charIndex = 0;

    const interval = setInterval(() => {
      charIndex++;
      setTypedText((prev) => {
        const lines = prev.split("\n");
        lines[currentLine] = line.slice(0, charIndex);
        return [...lines, ""].slice(0, currentLine + 1).join("\n");
      });

      if (charIndex >= line.length) {
        clearInterval(interval);
        setTimeout(() => setCurrentLine((prev) => prev + 1), 400);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentLine]);

  return (
    <div className="bg-gray-900 text-white font-mono text-sm p-4 rounded-lg shadow-md leading-relaxed">
      <div
        dangerouslySetInnerHTML={{
          __html: typedText.replace(/\n/g, "<br/>"),
        }}
      />
      {!finished && (
        <motion.span
          className="inline-block w-1 h-4 bg-white ml-1 align-middle"
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        />
      )}
    </div>
  );
}

export function BlogPosts() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-10">
          From Our Blog
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Example blog cards – replace with your Medium links */}
          {[
            {
              title:
                "⚡️ Run JavaScript Code Online Instantly – No Setup, Just Code",
              description:
                "Whether you're a beginner trying your first `console.log()` or a developer testing a quick script, writing JavaScript shouldn't require setting up a whole environment.",
              link: "https://medium.com/@syntaxz.com/%EF%B8%8F-run-javascript-code-online-instantly-no-setup-just-code-e741b43513e0",
            },
            {
              title:
                "SmolAgents: Building Lightweight Autonomous Agents with Ease",
              description:
                "In this post, we’ll explore what SmolAgents is, how it works, and why you might want to use it for your next AI agent project.",
              link: "https://medium.com/@syntaxz.com/smolagents-building-lightweight-autonomous-agents-with-ease-8b7a38355a63",
            },
            {
              title: "Build a Python Tool in Minutes",
              description:
                "Tired of writing boilerplate code? With SmolAgents, you can describe your idea in plain English and let an LLM do the rest. In this post, I’ll show you how I built a working Python CLI tool from a single prompt — in under 5 minutes.",
              link: "https://medium.com/@syntaxz.com/build-a-python-tool-in-minutes-using-smolagents-a97221c456ce",
            },
          ].map((post, i) => (
            <a
              key={i}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 p-6 block"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {post.description}
              </p>
              <span className="inline-block mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                Read more →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Syntaxz
          </h2>
          <p className="mt-2 text-sm">
            A modern, fast, and secure online compiler for developers. Write,
            run, and share code instantly — all in your browser.
          </p>
        </div>

        {/* Navigation */}

        <div>
          <h3 className="font-semibold mb-3">Languages</h3>
          <ul className="space-y-2 text-sm">
            {languages.map((item) => (
              <li>
                <Link href={`/learn/${item.slug}`} className="hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            {/* <li>
              <a
                href="https://github.com"
                target="_blank"
                className="hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="https://docs.syntaxz.com" className="hover:underline">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </li> */}
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://github.com"
              target="_blank"
              className="hover:text-gray-900 dark:hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-gray-900 dark:hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-gray-900 dark:hover:text-white"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Syntaxz. All rights reserved.
      </div>
    </footer>
  );
}
