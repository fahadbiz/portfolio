import React from 'react';

const StatsCard = ({ title, value, icon, color = 'text-green-400' }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
      <div className="flex items-center">
        {icon && <div className="text-4xl mr-4 text-green-400">{icon}</div>}
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
