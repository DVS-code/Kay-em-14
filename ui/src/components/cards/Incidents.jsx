import { useEffect, useState } from "react";

export default function Incidents() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/audit/incidents")
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch incidents"))
      .then(setData)
      .catch(err => setError(err.toString()));
  }, []);

  return (
    <div className="card">
      <h2 className="card-header">Incidents</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!data && !error && <p className="text-gray-400">Loading incidents...</p>}
      {data && (
        <ul className="text-sm space-y-1">
          {data.incidents?.map((i, idx) => (
            <li key={idx}>[{i.severity}] {i.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

