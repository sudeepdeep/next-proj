/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import UIStore from "../store";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaChevronDown,
  FaPlay,
  FaCode,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";
import { languages } from "@/lib/languages";
import { articles } from "@/lib/articles";
import Image from "next/image";

const HomePage = () => {
  useEffect(() => {
    UIStore.update((s) => {
      s.hideContent = true;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Programs Section */}
      <div id="explore">
        <ProgramsSection />
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Latest Blogs */}
      <div id="insights">
        <BlogSection />
      </div>

      {/* Glowing Code Block */}
      <GlowingCodeSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,87,87,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,145,77,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#ff5757] to-[#ff914d] rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-[60px] flex items-center justify-center">
            <Image src="syntaxz-dark.png" width={140} height={140} alt="" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            Code Without
            <br />
            <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
              Boundaries
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The most powerful online compiler that supports 8+ programming
            languages. Write, run, and share code instantly — all in your
            browser.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#explore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#ff5757] to-[#ff914d] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
              >
                <FaPlay className="w-4 h-4" />
                Start Coding
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#ff914d] dark:hover:border-[#ff914d] transition-all duration-300 flex items-center gap-2"
              >
                <FaCode className="w-4 h-4" />
                About
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: "8+", label: "Languages" },
            { number: "100K+", label: "Developers" },
            { number: "1M+", label: "Code Runs" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-[#ff5757] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Programs Section Component
const ProgramsSection = () => {
  const languageDescriptions = {
    javascript:
      "The language of the web. Build interactive websites and modern applications.",
    python:
      "Versatile and beginner-friendly. Perfect for data science, AI, and web development.",
    java: "Enterprise-grade language. Build scalable applications and Android apps.",
    cpp: "High-performance programming. System programming and competitive coding.",
    php: "Server-side scripting. Power dynamic websites and web applications.",
    go: "Modern systems language. Fast, simple, and built for the cloud.",
    ruby: "Developer happiness focused. Elegant syntax for web development.",
    r: "Statistical computing powerhouse. Data analysis and visualization.",
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
              {" "}
              Language
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From web development to data science, we support all the languages
            you love
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={`/learn/${lang.slug}`}>
                <div className="bg-white dark:bg-gray-900 h-[280px] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#ff914d] dark:hover:border-[#ff914d] relative overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5757]/10 to-[#ff914d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:bg-gradient-to-r group-hover:from-[#ff5757] group-hover:to-[#ff914d] transition-all duration-300">
                      <img
                        src={`/${lang.slug}.svg`}
                        alt={`${lang.name} logo`}
                        className="w-full h-full object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#ff5757] transition-colors">
                      {lang.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {
                        languageDescriptions[
                          lang.slug as keyof typeof languageDescriptions
                        ]
                      }
                    </p>

                    <div className="mt-4 flex items-center text-[#ff5757] font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Learn more <FaArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      company: "Google",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content:
        "Syntaxz has revolutionized how I prototype and test code. The instant execution and clean interface make it perfect for quick experiments and sharing code snippets with my team.",
    },
    {
      name: "Marcus Rodriguez",
      role: "CS Student",
      company: "MIT",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content:
        "As a computer science student, I use Syntaxz daily for assignments and practice. The multi-language support and dark mode make coding sessions comfortable and productive.",
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      company: "Netflix",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "The Python support is exceptional. I can quickly test data analysis scripts and share results with colleagues. It's become an essential tool in my workflow.",
    },
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      company: "Stripe",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content:
        "Clean, fast, and reliable. Syntaxz feels like a native desktop application but runs entirely in the browser. The performance is incredible.",
    },
    {
      name: "Lisa Wang",
      role: "Tech Lead",
      company: "Vercel",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      content:
        "We use Syntaxz for technical interviews and code reviews. The ability to collaborate in real-time and run code instantly has streamlined our hiring process.",
    },
    {
      name: "David Kim",
      role: "Freelance Developer",
      company: "Independent",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content:
        "Perfect for client demos and rapid prototyping. I can show working code immediately without any setup. It's saved me countless hours in client meetings.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % Math.ceil(testimonials.length / 3)
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Others
            <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
              {" "}
              Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Trusted by developers, students, and companies worldwide
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials
                .slice(currentIndex * 3, currentIndex * 3 + 3)
                .map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-[#ff5757] to-[#ff914d]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section Component
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is Syntaxz completely free to use?",
      answer:
        "Yes! Syntaxz is completely free to use. You can compile and run code in all supported languages without any cost or registration required.",
    },
    {
      question: "Do I need to install anything to use Syntaxz?",
      answer:
        "No installation required! Syntaxz runs entirely in your browser. Just visit our website and start coding immediately.",
    },
    {
      question: "Which programming languages are supported?",
      answer:
        "We support 8+ popular programming languages including JavaScript, Python, Java, C++, PHP, Go, Ruby, and R. We're constantly adding more languages based on user demand.",
    },
    {
      question: "Can I save and share my code?",
      answer:
        "Yes! You can save your code locally and share it with others through direct links. We also provide options to download your code files.",
    },
    {
      question: "Is my code secure and private?",
      answer:
        "Absolutely. Your code is processed securely and we don't store your code on our servers unless you explicitly choose to save it. All execution happens in isolated environments.",
    },
    {
      question: "Can I use Syntaxz for commercial projects?",
      answer:
        "Yes, you can use Syntaxz for both personal and commercial projects. There are no restrictions on the type of code you can run or develop.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
              {" "}
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about Syntaxz
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="w-5 h-5 text-[#ff5757] flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Blog Section Component
const BlogSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest
            <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
              {" "}
              Insights
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest in programming, tutorials, and tech
            insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={article.url} target="_blank">
                <div className="bg-gray-50 dark:bg-gray-800 h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#ff914d] dark:hover:border-[#ff914d]">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`/${article.image}`}
                      alt={article.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-[#ff5757] transition-colors line-clamp-2">
                      {article.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      {article.description}
                    </p>

                    <div className="flex items-center text-[#ff5757] font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Read more <FaArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#ff5757] to-[#ff914d] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <FaBookOpen className="w-4 h-4" />
              View All Blogs
              <FaArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div> */}
      </div>
    </section>
  );
};

// Glowing Code Section Component
const GlowingCodeSection = () => {
  const [currentCode, setCurrentCode] = useState(0);

  const codeExamples = [
    {
      language: "JavaScript",
      code: `// Modern JavaScript ES6+
const greetUser = (name) => {
  return \`Hello, \${name}! Welcome to Syntaxz.\`;
};

console.log(greetUser("Developer"));`,
    },
    {
      language: "Python",
      code: `# Python - Simple and elegant
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(f"Fibonacci(10): {fibonacci(10)}")`,
    },
    {
      language: "Java",
      code: `// Java - Enterprise ready
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Syntaxz!");
        
        int[] numbers = {1, 2, 3, 4, 5};
        Arrays.stream(numbers)
              .forEach(System.out::println);
    }
}`,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % codeExamples.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [codeExamples.length]);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden h-[800px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience the
            <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
              {" "}
              Magic
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See your code come to life with our advanced editor and instant
            execution
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff5757]/20 to-[#ff914d]/20 rounded-3xl blur-3xl"></div>
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-3xl backdrop-blur-sm"></div>

          {/* Code terminal */}
          <div className="relative bg-gray-900 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-gray-400 text-sm font-mono">
                {codeExamples[currentCode].language}
              </div>
            </div>

            {/* Code content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={currentCode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto"
                >
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(codeExamples[currentCode].code),
                    }}
                  />
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Code highlighting function
const highlightCode = (code: string) => {
  return code
    .replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')
    .replace(/#.*$/gm, '<span class="text-gray-500">$&</span>')
    .replace(
      /\b(const|let|var|function|class|public|static|void|int|String|def|return|if|else|for|while|import|from|package)\b/g,
      '<span class="text-blue-400">$1</span>'
    )
    .replace(
      /\b(console|System|print|println)\b/g,
      '<span class="text-green-400">$1</span>'
    )
    .replace(/"([^"]*)"/g, '<span class="text-yellow-300">"$1"</span>')
    .replace(/'([^']*)'/g, "<span class=\"text-yellow-300\">'$1'</span>")
    .replace(/`([^`]*)`/g, '<span class="text-yellow-300">`$1`</span>');
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="favicon.png"
                alt=""
                width={30}
                height={30}
                className="mr-2"
              />
              <h3 className="text-2xl font-bold">Syntaxz</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The most powerful online compiler that supports 8+ programming
              languages. Write, run, and share code instantly — all in your
              browser.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/syntaxzofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ff5757] hover:to-[#ff914d] transition-all duration-300"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/syntaxzcompiler"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ff5757] hover:to-[#ff914d] transition-all duration-300"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/syntaxz-compiler-b46b9a376/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ff5757] hover:to-[#ff914d] transition-all duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#explore"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Compilers
                </Link>
              </li>
              <li>
                <Link
                  href="#explore"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  href="#insights"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Languages</h4>
            <ul className="space-y-2">
              {languages.slice(0, 4).map((lang) => (
                <li key={lang.slug}>
                  <Link
                    href={`/learn/${lang.slug}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {lang.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Syntaxz. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomePage;
