export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Syntaxz",
    url: "https://syntaxz.com",
    logo: "https://syntaxz.com/logo.png",
    description:
      "Online code compiler supporting multiple programming languages",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "support@syntx.co.in",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Syntaxz",
    url: "https://syntaxz.com",
    description: "Free online code compiler for multiple programming languages",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://syntaxz.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Syntaxz Online Compiler",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    description:
      "Free online code compiler supporting JavaScript, Python, Java, C++, and more",
    url: "https://syntaxz.com",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
    </>
  );
}
