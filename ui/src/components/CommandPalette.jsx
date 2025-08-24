import React from "react";

export default function CommandPalette({ onClose }) {
  return (
    <div className="glass p-4 w-[640px]">
      <div className="text-purple-300 font-semibold mb-2">Command Palette</div>
      <div className="text-sm text-gray-300">Type commands like “restart apexbot”, “tail logs”, “daily briefing”.</div>
      <div className="text-xs text-gray-400 mt-2">Press Esc to close.</div>
      <div className="mt-3">
        <button className="px-3 py-1 bg-purple-600 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
