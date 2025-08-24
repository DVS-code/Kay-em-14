import { useEffect, useState } from "react";

export default function SystemOverview() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/system")
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch system"))
      .then(setData)
      .catch(err => setError(err.toString()));
  }, []);

  return (
    <div className="card">
      <h2 className="card-header">System Overview</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!data && !error && <p className="text-gray-400">Loading system...</p>}
      {data && (
        <>
          <p className="stat">CPU: {data.cpu}%</p>
          <p className="stat">RAM: {data.ram}%</p>
          <p className="stat">Disk: {data.disk_root}%</p>
        </>
      )}
    </div>
  );
}

