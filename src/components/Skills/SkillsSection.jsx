import React from "react";
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiJavascript } from "react-icons/si";

const skills = [
  {
    id: 1,
    name: "React",
    icon: <FaReact className="text-green-400" />,
  },
  {
    id: 2,
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-400" />,
  },
  {
    id: 3,
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-400" />,
  },
  {
    id: 4,
    name: "HTML5",
    icon: <FaHtml5 className="text-orange-500" />,
  },
  {
    id: 5,
    name: "CSS3",
    icon: <FaCss3Alt className="text-blue-500" />,
  },
  {
    id: 6,
    name: "Node.js",
    icon: <FaNodeJs className="text-green-600" />,
  },
];

const SkillsSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden animate-fadeIn">
      {/* Decorative Blobs */}
      <div className="absolute top-[-8rem] right-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-8rem] left-[-8rem] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Skills
        </h2>
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <p className="text-sm font-bold">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
