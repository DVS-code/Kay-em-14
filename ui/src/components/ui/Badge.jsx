export default function Badge({ kind="ok", children }){
  const cls = kind==="crit" ? "badge badge--crit" : kind==="adv" ? "badge badge--adv" : "badge badge--ok";
  return <span className={cls}>{children}</span>;
}
