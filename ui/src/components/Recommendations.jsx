import React, { useEffect, useState } from "react";

function Recommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await fetch("/recommendations");
        const json = await res.json();
        setRecs(json.recommendations);
      } catch (err) {
        console.error("Rec fetch error:", err);
      }
    };
    fetchRecs();
    const interval = setInterval(fetchRecs, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="heading mb-2">Advisories</h2>
      <ul className="list-disc ml-4">
        {recs.map((r, idx) => (
          <li key={idx} className="text-sm">{r}</li>
        ))}
      </ul>
    </div>
  );
}
export default Recommendations;
