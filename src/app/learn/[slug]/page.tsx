// app/learn/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

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

const resources: Record<
  string,
  {
    description: string;
    articles: { title: string; url: string }[];
    youtube: { title: string; url: string }[];
  }
> = {
  javascript: {
    description:
      "JavaScript is a dynamic, high-level scripting language used primarily for web development. Learn how to manipulate the DOM, build apps, and work with frameworks like React.",
    articles: [
      {
        title: "Learn JavaScript (Codecademy)",
        url: "https://www.codecademy.com/learn/introduction-to-javascript",
      },
      {
        title: "JavaScript Basics (MDN)",
        url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps",
      },
    ],
    youtube: [
      {
        title: "JavaScript Full Course (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=jS4aFq5-91M",
      },
    ],
  },
  python: {
    description:
      "Python is a popular, beginner-friendly programming language used in web development, data science, AI, and automation.",
    articles: [
      {
        title: "Learn Python 3 (Codecademy)",
        url: "https://www.codecademy.com/learn/learn-python-3",
      },
      {
        title: "Official Python Docs",
        url: "https://docs.python.org/3/tutorial/",
      },
    ],
    youtube: [
      {
        title: "Python Full Course for Beginners (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      },
    ],
  },
  r: {
    description:
      "R is a programming language primarily used for statistical computing and graphics. Ideal for data science, bioinformatics, and research.",
    articles: [
      {
        title: "Learn R (Codecademy)",
        url: "https://www.codecademy.com/learn/learn-r",
      },
      {
        title: "R for Data Science (Book)",
        url: "https://r4ds.hadley.nz/",
      },
    ],
    youtube: [
      {
        title: "R Programming Full Course (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=_V8eKsto3Ug",
      },
    ],
  },
  cpp: {
    description:
      "C++ is a powerful language used in system software, game development, embedded systems, and high-performance applications.",
    articles: [
      {
        title: "Learn C++ (Codecademy)",
        url: "https://www.codecademy.com/learn/learn-c-plus-plus",
      },
      {
        title: "C++ Tutorial for Beginners (Programiz)",
        url: "https://www.programiz.com/cpp-programming",
      },
    ],
    youtube: [
      {
        title: "C++ Full Course (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
      },
    ],
  },
  java: {
    description:
      "Java is a widely-used, object-oriented programming language. It’s popular for building enterprise applications, Android apps, and backend systems.",
    articles: [
      {
        title: "Learn Java (Codecademy)",
        url: "https://www.codecademy.com/learn/learn-java",
      },
      {
        title: "Java Programming (GeeksForGeeks)",
        url: "https://www.geeksforgeeks.org/java/",
      },
    ],
    youtube: [
      {
        title: "Java Full Course (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=GoXwIVyNvX0",
      },
    ],
  },
  php: {
    description:
      "PHP is a server-side scripting language widely used in web development. It powers major platforms like WordPress and Laravel.",
    articles: [
      {
        title: "Learn PHP (Codecademy)",
        url: "https://www.codecademy.com/learn/learn-php",
      },
      {
        title: "PHP Manual (Official Docs)",
        url: "https://www.php.net/manual/en/index.php",
      },
    ],
    youtube: [
      {
        title: "PHP Full Course for Beginners (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=OK_JCtrrv-c",
      },
    ],
  },
  go: {
    description:
      "Go (or Golang) is a statically typed, compiled language designed for simplicity and performance. Great for cloud services, APIs, and system tools.",
    articles: [
      {
        title: "A Tour of Go (Official)",
        url: "https://tour.golang.org/welcome/1",
      },
      {
        title: "Learn Go (Codecademy)",
        url: "https://www.codecademy.com/learn/learn-go",
      },
    ],
    youtube: [
      {
        title: "Go Language Full Course (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=yyUHQIec83I",
      },
    ],
  },
  ruby: {
    description:
      "Ruby is an elegant, expressive language often used for web development with the Ruby on Rails framework.",
    articles: [
      {
        title: "Learn Ruby (Codecademy)",
        url: "https://www.codecademy.com/learn/learn-ruby",
      },
      {
        title: "Ruby in 20 Minutes (Official)",
        url: "https://www.ruby-lang.org/en/documentation/quickstart/",
      },
    ],
    youtube: [
      {
        title: "Ruby Programming Full Course (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=t_ispmWmdjY",
      },
    ],
  },
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ slug: lang.slug }));
}

export default function LearnLanguagePage({
  params,
}: {
  params: { slug: string };
}) {
  const lang = languages.find((l) => l.slug === params.slug);

  if (!lang || !resources[params.slug]) return notFound();

  const { description, articles, youtube } = resources[params.slug];

  return (
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
              {articles.map((article, i) => (
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
              {youtube.map((video, i) => (
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
  );
}
