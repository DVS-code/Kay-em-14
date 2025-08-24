import React, { useEffect, useState } from "react";

function ServerStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/system");
      const json = await res.json();
      setStats(json);
    };
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);
  if (!stats) return <p>Loading system stats...</p>;
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Server Health</h2>
      <p>CPU: {stats.cpu}%</p>
      <p>RAM: {stats.ram}%</p>
      <p>Disk: {stats.disk_root}%</p>
    </div>
  );
}
export default ServerStats;
