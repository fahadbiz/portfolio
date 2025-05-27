import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase"; // adjust the path as needed

// Import your components
import Sidebar from "../../components/Admin/Dashboard/Sidebar";
import TopBar from "../../components/Admin/Dashboard/TopBar";
import StatsCard from "../../components/Admin/Dashboard/StatsCard";
import LineChartCard from "../../components/Admin/Dashboard/LineChartCard";
import PieChartCard from "../../components/Admin/Dashboard/PieChartCard";
import AccentColorCard from "../../components/Admin/Dashboard/AccentColorCard";
import { FiTrendingUp } from "react-icons/fi";
import BiographyManager from "../../components/Admin/HeroSection/HeroSection";
import AboutAdmin from "../../components/Admin/AboutSection/AboutSection";
import WorkExperienceManager from "../../components/Admin/WorkExperience/WorkExperience";
import PortfolioProjectsManager from "../../components/Admin/ProjectManageAdmin/ProjectManageAdmin";
import CertificatesAdmin from "../../components/Admin/Certificates/Certificates";
import BlogManager from "../../components/Admin/Blog/Blog";
import HireMeManage from "../../components/Admin/Contact/hireme";
import ContactManage from "../../components/Admin/Contact/Contact";
import LoginPage from "./LoginPage";
import ActivityIndicator from "../../components/ActivityIndicator";

// Dashboard content showing stats and charts
const DashboardContent = () => {
  const [contactCount, setContactCount] = React.useState(0);
  const [blogCount, setBlogCount] = React.useState(0);
  const [certificatesCount, setCertificatesCount] = React.useState(0);
  const [hireCount, setHireCount] = React.useState(0);
  const [projectCount, setProjectCount] = React.useState(0);
  const [loadingCounts, setLoadingCounts] = React.useState(true);

  React.useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("../../services/firebase"); // adjust path as needed

        const contactSnap = await getDocs(collection(db, "contactMessages"));
        setContactCount(contactSnap.size);

        const blogSnap = await getDocs(collection(db, "blogPosts"));
        setBlogCount(blogSnap.size);

        const certificatesSnap = await getDocs(collection(db, "certificates"));
        setCertificatesCount(certificatesSnap.size);

        const hireSnap = await getDocs(collection(db, "hireRequests"));
        setHireCount(hireSnap.size);

        const projectSnap = await getDocs(collection(db, "projects"));
        setProjectCount(projectSnap.size);
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
      setLoadingCounts(false);
    };

    fetchCounts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-400 flex items-center gap-3">
          <FiTrendingUp className="text-green-500" />
          Overview
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          Detailed metrics about your performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard title="Total Contact" value={loadingCounts ? "..." : contactCount} />
        <StatsCard title="Total Blog" value={loadingCounts ? "..." : blogCount} />
        <StatsCard title="Total Certificates" value={loadingCounts ? "..." : certificatesCount} />
        <StatsCard title="Total Hire me Details" value={loadingCounts ? "..." : hireCount} />
        <StatsCard title="Total Project" value={loadingCounts ? "..." : projectCount} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChartCard />
        </div>
        <div>
          <PieChartCard />
        </div>
      </div>

      {/* Accent Color Card */}
      <div className="mt-8">
        <AccentColorCard />
      </div>
    </div>
  );
};

// Other route components (using shorthand components)
const HeroSection = () => <BiographyManager />;
const AboutSection = () => <AboutAdmin />;
const WorkExperience = () => <WorkExperienceManager />;
const Skills = () => <PortfolioProjectsManager />;
const Certificates = () => <CertificatesAdmin />;
const Blog = () => <BlogManager />;

// Main DashboardOverview component that protects all routes
const DashboardOverview = () => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  // While auth state is loading, display a loading message.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <ActivityIndicator />   
           </div>
    );
  }

  // If user is not authenticated, force login.
  if (!user) {
    return <LoginPage />;
  }

  // If authenticated, render the full dashboard.
  return (
    <section className="relative flex min-h-screen bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] left-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      {/* Sidebar & TopBar always visible if logged in */}
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <TopBar />
        <main className="flex-1 p-6">
          <Routes>
            {/* Use relative paths here */}
            <Route index element={<DashboardContent />} />
            <Route path="hero" element={<HeroSection />} />
            <Route path="about" element={<AboutSection />} />
            <Route path="work" element={<WorkExperience />} />
            <Route path="skills" element={<Skills />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<ContactManage />} />
            <Route path="hireme" element={<HireMeManage />} />
            {/* If an invalid route is provided, redirect to the dashboard home */}
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default DashboardOverview;
