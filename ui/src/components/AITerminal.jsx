import { useState } from "react";

export default function AITerminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userPrompt = input;
    setLogs((prev) => [...prev, { role: "user", text: userPrompt }]);
    setInput("");

    const res = await fetch("http://localhost:8000/ai/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt }),
    });
    const data = await res.json();
    setLogs((prev) => [...prev, { role: "ai", text: data.response }]);
  }

  return (
    <div className="card mt-2 h-64 flex flex-col">
      <h2 className="heading mb-2">AI Terminal</h2>
      <div className="flex-1 overflow-y-auto bg-black/40 p-2 rounded text-sm font-mono">
        {logs.map((log, i) => (
          <div key={i} className={log.role === "user" ? "text-cyan-400" : "text-purple-400"}>
            <b>{log.role}:</b> {log.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex mt-2">
        <input
          className="flex-1 bg-gray-800 p-2 rounded-l outline-none text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command..."
        />
        <button type="submit" className="bg-purple-600 px-4 rounded-r hover:bg-purple-500">
          Send
        </button>
      </form>
    </div>
  );
}

