import React from "react";
import EducationCard from "./EducationCard";

const educationItems = [
  {
    id: 1,
    step: "01",
    degree: "Bachelor of Science in Computer Science",
    institution: "Riphah International University",
    duration: "Aug 2021 - Expected June 2025",
    description:
      "Pursuing a comprehensive BS in Computer Science with a focus on software development, machine learning, and data analysis.",
  },
  {
    id: 2,
    step: "02",
    degree: "Certified Agentic and Robotic AI Engineer",
    institution: "PIAIC",
    duration: "Nov 2024",
    description:
      "Certified in AI Engineering with hands-on experience in automation, robotics, and advanced machine learning techniques.",
  },
];

const EducationSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] left-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Education
        </h2>
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 place-items-center">
          {educationItems.map((item) => (
            <EducationCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
