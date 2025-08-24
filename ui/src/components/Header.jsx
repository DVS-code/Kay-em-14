export default function Header() {
  return (
    <div className="flex justify-between items-center h-[47px] px-5 bg-blackglass border-b border-neon-teal/40 shadow-neon-sm mb-1">
      <div>
        <span className="text-xl text-neon-teal font-bold tracking-wide">Command Center</span>
      </div>
      <div className="flex items-center gap-6 text-xs">
        <span className="text-gray-400">Last updated: 10:41:02</span>
        <span className="text-neon-cyan">Auto-refresh: 30s</span>
        <button className="px-3 py-1 ml-4 rounded bg-neon-teal/10 border border-neon-teal text-neon-teal shadow hover:bg-neon-teal/30 mr-1">
          Speak Status
        </button>
        <button className="px-3 py-1 rounded bg-neon-teal/10 border border-neon-teal text-neon-teal shadow hover:bg-neon-teal/30">
          Refresh
        </button>
      </div>
    </div>
  );
}