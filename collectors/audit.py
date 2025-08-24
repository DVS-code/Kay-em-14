from datetime import datetime
import hashlib, os

AUDIT_PATH = "audit.log"

def append_audit(user, action, status, detail):
    timestamp = datetime.utcnow().isoformat()
    entry = f"{timestamp}|{user}|{action}|{status}|{detail}\n"

    prev_hash = ""
    try:
        with open(AUDIT_PATH, "rb") as f:
            f.seek(0, os.SEEK_END)
            size = f.tell()
            # read last up-to-2KB safely even if file is tiny
            f.seek(max(size - 2048, 0))
            chunk = f.read()
            lines = chunk.splitlines()
            if lines:
                try:
                    last = lines[-1].decode(errors="ignore").strip()
                    prev_hash = hashlib.sha256(last.encode()).hexdigest()
                except Exception:
                    prev_hash = ""
    except FileNotFoundError:
        # first entry; file will be created below
        pass

    full_entry = f"{entry.strip()}|prev={prev_hash}\n"
    with open(AUDIT_PATH, "a", encoding="utf-8") as f:
        f.write(full_entry)

# --- TEMP PATCH: stub get_last_n until real audit log is implemented ---
def get_last_n(n: int):
    return []

# --- TEMP PATCH: stub get_last_n until real audit log is implemented ---
def get_last_n(n: int):
    return []

# --- PATCH: simple in-memory rolling audit buffer ---
_audit_buffer = []

def append_audit(user: str, action: str, status: str, detail: str):
    """Append audit entry to buffer + existing sink (if any)."""
    entry = {
        "user": user,
        "action": action,
        "status": status,
        "detail": detail,
        "ts": __import__("time").strftime("%Y-%m-%d %H:%M:%S")
    }
    _audit_buffer.append(entry)
    if len(_audit_buffer) > 50:  # keep last 50 only
        _audit_buffer.pop(0)
    try:
        # Call original implementation if it exists
        import collectors.audit as _self
        if "_append_audit_original" in globals():
            _append_audit_original(user, action, status, detail)
        elif hasattr(_self, "append_audit_original"):
            _self.append_audit_original(user, action, status, detail)
    except Exception:
        pass

def get_last_n(n: int):
    """Return last n audit entries (newest last)."""
    return _audit_buffer[-n:]
