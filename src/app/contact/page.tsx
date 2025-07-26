import React from "react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg mb-4 text-center">
          For any inquiries, collaborations, or support, feel free to reach out
          to us at:
        </p>
        <div className="text-center">
          <a
            href="mailto:syntaxzoffl@gmail.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-md"
          >
            syntaxzoffl@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}
