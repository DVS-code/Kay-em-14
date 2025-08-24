import React, { useState } from "react";

export default function AiTerminal({ className = "" }) {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([]);

  const send = async (e) => {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;
    setInput("");

    try {
      const res = await fetch("/ai", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const reply = data.reply || data.response || data.message || JSON.stringify(data);
      setLog((l) => [...l, { role: "user", text: prompt }, { role: "ai", text: reply }]);
    } catch (err) {
      setLog((l) => [...l, { role: "user", text: prompt }, { role: "ai", text: `[error] ${err.message}` }]);
    }
  };

  return (
    <div className={`glass p-4 ${className}`}>
      <h2 className="text-lg font-bold text-purple-300 mb-2">AI Terminal</h2>
      <div className="h-40 overflow-y-auto bg-black/40 rounded p-2 font-mono text-sm">
        {log.length === 0 ? (
          <div className="text-gray-400">Awaiting input…</div>
        ) : (
          log.map((m, i) => (
            <div key={i} className={m.role === "ai" ? "text-green-300" : "text-cyan-300"}>
              <span className="opacity-70 pr-2">{m.role === "ai" ? "KAY ▸" : "You ▸"}</span>
              {m.text}
            </div>
          ))
        )}
      </div>
      <form onSubmit={send} className="mt-3 flex gap-2">
        <input
          className="flex-1 bg-black/50 rounded px-3 py-2 outline-none"
          placeholder="Ask KAY-EM…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-purple-600 hover:bg-purple-700 rounded px-4 py-2">Send</button>
      </form>
    </div>
  );
}
