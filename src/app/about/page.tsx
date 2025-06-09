/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <Link href="/">
          <Image
            src="/syntaxz-light.png"
            width={200}
            height={200}
            alt="syntaxz-logo"
          />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Syntaxz</h1>
        <p className="text-gray-700 mb-4">
          <strong>Syntaxz</strong> is an online coding platform that allows
          users to write, run, and share code instantly in various programming
          languages — right from the browser.
        </p>
        <p className="text-gray-700 mb-4">
          We aim to make coding more accessible and enjoyable by providing a
          simple, distraction-free environment to experiment with code. Whether
          you're a beginner learning the basics or an experienced developer
          testing ideas quickly, Syntaxz is built to support you.
        </p>
        <p className="text-gray-700 mb-4">
          Currently, Syntaxz supports JavaScript, and we plan to expand soon to
          other popular languages like Python, R, C++, and more. Our mission is
          to combine powerful tools with free learning resources, making coding
          education and practice available to everyone.
        </p>
        <p className="text-gray-700">
          Stay tuned for tutorials, coding challenges, and curated free courses
          from top platforms and YouTube creators — all integrated into one
          seamless platform.
        </p>
      </div>
    </main>
  );
};

export default About;
