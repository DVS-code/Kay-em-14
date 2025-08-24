import React from "react";
import AiState from "./components/AiState";

function App() {
  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">KAY-EM 14 Hub</h1>
      <AiState />
      <p className="mt-4">Endpoints live at:</p>
      <ul className="list-disc">
        <li>/system</li>
        <li>/pm2</li>
        <li>/docker</li>
        <li>/nas</li>
        <li>/ping</li>
        <li>/ai</li>
      </ul>
    </div>
  );
}

export default App;
