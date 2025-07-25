/* eslint-disable @typescript-eslint/no-explicit-any */
// app/learn/[slug]/page.tsx
"use client";
import { languages } from "@/lib/languages";
import { resources } from "@/lib/resources";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LearnLanguagePage() {
  const params = useParams();
  console.log(params);
  const slug = params.slug as string;
  const [lang, setLang] = useState<any>("");
  const [description, setdescription] = useState<any>("");
  const [articles, setarticles] = useState<any>("");
  const [youtube, setyoutube] = useState<any>("");

  useEffect(() => {
    console.log("called");
    const { description, articles, youtube } = resources[slug];
    console.log(resources[slug]);
    setdescription(description);
    setarticles(articles);
    setyoutube(youtube);

    const langSlug = languages.find((item) => item.slug == slug);
    setLang(langSlug);
    console.log("Route changed:", slug);
  }, [slug]);

  const renderComponent = () => {
    return (
      <>
        {articles ? (
          <section className="max-w-6xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <Image
                src={`/${lang.slug}.svg`}
                alt={`${lang.name} logo`}
                width={120}
                height={120}
                className="bg-white p-3 rounded-xl shadow"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  Learn {lang.name}
                </h1>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mb-6">
                  {description}
                </p>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    📘 Recommended Articles
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {articles.map((article: any, i: any) => (
                      <li key={i}>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {article.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-pink-600 dark:text-pink-400 mb-2">
                    🎥 YouTube Tutorials
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {youtube.map((video: any, i: any) => (
                      <li key={i}>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {video.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>Loading</>
        )}
      </>
    );
  };

  return <>{renderComponent()}</>;
}
