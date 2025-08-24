import React from "react";
import "../styles/cards.css";
export default function Layout({ children }) {
  return <main className="app-container cards-grid">{children}</main>;
}
