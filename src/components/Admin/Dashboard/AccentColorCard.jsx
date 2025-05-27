import React from 'react';

const AccentColorCard = () => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-6 transition duration-300 flex flex-col items-start">
      <span className="text-sm text-gray-400 uppercase tracking-wide mb-3">Accent Color</span>
      <button className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-semibold px-6 py-3 rounded-full transition duration-300">
        Download
      </button>
    </div>
  );
};

export default AccentColorCard;
