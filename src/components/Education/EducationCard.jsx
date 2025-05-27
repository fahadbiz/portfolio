import React, { useState } from "react";

const EducationCard = ({ step, degree, institution, duration, description }) => {
  const [showContent, setShowContent] = useState(false);
  const toggleContent = () => setShowContent((prev) => !prev);

  return (
    <div
      className="group relative w-80 h-64 rounded-2xl shadow-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={toggleContent}
    >
      {/* Front Cover with added horizontal padding */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900 flex flex-col items-center justify-center px-6">
        <span className="text-white text-2xl font-bold drop-shadow-lg">
          {step}
        </span>
        <h3 className="text-xl font-bold text-white mt-2">{degree}</h3>
        <p className="text-xs text-gray-400 mt-1">
          {institution} | {duration}
        </p>
        {!showContent && (
          <p className="mt-2 text-xs text-gray-300">
            Click to see details
          </p>
        )}
      </div>
      {/* Sliding Content Panel */}
      <div
        className={`absolute inset-0 bg-white/10 backdrop-blur-md p-6 flex flex-col justify-center transition-transform duration-700 ease-in-out ${
          showContent ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h3 className="text-xl font-bold text-white">{degree}</h3>
        <p className="text-xs text-gray-300 mt-1">
          <span className="font-semibold">Institution:</span> {institution}
        </p>
        <p className="text-xs text-gray-300">
          <span className="font-semibold">Duration:</span> {duration}
        </p>
        <p className="text-xs text-gray-200 mt-2 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EducationCard;
