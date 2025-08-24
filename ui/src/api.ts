let loginDone = false;

async function ensureLogin() {
  if (!loginDone) {
    const res = await fetch("/dev/login", { credentials: "include" });
    if (!res.ok) throw new Error("❌ /dev/login failed " + res.status);
    console.log("✅ /dev/login success");
    loginDone = true;
  }
}

async function apiFetch(path: string, opts: RequestInit = {}) {
  await ensureLogin();  // always ensure logged in
  console.log("➡️ API fetch:", path, opts);
  const res = await fetch(path, {
    credentials: "include",
    ...opts,
  });
  console.log("⬅️ Response", path, res.status);
  return res;
}

export async function getSystem() { return apiFetch("/system"); }
export async function getPm2() { return apiFetch("/pm2"); }
export async function getSystemd() { return apiFetch("/systemd"); }
export async function getNas() { return apiFetch("/nas"); }
export async function getRecommendations() { return apiFetch("/recommendations"); }
