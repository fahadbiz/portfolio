import React, { useState } from "react";

const WorkExperienceCard = ({ step, title, company, date, description, link }) => {
  const [showContent, setShowContent] = useState(false);
  const toggleContent = () => setShowContent(!showContent);

  return (
    <div
      className="group relative w-80 h-64 rounded-2xl shadow-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={toggleContent}
    >
      {/* Front Cover with basic info */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
        <p className="text-xs text-gray-400">{company} | {date}</p>
        {!showContent && (
          <p className="mt-2 text-xs text-gray-300">Click to see details</p>
        )}
      </div>
      {/* Sliding Content Panel */}
      <div
        className={`absolute inset-0 bg-white/10 backdrop-blur-md p-6 flex flex-col justify-center transition-transform duration-700 ease-in-out ${
          showContent ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <p className="text-xs text-gray-300 mt-1">
          <span className="font-semibold">Company:</span> {company}
        </p>
        <p className="text-xs text-gray-300">
          <span className="font-semibold">Date:</span> {date}
        </p>
        <p className="text-xs text-gray-300 mt-2 line-clamp-3">{description}</p>
        {showContent && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-3 py-2 bg-green-400 text-[#101820] font-bold text-xs rounded-md transition-colors duration-300 hover:bg-green-500"
          >
            More Info
          </a>
        )}
      </div>
    </div>
  );
};

export default WorkExperienceCard;
