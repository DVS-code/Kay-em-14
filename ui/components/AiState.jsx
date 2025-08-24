import React, { useEffect, useState } from "react";

function AiState() {
  const [state, setState] = useState("idle");

  useEffect(() => {
    const fetchState = async () => {
      const res = await fetch("/ai");
      const data = await res.json();
      setState(data.mode);
    };
    fetchState();
    const interval = setInterval(fetchState, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded-xl bg-gray-800 text-center">
      <h2 className="text-lg font-bold">AI State</h2>
      <p className="mt-2 text-xl">
        {state === "idle" && "😴 Idle"}
        {state === "listening" && "👂 Listening..."}
        {state === "speaking" && "🗣️ Speaking..."}
      </p>
    </div>
  );
}

export default AiState;
