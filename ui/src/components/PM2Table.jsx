import React, { useEffect, useState } from "react";

function PM2Table() {
  const [processes, setProcesses] = useState([]);

  const fetchProcesses = async () => {
    try {
      const res = await fetch("/pm2");
      const json = await res.json();
      setProcesses(json);
    } catch (err) {
      console.error("PM2 fetch error:", err);
    }
  };

  const sendAction = async (action, name) => {
    try {
      await fetch(`/pm2/${action}/${name}`, { method: "POST" });
      fetchProcesses();
    } catch (err) {
      console.error(`PM2 ${action} error:`, err);
    }
  };

  useEffect(() => {
    fetchProcesses();
    const interval = setInterval(fetchProcesses, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="heading mb-2">PM2 Processes</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th>Status</th>
            <th>CPU</th>
            <th>Mem</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p, idx) => (
            <tr key={idx} className="border-t border-gray-700">
              <td>{p.name}</td>
              <td>{p.pm2_env?.status}</td>
              <td>{p.monit?.cpu}%</td>
              <td>{p.monit?.memory ? (p.monit.memory / 1024 / 1024).toFixed(1) + " MB" : "?"}</td>
              <td>
                <button className="px-2 py-1 bg-green-600 rounded mr-1" onClick={() => sendAction("start", p.name)}>Start</button>
                <button className="px-2 py-1 bg-yellow-600 rounded mr-1" onClick={() => sendAction("restart", p.name)}>Restart</button>
                <button className="px-2 py-1 bg-red-600 rounded" onClick={() => sendAction("stop", p.name)}>Stop</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PM2Table;
