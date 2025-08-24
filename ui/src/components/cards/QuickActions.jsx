export default function QuickActions() {
  const runAction = (endpoint) => {
    fetch(`http://localhost:8000/api/${endpoint}`, { method: "POST" })
      .then(() => alert(`Action ${endpoint} triggered`))
      .catch(() => alert(`Failed to run ${endpoint}`));
  };

  return (
    <div className="card">
      <h2 className="card-header">Quick Actions</h2>
      <div className="space-x-2">
        <button className="btn btn-primary" onClick={() => runAction("system/restart")}>
          Restart System
        </button>
        <button className="btn btn-critical" onClick={() => runAction("security/scan")}>
          Run Security Scan
        </button>
        <button className="btn btn-advisory" onClick={() => runAction("ai/retrain")}>
          Retrain AI
        </button>
      </div>
    </div>
  );
}

