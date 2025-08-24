import React, { useEffect, useState } from "react";
import { getSystem } from "./api";

export default function TestSystem() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getSystem().then(async (res) => {
      const json = await res.json();
      console.log("✅ /system response:", json);
      setData(json);
    }).catch(err => {
      console.error("❌ Failed to fetch /system", err);
    });
  }, []);

  if (!data) return <div>Loading system data...</div>;
  return (
    <div>
      <h2>System Status</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
