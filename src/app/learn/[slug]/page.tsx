"use client";

import UIStore from "@/app/store";
import { Article, LanguageData, ResourceData, Video } from "@/app/types";
import { languages } from "@/lib/languages";
import { resources } from "@/lib/resources";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Enhanced Resource Card Component
interface ResourceCardProps {
  item: Article | Video;
  type: "article" | "video";
}

const ResourceCard: React.FC<ResourceCardProps> = ({ item, type }) => {
  const isVideo = type === "video";

  return (
    <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
            isVideo
              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          }`}
        >
          {isVideo ? "🎥" : "📘"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isVideo
                  ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                  : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              }`}
            >
              {isVideo ? "Video Tutorial" : "Article"}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 rounded-2xl"
        aria-label={`Open ${item.title}`}
      />
    </div>
  );
};

// Enhanced Resource Section Component
interface ResourceSectionProps {
  title: string;
  items: Array<Article | Video>;
  type: "article" | "video";
  icon: string;
  gradient: string;
}

const ResourceSection: React.FC<ResourceSectionProps> = ({
  title,
  items,
  type,
  icon,
  gradient,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div
            className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center text-3xl shadow-lg`}
          >
            {icon}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {type === "video"
            ? "Hand-picked video tutorials to accelerate your learning journey"
            : "Comprehensive articles and documentation to deepen your understanding"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {items.map((item, i) => (
          <ResourceCard key={i} item={item} type={type} />
        ))}
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Loading amazing content...
        </p>
      </div>
    </div>
  </div>
);

// Error Component
const ErrorDisplay = ({ error }: { error: string }) => (
  <div className="flex justify-center items-center min-h-screen px-6">
    <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-red-600 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">{error}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff5757] to-[#ff914d] hover:from-[#ff4141] hover:to-[#ff7a2d] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Go Home
      </Link>
    </div>
  </div>
);

export default function LearnLanguagePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [lang, setLang] = useState<LanguageData | null>(null);
  const [description, setDescription] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [youtube, setYoutube] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    UIStore.update((s) => {
      s.hideContent = true;
    });

    const foundLang = languages.find((item) => item.slug === slug);
    if (!foundLang) {
      setError(
        "This language page couldn't be found. It might have been moved or doesn't exist."
      );
      setLoading(false);
      return;
    }
    setLang(foundLang);

    const resourceData: ResourceData | undefined = (
      resources as Record<string, ResourceData>
    )[slug];

    if (resourceData) {
      setDescription(resourceData.description || "");
      setArticles(resourceData.articles || []);
      setYoutube(resourceData.youtube || []);
    } else {
      setDescription(
        `Discover the power of ${foundLang.name} and unlock new possibilities in your coding journey!`
      );
      setArticles([]);
      setYoutube([]);
    }

    setLoading(false);
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;
  if (!lang) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-pink-400/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 mb-8">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Interactive Learning Experience
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                Master{" "}
                <span className="bg-gradient-to-r from-[#ff5757] via-[#ff914d] to-[#ff5757] bg-clip-text text-transparent animate-gradient-x">
                  {lang.name}
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href={`/compilers/${lang.slug}`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff5757] to-[#ff914d] hover:from-[#ff4141] hover:to-[#ff7a2d] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1"
                >
                  <svg
                    className="w-6 h-6 group-hover:rotate-12 transition-transform"
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

                <Link
                  href="/"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>

            {/* Language Logo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5757]/20 to-[#ff914d]/20 rounded-3xl blur-2xl transform rotate-6"></div>
                <div className="relative bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                  <Image
                    src={`/${lang.slug}.svg`}
                    alt={`${lang.name} logo`}
                    width={200}
                    height={200}
                    priority
                    className="drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Learning{" "}
              <span className="bg-gradient-to-r from-[#ff5757] to-[#ff914d] bg-clip-text text-transparent">
                Resources
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Curated collection of the best tutorials, articles, and resources
              to help you master {lang.name}
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <ResourceSection
                title="Essential Articles"
                items={articles}
                type="article"
                icon="📚"
                gradient="bg-gradient-to-br from-blue-500 to-blue-600"
              />
            </div>

            <div>
              <ResourceSection
                title="Video Tutorials"
                items={youtube}
                type="video"
                icon="🎬"
                gradient="bg-gradient-to-br from-red-500 to-red-600"
              />
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-[#ff5757]/10 to-[#ff914d]/10 dark:from-[#ff5757]/5 dark:to-[#ff914d]/5 rounded-3xl p-12 border border-[#ff5757]/20 dark:border-[#ff5757]/10">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Jump into our interactive compiler and start writing {lang.name}{" "}
                code right away. No setup required!
              </p>
              <Link
                href={`/compilers/${lang.slug}`}
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
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Open {lang.name} Compiler
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
