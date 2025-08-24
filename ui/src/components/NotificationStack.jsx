import React, { useEffect, useState } from "react";

export default function NotificationStack() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const tick = async () => {
      try {
        const res = await fetch("/recommendations", { credentials: "include" });
        if (!res.ok) return;
        const j = await res.json();
        const title = `Daily Briefing: ${j.critical || 0} Critical • ${j.advisories || 0} Advisories`;
        setItems([{ title, notes: j.notes || [] }]);
      } catch {}
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-3 right-3 space-y-2 z-30">
      {items.map((it, idx) => (
        <div key={idx} className="glass p-3 min-w-[280px]">
          <div className="text-purple-300 font-semibold">{it.title}</div>
          {it.notes?.length > 0 && (
            <ul className="list-disc ml-5 mt-1 text-sm text-gray-200">
              {it.notes.slice(0, 4).map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
