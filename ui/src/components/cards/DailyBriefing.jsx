import { useEffect, useState } from "react";

export default function DailyBriefing() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/ai/briefing")
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch briefing"))
      .then(setData)
      .catch(err => setError(err.toString()));
  }, []);

  return (
    <div className="card">
      <h2 className="card-header">Daily Briefing</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!data && !error && <p className="text-gray-400">Loading briefing...</p>}
      {data && <p>{data.summary}</p>}
    </div>
  );
}

