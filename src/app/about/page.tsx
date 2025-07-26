"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UIStore from "../store";

// Team Member Component
interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, social }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 hover:-translate-y-2">
      <div className="text-center">
        <div className="relative mx-auto mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-[#ff5757] to-[#ff914d] p-1">
            <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-gray-600 dark:text-gray-300">
              {name.charAt(0)}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>
        <p className="text-sm font-medium text-[#ff5757] mb-4">{role}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
          {bio}
        </p>

        <div className="flex justify-center gap-3">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#ff5757] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#ff5757] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#ff5757] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Value Card Component
interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
  gradient,
}) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 hover:-translate-y-1">
      <div className="text-center">
        <div
          className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  number: string;
  label: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, icon }) => {
  return (
    <div className="text-center group">
      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-[#ff5757]/10 to-[#ff914d]/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-4xl font-bold bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-gray-600 dark:text-gray-300 font-medium">
        {label}
      </div>
    </div>
  );
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story");

  const teamMembers: TeamMemberProps[] = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Passionate about making coding accessible to everyone. 10+ years in software development and education technology.",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      bio: "Full-stack engineer with expertise in cloud infrastructure and developer tools. Former Google engineer.",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product strategist focused on user experience and educational technology. Previously at Microsoft and Coursera.",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Maria Rodriguez",
      role: "Lead Designer",
      bio: "UI/UX designer passionate about creating intuitive and beautiful learning experiences. Design systems expert.",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
  ];

  const values: ValueCardProps[] = [
    {
      icon: "🚀",
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible in online coding education and development tools.",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: "🌍",
      title: "Accessibility",
      description:
        "Making coding education free and accessible to everyone, regardless of their background or location.",
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      icon: "🤝",
      title: "Community",
      description:
        "Building a supportive community where developers of all levels can learn, share, and grow together.",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      icon: "⚡",
      title: "Performance",
      description:
        "Delivering lightning-fast, reliable tools that enhance productivity and learning efficiency.",
      gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
  ];

  useEffect(() => {
    UIStore.update((s) => {
      s.hideContent = true;
    });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-pink-400/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                About Syntaxz
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Empowering{" "}
              <span className="bg-gradient-to-r from-[#ff5757] via-[#ff914d] to-[#ff5757] bg-clip-text text-transparent animate-gradient-x">
                Developers
              </span>
              <br />
              Worldwide
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to make coding education accessible, engaging,
              and effective for everyone. From beginners taking their first
              steps to experienced developers exploring new technologies.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <StatCard number="1M+" label="Code Runs" icon="⚡" />
              <StatCard number="100K+" label="Developers" icon="👨‍💻" />
              <StatCard number="8+" label="Languages" icon="🔧" />
              <StatCard number="50+" label="Countries" icon="🌍" />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="relative py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                {[
                  { id: "story", label: "Our Story", icon: "📖" },
                  { id: "mission", label: "Mission", icon: "🎯" },
                  { id: "values", label: "Values", icon: "💎" },
                  // { id: "team", label: "Team", icon: "👥" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#ff5757] to-[#ff914d] text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === "story" && (
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    How It All{" "}
                    <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
                      Started
                    </span>
                  </h2>
                  <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                      Syntaxz was born from a simple frustration: why was it so
                      hard to quickly test and share code snippets? As
                      developers, we found ourselves constantly switching
                      between different tools, setting up environments, and
                      dealing with complex configurations just to run a few
                      lines of code.
                    </p>
                    <p>
                      In 2023, our founder Alex Chen decided to solve this
                      problem once and for all. What started as a weekend
                      project to create a simple online JavaScript runner
                      quickly evolved into something much bigger when the
                      developer community embraced it with overwhelming
                      enthusiasm.
                    </p>
                    <p>
                      Today, Syntaxz supports 8+ programming languages and
                      serves over 100,000 developers worldwide. But we're just
                      getting started. Our vision is to become the go-to
                      platform for coding education, experimentation, and
                      collaboration.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5757]/20 to-[#ff914d]/20 rounded-3xl blur-2xl transform rotate-6"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-[#ff5757] to-[#ff914d] rounded-full flex items-center justify-center text-5xl text-white shadow-2xl">
                        🚀
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        From Idea to Impact
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Transforming how developers learn, experiment, and share
                        code across the globe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                  Our{" "}
                  <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
                    Mission
                  </span>
                </h2>
                <div className="bg-gradient-to-r from-[#ff5757]/10 to-[#ff914d]/10 dark:from-[#ff5757]/5 dark:to-[#ff914d]/5 rounded-3xl p-12 border border-[#ff5757]/20 dark:border-[#ff5757]/10 mb-12">
                  <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
                    "To democratize coding education and make programming
                    accessible to everyone, regardless of their background,
                    location, or resources."
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#ff5757] to-[#ff914d] mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl text-white">
                      🎓
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Education First
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Providing comprehensive learning resources and tutorials
                      for all skill levels.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-2xl text-white">
                      🌐
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Global Access
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Breaking down barriers and making coding tools available
                      worldwide.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl text-white">
                      🤝
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Community Driven
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Building a supportive community where developers help each
                      other grow.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                  Our Core{" "}
                  <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
                    Values
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => (
                    <ValueCard key={index} {...value} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                  Meet Our{" "}
                  <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
                    Team
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                  {teamMembers.map((member, index) => (
                    <TeamMember key={index} {...member} />
                  ))}
                </div>

                {/* Join Our Team CTA */}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#ff5757]/10 to-[#ff914d]/10 dark:from-[#ff5757]/5 dark:to-[#ff914d]/5 rounded-3xl p-12 border border-[#ff5757]/20 dark:border-[#ff5757]/10">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Want to Join Our Team?
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                      We're always looking for passionate individuals who share
                      our vision of making coding accessible to everyone.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff5757] to-[#ff914d] hover:from-[#ff4141] hover:to-[#ff7a2d] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Get In Touch
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-[#ff5757]/10 to-[#ff914d]/10 dark:from-[#ff5757]/5 dark:to-[#ff914d]/5 rounded-3xl p-16 border border-[#ff5757]/20 dark:border-[#ff5757]/10">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start{" "}
              <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
                Coding?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Join thousands of developers who are already using Syntaxz to
              learn, experiment, and build amazing things.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#explore"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff5757] to-[#ff914d] hover:from-[#ff4141] hover:to-[#ff7a2d] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Start Coding Now
              </Link>

              {/* <Link
                href="/learn"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Explore Learning Resources
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
