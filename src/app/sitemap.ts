// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = [
    "javascript",
    "python",
    "java",
    "cpp",
    "c",
    "php",
    "ruby",
    "go",
  ];

  const staticPages = [
    {
      url: "https://syntaxz.com",
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: "https://syntaxz.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://syntaxz.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  const compilerPages = languages.map((lang) => ({
    url: `https://syntaxz.com/compilers/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...compilerPages];
}
