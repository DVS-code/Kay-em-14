import { useState } from "react";
const links = [
  { name: "Command Center", icon: "💠" },
  { name: "Daily Briefing", icon: "🗓️" },
  { name: "System Health", icon: "🖥️" },
  { name: "Network Monitor", icon: "🌐" },
  { name: "Security Center", icon: "🔒" },
  { name: "Storage & Backups", icon: "💾" },
  { name: "Workflows", icon: "🛠️" }
];
export default function Sidebar() {
  const [active, setActive] = useState(0);
  return (
    <div className="bg-sidebar w-[140px] h-full flex flex-col justify-between py-4 px-2 shadow-neon border-r border-neon-teal">
      <nav className="flex flex-col gap-2">
        {links.map((l, i) => (
          <button
            key={i}
            className={`flex items-center gap-2 px-3 py-2 hover:bg-blackglass rounded-lg transition font-medium text-xs ${
              active === i ? "bg-blackglass border-l-4 border-neon-teal text-neon-teal shadow-neon" : "text-white"
            }`}
            onClick={() => setActive(i)}
          >
            <span>{l.icon}</span>
            <span>{l.name}</span>
          </button>
        ))}
      </nav>
      <div className="text-xs mt-6">
        <div className="flex items-center gap-1 mb-1">
          <span className="w-2 h-2 bg-ok rounded-full inline-block"></span>
          <span>OK</span>
        </div>
        <div>Net: <span className="text-neon-cyan">99.98%</span></div>
        <div>Uptime: <span className="font-mono">17d 13h</span></div>
      </div>
    </div>
  );
}