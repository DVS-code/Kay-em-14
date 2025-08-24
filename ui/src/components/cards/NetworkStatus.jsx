import { useEffect, useState } from "react";

export default function NetworkStatus() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/router")
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch network"))
      .then(setData)
      .catch(err => setError(err.toString()));
  }, []);

  return (
    <div className="card">
      <h2 className="card-header">Network Status</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!data && !error && <p className="text-gray-400">Loading network...</p>}
      {data && (
        <>
          <p className="stat">Ping: {data.ping} ms</p>
          <p className="stat">Up: {data.upload} Mbps</p>
          <p className="stat">Down: {data.download} Mbps</p>
        </>
      )}
    </div>
  );
}

