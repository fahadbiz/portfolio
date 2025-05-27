import React from "react";
import { Helmet } from "react-helmet";

const SEO = () => {
  const title = "Muhammad Fahad - Full-Stack Developer,Web Developer, Mobile App Developer & AI Engineer";
  const description =
    "Muhammad Fahad is a creative developer and associate software engineer from Lahore, Pakistan. Specializing in full-stack web development, mobile app development (React Native & Flutter), and innovative AI solutions, he has developed projects like QuickCare—an AI-driven emergency first-aid platform—and comprehensive hospital systems. Skilled in ReactJS, NodeJS, Python, JavaScript, C#, Firebase, and more.";
  const keywords =
    "Muhammad Fahad, Full-Stack Developer, Mobile App Developer, AI Engineer, QuickCare, Hospital System, ReactJS, Flutter, React Native, Firebase, NodeJS, API Integration, Python, JavaScript, C#, Web Development, IT Associate, Lahore, Pakistan";

  // JSON-LD structured data (Person Schema)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammad Fahad",
    "jobTitle": "Full-Stack Developer, Web Developer, Mobile App Developer & AI Engineer",
    "url": "https://fahaddev.vercel.app/",
    "email": "muhammadfahad.dev@gmail.com",
    "sameAs": [
      "https://www.linkedin.com/in/muhammadfahaddev/",
      "https://github.com/muhammadfahaddev"
    ],
    "description": description,
    "knowsAbout": [
      "ReactJS",
      "MERN Stack",
      "LLM",
      "AI Engineer",
      "Front-End Developer",
      "Backend Developer",
      "Flutter",
      "React Native",
      "NodeJS",
      "Firebase",
      "API Integration",
      "Python",
      "JavaScript",
    ]
  };

  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Muhammad Fahad" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/iconfahad.svg" />
      <meta property="og:url" content="https://fahaddev.vercel.app/" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/iconfahad.svg" />
      <meta name="twitter:site" content="@muhammadfahaddev" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://fahaddev.vercel.app/" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/iconfahad.svg" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default SEO;
