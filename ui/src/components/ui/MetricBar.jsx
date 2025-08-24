export default function MetricBar({ value=0, label }){
  const pct = Math.max(0, Math.min(100, Number(value)||0));
  return (
    <div>
      {label && <div className="row"><span className="kv">{label}</span><strong>{pct}%</strong></div>}
      <div className="bar"><span style={{width: pct + "%"}} /></div>
    </div>
  );
}
