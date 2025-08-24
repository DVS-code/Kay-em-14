from fastapi import APIRouter
from datetime import datetime, timezone

router = APIRouter()

@router.get("", summary="Security status overview")
def security_status():
    # Dummy data so UI doesn't 404; swap in your real collector later.
    return {
        "status": "ok",
        "threats": 0,
        "last_scan": datetime.now(timezone.utc).isoformat(),
        "firewall": {"enabled": True, "rules": 12}
    }
