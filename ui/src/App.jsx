import React, { useState, useEffect } from "react";
import "./glass.css";
import Widget from "./components/Widget";
import AnimatedSaver from "./components/AnimatedSaver";
import CommandPalette from "./components/CommandPalette";
import NotificationStack from "./components/NotificationStack";
import AiTerminal from "./components/AiTerminal";

export default function App() {
  const [inactive, setInactive] = useState(false);
  const [showCommand, setShowCommand] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => setInactive(true), 90000);
    const reset = () => {
      setInactive(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setInactive(true), 90000);
    };
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    return () => {
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCommand((c) => !c);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="w-[1024px] h-[768px] mx-auto bg-primary-bg text-gray-100 font-sans relative overflow-hidden">
      {inactive && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <AnimatedSaver onClose={() => setInactive(false)} />
        </div>
      )}

      {showCommand && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
          <CommandPalette onClose={() => setShowCommand(false)} />
        </div>
      )}

      <NotificationStack />
      <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-4 p-4">
        <Widget type="system" className="glass" />
        <Widget type="pm2" className="glass" />
        <Widget type="systemd" className="glass" />
        <Widget type="nas" className="glass" />
        <Widget type="latency" className="glass" />
        <AiTerminal className="glass col-span-3 row-start-2" />
      </div>
    </div>
  );
}

