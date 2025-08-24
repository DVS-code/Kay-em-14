import "../styles/theme.css";
import "../styles/dashboard.css";
import StatBubble from "../components/ui/StatBubble.jsx";
import MetricBar from "../components/ui/MetricBar.jsx";

export default function CommandCenter(){
  const system   = { operational:5, advisory:1, critical:0 };
  const realtime = { cpu:28, ram:51, tempC:65, latencyMs:12 };
  const network  = { uptime:"99.99%", loss:"0.02%", spikes:2 };
  const security = { failed:2, firewall:"Active" };
  const incidents = [
    { id:"INC-1", level:"adv",  text:"Redis container restarted",        time:"09:41" },
    { id:"INC-2", level:"crit", text:"ApexBot crashed (auto-respawned)", time:"06:38" },
    { id:"INC-3", level:"adv",  text:"SSL renewal completed",            time:"04:28" },
  ];

  return (
    <div className="dashboard">
      <div className="command-header">
        <div className="command-title">Command Center</div>
        <div className="header-right">
          <div className="bubbles">
            <StatBubble label="Last updated:" value="10:41:02" />
            <StatBubble label="Auto-refresh:" value="30s" />
          </div>
          <button className="btn btn--ghost">Speak Status</button>
          <button className="btn btn--accent">Refresh</button>
        </div>
      </div>

      {/* Row 1 */}
      <div className="row2 h220">
        <section className="card card--system">
          <header className="card-header">
            <span>System Overview</span>
            <span className="badge ok">OK</span>
          </header>
          <div className="badges" style={{marginBottom:8}}>
            <span className="badge ok">Operational: {system.operational}</span>
            <span className="badge adv">Advisory: {system.advisory}</span>
            <span className="badge crit">Critical: {system.critical}</span>
          </div>
          <div className="subtle" style={{marginTop:2}}>Uptime</div>
          <div className="bar" style={{marginTop:6}}><span style={{width:"95%"}} /></div>
        </section>

        <section className="card card--metrics">
          <header className="card-header"><span>Real-time Metrics</span></header>
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"10px"}}>
            <MetricBar label="CPU Usage" value={realtime.cpu}/>
            <MetricBar label="RAM Usage" value={realtime.ram}/>
          </div>
          <div className="row" style={{marginTop:10}}>
            <span className="kv">CPU Temp</span><strong>{realtime.tempC}°C</strong>
          </div>
          <div className="row">
            <span className="kv">Latency</span><strong>{realtime.latencyMs}ms</strong>
          </div>
        </section>
      </div>

      {/* Row 2 */}
      <div className="row2 h200">
        <section className="card card--network">
          <header className="card-header"><span>Network Status</span></header>
          <div className="row"><span className="kv">Uptime</span><strong>{network.uptime}</strong></div>
          <div className="row"><span className="kv">Packet Loss</span><strong>{network.loss}</strong></div>
          <div className="row"><span className="kv">Latency Spikes</span><strong>{network.spikes}</strong></div>
        </section>

        <section className="card card--security">
          <header className="card-header"><span>Security Status</span></header>
          <div className="row"><span className="kv">Recent failed logins</span><strong>{security.failed}</strong></div>
          <div className="row"><span className="kv">Firewall</span><strong>{security.firewall}</strong></div>
        </section>
      </div>

      {/* Row 3 */}
      <div className="row2 h200">
        <section className="card card--brief">
          <header className="card-header"><span>Daily Briefing</span></header>
          <div className="subtle">Overnight Summary</div>
          <div className="subtle" style={{marginTop:8}}>CPU avg: 18% • WAN up: 90.97% • Peak latency: 61ms</div>
        </section>

        <section className="card card--incidents">
          <header className="card-header"><span>Incidents & Actions</span></header>
          <div className="list">
            {incidents.map(it=>(
              <div className="list-item" key={it.id}>
                <span className={`tag ${it.level==="crit"?"crit":"adv"}`}>{it.level==="crit"?"CRITICAL":"ADVISORY"}</span>
                <div style={{flex:1}}>{it.text}</div>
                <div className="subtle">{it.time}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="card rowfull">
        <header className="card-header"><span>Quick Actions</span></header>
        <div className="actions">
          <button className="btn btn--accent">Refresh All</button>
          <button className="btn">Export Logs</button>
          <button className="btn">Settings</button>
          <button className="btn">Diagnostics</button>
          <button className="btn btn--danger">Handle 1 Critical Issue</button>
          <button className="btn btn--warn">Review 3 Advisories</button>
        </div>
      </section>

      {/* Footer + Command */}
      <div className="footer-feed" style={{marginTop:"16px"}}>
        <span>&gt; Show me overnight advisories</span>
        <span className="subtle">AI: ApexBot auto-restarted, SSL renewed, WAN jitter &lt; 10ms all night.</span>
      </div>
      <div className="cmd">
        <input className="input" placeholder="Enter your command..." />
        <button className="btn btn--accent">Send</button>
      </div>
    </div>
  );
}
