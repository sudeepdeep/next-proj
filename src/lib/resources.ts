export const resources: Record<
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
