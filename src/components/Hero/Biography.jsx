import React from "react";

const BiographyModal = ({ isOpen, onClose,bio }) => {
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-white cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl font-bold text-white hover:text-green-400 transition-colors duration-300"
        >
          &times;
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Biography
        </h2>
        <div className="space-y-4 text-sm md:text-base text-gray-300 leading-relaxed">
          {bio}
        </div>
      </div>
    </div>
  );
};

export default BiographyModal;
