"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import CppPage from "@/app/components/languages/CppPage";
import JavaPage from "@/app/components/languages/JavaPage";
import JavascriptPage from "@/app/components/languages/JavascriptPage";
import PythonPage from "@/app/components/languages/PythonPage";
import RPage from "@/app/components/languages/RPage";
import PhpPage from "@/app/components/languages/PhpPage";
import GoPage from "@/app/components/languages/GoPage";
import RubyPage from "@/app/components/languages/RubyPage";

export default function LanguagePage() {
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    console.log("Route changed:", slug);
  }, [slug]);

  const renderComponent = () => {
    switch (slug) {
      case "javascript":
        return <JavascriptPage />;
      case "java":
        return <JavaPage />;
      case "cpp":
        return <CppPage />;
      case "python":
        return <PythonPage />;
      case "r":
        return <RPage />;
      case "php":
        return <PhpPage />;
      case "go":
        return <GoPage />;
      case "ruby":
        return <RubyPage />;
      default:
        return <div>404: Language Not Found</div>;
    }
  };

  return <>{renderComponent()}</>;
}
