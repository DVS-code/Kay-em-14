/* Enable with VITE_USE_MOCK=1. Intercepts window.fetch and returns canned JSON. */
if (import.meta?.env?.VITE_USE_MOCK === '1') {
  console.info('[Mock] Fetch interception ENABLED');

  const sleep = (ms)=>new Promise(r=>setTimeout(r, ms));
  const originalFetch = window.fetch;

  const nowISO = () => new Date().toISOString();
  const routes = [
    { test: (u)=>u.endsWith('/api/system'), data: { cpu: 17, ram: 42, disk_root: 61 } },
    { test: (u)=>u.endsWith('/api/security'), data: { status:'ok', threats: 1, last_scan: nowISO(), firewall:{ enabled:true, rules:12 } } },
    { test: (u)=>u.includes('/api/audit/incidents'), data: { incidents: [
      { id:'INC-1001', severity:'low', title:'Login from new IP', at: nowISO() },
      { id:'INC-1002', severity:'medium', title:'PM2 restart: apexbot', at: nowISO() }
    ] } },
    { test: (u)=>u.includes('/api/ai/briefing'), data: { briefing: 'Dummy: All systems nominal. Have a great day.' } },
    { test: (u)=>u.includes('/api/pm2'), data: { processes: [
      { name:'apexbot', status:'online', cpu:2.1, mem_mb:312 },
      { name:'gridbot', status:'online', cpu:1.2, mem_mb:198 }
    ] } },
    { test: (u)=>u.includes('/api/systemd'), data: { services: [
      { name:'postgresql', active:true }, { name:'nginx', active:true }, { name:'ssh', active:true }
    ] } },
    { test: (u)=>u.includes('/api/router'), data: { wan:{ up_mbps: 40, down_mbps: 950, latency_ms: 12 } } },
    { test: (u)=>u.includes('/api/nas'), data: { status:'ok', temp_c: 33, free_pct: 61 } },
  ];

  window.fetch = async (input, init) => {
    const url = (typeof input === 'string') ? input : input?.url;
    const match = routes.find(r => r.test(url));
    if (match) {
      await sleep(150); // tiny latency
      const body = JSON.stringify(match.data);
      return new Response(body, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    // Fall through to real network for anything else
    return originalFetch(input, init);
  };
}
