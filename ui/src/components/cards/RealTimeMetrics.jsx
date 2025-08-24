import { useEffect, useState } from "react";

// Prefer env; fall back to same host on :8000
const guessApi = () => {
  const env = import.meta?.env?.VITE_API_BASE;
  if (env) return env.replace(/\/+$/, "");
  const origin = window.location.origin;          // http(s)://host:port
  return origin.replace(/:\d+$/, ":8000");        // swap port to backend
};
const API_BASE = guessApi();

export default function RealTimeMetrics() {
  const [data, setData]   = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctl = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/system`, { signal: ctl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status} on /api/system`);
        const json = await res.json();
        setData(json ?? {});
      } catch (e) {
        console.error(e);
        setError(e.message || String(e));
        setData({});
      }
    })();
    return () => ctl.abort();
  }, []);

  if (error && !data) return <div className="card">Error: {error}</div>;
  if (!data) return <div className="card">Loading metrics...</div>;

  const cpu = data?.cpu ?? "N/A";
  const ram = data?.ram ?? "N/A";
  const disk = data?.disk_root ?? "N/A";

  return (
    <div className="card">
      <h2 className="card-header">Real-time Metrics</h2>
      {error && <p style={{opacity:0.8}}>Note: {error}</p>}
      <p>CPU Usage: {cpu}%</p>
      <p>RAM Usage: {ram}%</p>
      <p>Disk Usage: {disk}%</p>
    </div>
  );
}
