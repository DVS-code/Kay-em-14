import React, { useEffect, useState } from "react";

const typeToPath = {
  system: "/system",
  pm2: "/pm2",
  systemd: "/systemd",
  nas: "/nas",
  latency: "/latency",
};

export default function Widget({ type, className = "" }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const path = typeToPath[type] || "/";
    const tick = async () => {
      try {
        const res = await fetch(path, {
          credentials: "include",
          headers: { "Accept": "application/json" },
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const j = await res.json();
        setData(j); setErr("");
      } catch (e) {
        setErr(e.message);
      }
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, [type]);

  const Title = () => (
    <h3 className="text-purple-300 font-semibold mb-2 tracking-wide">
      {type.toUpperCase()}
    </h3>
  );

  // Pretty NAS view
  if (type === "nas") {
    const ok = data && !data.error;
    return (
      <div className={`glass p-4 ${className}`}>
        <Title/>
        {err ? (
          <div className="text-red-400 text-sm">Error: {err}</div>
        ) : ok ? (
          <div className="text-sm">
            <div className="mb-1">
              <span className="opacity-60">Filesystem:</span> {data.filesystem}
            </div>
            <div className="mb-1">
              <span className="opacity-60">Usage:</span> {data.used} / {data.size} ({data.percent})
            </div>
            <div>
              <span className="opacity-60">Mount:</span> {data.mount}
            </div>
            <div className="mt-2 inline-block rounded px-2 py-0.5 text-xs bg-emerald-600/30 border border-emerald-400/30">
              OK
            </div>
          </div>
        ) : (
          <div className="text-red-400 text-sm">{data?.error || "Loading…"}</div>
        )}
      </div>
    );
  }

  // Default JSON dump for other widgets (system, pm2, systemd, latency)
  return (
    <div className={`glass p-4 ${className}`}>
      <Title/>
      {err ? (
        <div className="text-red-400 text-sm">Error: {err}</div>
      ) : (
        <pre className="text-xs whitespace-pre-wrap">
          {data ? JSON.stringify(data, null, 2) : "Loading…"}
        </pre>
      )}
    </div>
  );
}
