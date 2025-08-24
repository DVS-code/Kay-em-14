export default function StatBubble({ label, value }){
  return (
    <div className="bubble">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}
