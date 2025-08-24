import "./styles/theme.css";
import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx";
import "./styles/cards.css";
import "./mocks/devMock.js";

class ErrorBoundary extends Component {
  constructor(props){ super(props); this.state = { hasError:false, error:null }; }
  static getDerivedStateFromError(error){ return { hasError:true, error }; }
  componentDidCatch(error, info){ console.error("ErrorBoundary caught:", error, info); }
  render(){
    if (this.state.hasError) return <div className="card"><h2 className="card-header">Something went wrong</h2><pre style={{whiteSpace:'pre-wrap'}}>{String(this.state.error)}</pre></div>;
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Layout>
        <App />
      </Layout>
    </ErrorBoundary>
  </React.StrictMode>
);
