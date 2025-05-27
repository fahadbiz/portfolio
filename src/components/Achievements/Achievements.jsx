import React from "react";
import { FaAward, FaTrophy } from "react-icons/fa";

const achievementsData = [
  {
    id: 1,
    title: "Most Innovative Idea",
    subtitle: "Category Winner at Innovate 4.0",
    description:
      "Awarded for the most innovative idea at the Innovate 4.0 Pitching Hackathon during ITCN Asia 2024 at Expo Center Lahore.",
    icon: <FaAward />,
  },
  {
    id: 2,
    title: "Hackathon Winner",
    subtitle: "Winner, Innovate 4.0 Hackathon (2024)",
    description:
      "Recognized for an outstanding innovative idea with a cash prize and mentorship opportunities.",
    icon: <FaTrophy />,
  },
  {
    id: 3,
    title: "Web Competition Runner-Up",
    subtitle: "Runner-Up, Web Programming Competition (2023)",
    description:
      "Honored for excellence in web development at Riphah International University.",
    icon: <FaAward />,
  },
  {
    id: 4,
    title: "DevFest 2023 - 2nd Prize",
    subtitle: "Women Techmakers Lahore",
    description:
      "Google Dotics was recognized at DevFest 2023 – Women Techmakers Lahore for their outstanding achievement and innovation.",
    icon: <FaTrophy />,
  },
];

const Achievements = () => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-[#101820] to-[#131313] text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#00e676] to-transparent opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-t from-[#00e676] to-transparent opacity-20 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {achievementsData.map((achievement) => (
            <div
              key={achievement.id}
              className="group relative bg-[#1a1a1a] bg-opacity-90 backdrop-blur-lg p-8 rounded-2xl shadow-xl overflow-hidden transition-all transform hover:scale-105 hover:rotate-1"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-[#101820] rounded-full shadow-md">
                  <span className="text-4xl text-[#00e676] transition-colors duration-300 group-hover:text-[#00e676]/90">
                    {achievement.icon}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{achievement.title}</h3>
                  <p className="text-sm text-gray-400">{achievement.subtitle}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">{achievement.description}</p>
              {/* Decorative Diagonal Element */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tr from-[#00e676] to-transparent opacity-20 transform rotate-45"></div>
              {/* Glow Border on Hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#00e676] transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
