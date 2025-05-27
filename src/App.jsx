import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "tailwindcss";
import { logEvent } from "firebase/analytics";
import { analytics } from "./services/firebase";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/Hero/Hero";
import AboutSection from "./components/About/AboutSection";
import WorkExperienceSection from "./components/Experience/Experience";
import SkillsSection from "./components/Skills/SkillsSection";
import Achievements from "./components/Achievements/Achievements";
import AchievementsImage from "./components/Achievements/AchievementsImage";
import PortfolioProjects from "./components/Portfolio/Portfolio";
import EducationSection from "./components/Education/Education";
import CertificatesSection from "./components/Certificates/Certificates";
import TestimonialsSection from "./components/Testimonials/Testimonials";
import ContactSection from "./components/Contact/Contact";
import BlogSection from "./pages/Blog/Blog";
import Footer from "./components/Footer/Footer";
import DashboardOverview from "./pages/Admin/DashboardOverview";
import LoginPage from "./pages/Admin/LoginPage";
import SEO from "../SEO";
// import { Analytics } from "@vercel/analytics/react"

const PortfolioRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={
          <>
            <HeroSection />
            <AboutSection />
            <WorkExperienceSection />
            {/* <SkillsSection /> */}
            <Achievements />
            <AchievementsImage />
            <PortfolioProjects />
            <EducationSection />
            <CertificatesSection />
            <TestimonialsSection />
            <ContactSection />
            <BlogSection />
          </>
        }
      />
    </Routes>
    <Footer />
  </>
);

const App = () => {
  // useEffect(() => {
  //   logEvent(analytics, "page_view", { page: "portfolio" });
  // }, []);

  return (
    <Router>
      <SEO />
      <Routes>
        <Route
          path="/dashboard/*"
          element={<DashboardOverview />}
        />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/*" element={<PortfolioRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
