import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function LatencyGraph() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/ping");
      const json = await res.json();
      const timestamp = new Date().toLocaleTimeString();
      const entry = Object.entries(json).map(([host, latency]) => ({
        time: timestamp,
        host,
        latency: latency === "unreachable" ? null : parseFloat(latency)
      }));
      setData(d => [...d.slice(-20), ...entry]);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">WAN Latency</h2>
      <LineChart width={300} height={200} data={data}>
        <XAxis dataKey="time" hide />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="latency" stroke="#60a5fa" />
      </LineChart>
    </div>
  );
}
export default LatencyGraph;
