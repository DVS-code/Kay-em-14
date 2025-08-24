import { useEffect, useState } from "react";

export default function SecurityStatus() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/security")
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch security"))
      .then(setData)
      .catch(err => setError(err.toString()));
  }, []);

  return (
    <div className="card">
      <h2 className="card-header">Security Status</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!data && !error && <p className="text-gray-400">Loading security...</p>}
      {data && (
        <ul className="text-sm space-y-1">
          {data.alerts?.map((a, i) => (
            <li key={i} className={a.severity === "critical" ? "text-red-500" : "text-yellow-400"}>
              {a.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

