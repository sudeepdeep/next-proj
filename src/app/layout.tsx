/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./layout-wrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syntaxz - Online Code Compiler for Multiple Languages",
  description:
    "Free online code compiler supporting JavaScript, Python, Java, C++, and more. Write, compile, and run code instantly in your browser.",
  keywords:
    "online compiler, code editor, JavaScript, Python, Java, C++, programming, syntaxz compiler",
  authors: [{ name: "Syntaxz" }],
  creator: "Syntaxz",
  publisher: "Syntaxz",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.png", // or "/favicon.png"
  },
  verification: {
    google: "4HcUYb3E0iUBxAxhCxEGFonbJ90ovBNSDD9PAlX9GhI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
