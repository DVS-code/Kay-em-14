import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#9333ea", "#06b6d4"];

// Convert sizes like "626G", "3.7T" to GB
function parseSize(str) {
  if (!str) return 0;
  const num = parseFloat(str);
  if (str.toUpperCase().includes("T")) return num * 1024;
  if (str.toUpperCase().includes("G")) return num;
  if (str.toUpperCase().includes("M")) return num / 1024;
  return num;
}

function NASCircle() {
  const [nasData, setNasData] = useState(null);

  useEffect(() => {
    fetch("/nas")
      .then((res) => res.json())
      .then((data) => setNasData(data))
      .catch(() => setNasData(null));
  }, []);

  if (!nasData) return <p className="text-xs text-gray-400">Loading NAS...</p>;

  const used = parseSize(nasData.used);
  const total = parseSize(nasData.size);
  const free = total - used;

  const chartData = [
    { name: "Used", value: used },
    { name: "Free", value: free },
  ];

  return (
    <div className="text-xs">
      <h2 className="font-bold text-purple-300 mb-1">NAS Storage</h2>
      <PieChart width={140} height={140}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={50}
          label={({ name, value }) => `${name} ${(value / total * 100).toFixed(0)}%`}
          dataKey="value"
        >
          {chartData.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Legend wrapperStyle={{ fontSize: "10px" }} />
      </PieChart>
      <p className="mt-1 text-gray-300">
        {used.toFixed(1)} GB / {total.toFixed(1)} GB
      </p>
    </div>
  );
}

export default NASCircle;
