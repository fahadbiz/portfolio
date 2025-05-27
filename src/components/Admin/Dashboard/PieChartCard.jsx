import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Desktop', value: 60 },
  { name: 'Tablet', value: 25 },
  { name: 'Mobile', value: 15 },
];

const COLORS = ['#10B981', '#6EE7B7', '#4ADE80'];

const PieChartCard = () => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-6 transition duration-300">
      <h3 className="text-xl font-semibold text-green-400 mb-4">Users by Device</h3>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#10B981"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartCard;
