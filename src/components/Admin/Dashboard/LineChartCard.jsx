import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', current: 4000, past: 2400 },
  { name: 'Feb', current: 3000, past: 1398 },
  { name: 'Mar', current: 2000, past: 9800 },
  { name: 'Apr', current: 2780, past: 3908 },
  { name: 'May', current: 1890, past: 4800 },
  { name: 'Jun', current: 2390, past: 3800 },
  { name: 'Jul', current: 3490, past: 4300 },
  { name: 'Aug', current: 4490, past: 3300 },
  { name: 'Sep', current: 3000, past: 1398 },
  { name: 'Oct', current: 2000, past: 9800 },
  { name: 'Nov', current: 2780, past: 3908 },
  { name: 'Dec', current: 1890, past: 4800 },
];

const LineChartCard = () => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-6 transition duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-400">Users Over Time</h3>
        <div className="text-sm text-gray-400">
          <span className="mr-2">Current Month</span>
          <span>Past Month</span>
        </div>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Line type="monotone" dataKey="current" stroke="#10B981" strokeWidth={3} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="past" stroke="#6EE7B7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;
