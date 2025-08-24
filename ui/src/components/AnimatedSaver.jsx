import React from "react";

export default function AnimatedSaver({ onClose }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-24 h-24 rounded-full border-4 border-purple-600 animate-pulse mb-4"></div>
      <div className="text-purple-200 text-xl">KAY-EM 14 • Standby</div>
      <button className="mt-6 px-4 py-2 rounded bg-purple-600 hover:bg-purple-700" onClick={onClose}>
        Resume
      </button>
    </div>
  );
}
